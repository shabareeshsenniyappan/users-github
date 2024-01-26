import CardContainer from "@/components/cardContainer";
import Loading from "@/components/loading";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import toast, { Toaster } from "react-hot-toast";
import { getUsers, getUsersNextScroll } from "@/services/apiServices";
import { axiosConfig } from "@/config/axiosConfig";
import { set } from "nprogress";

export async function getServerSideProps() {
  const res = await fetch("https://api.github.com/users?page=100&per_page=10", {
    method: "GET",
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    },
  }).then((resq) => resq.json());
  return { props: { res } };
}

function Userlist(props) {
  const [users, setUsers] = useState(props?.res);
  const [favUser, setFavUser] = useState([]);
  const [sincer, setsincer] = useState(10);

  const getUsersNext = async () => {
    await axiosConfig
      .get(`/users?page=100&per_page=10&since=${sincer}`)
      .then((response) => {
        setsincer((prev) => (prev += 10));
        //to show only unique users
        insertOnlyUniqeUsers(response?.data);
      });
  };

  const insertOnlyUniqeUsers = (user) => {
    let tmp = [...users, ...user];
    const uniqueObjects = tmp.filter(
      (obj, index, self) => index === self.findIndex((t) => t.id === obj.id)
    );
    setUsers(uniqueObjects);
  };
  const notify = () => toast.success("Favouritie Added !!");
  const notifyUnFav = () => toast.error("Favouritie Removed !!");

  const onUnFavClicked = (id) => {
    let filtered = favUser.filter((user) => user?.id !== id);
    setFavUser(filtered);
    notifyUnFav();
  };
  const onFavClicked = (id) => {
    let filtered = users.filter((user) => user?.id === id);
    setFavUser([...favUser, ...filtered]);
    notify();
  };

  return (
    <div>
      <Toaster />

      {favUser?.length > 0 && (
        <CardContainer
          users={favUser}
          containerHeading={"Favourite Users "}
          isFav={true}
          onFavClicked={onUnFavClicked}
        />
      )}
      <InfiniteScroll
        dataLength={users?.length} //This is important field to render the next data
        next={getUsersNext}
        hasMore={true}
        loader={<Loading />}
      >
        <CardContainer
          users={users}
          containerHeading={"Find The Users "}
          onFavClicked={onFavClicked}
        />
      </InfiniteScroll>
    </div>
  );
}

export default Userlist;
