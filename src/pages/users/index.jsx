import CardContainer from "@/components/cardContainer";
import Loading from "@/components/loading";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import toast, { Toaster } from "react-hot-toast";
import { getUsers, getUsersNextScroll } from "@/services/apiServices";
import { axiosConfig } from "@/config/axiosConfig";
function Userlist() {
  const [users, setUsers] = useState([]);
  const [favUser, setFavUser] = useState([]);
  const [sincer, setsincer] = useState(10);

  useEffect(() => {
    getUsers().then((res) => setUsers(res?.data));
  }, []);

  const getUsersNext = async () => {
    await axiosConfig
      .get(`/users?page=100&per_page=10&since=${sincer}`)
      .then((response) => {
        setsincer((prev) => (prev += 10));
        setUsers([...users, ...response?.data]);
      });
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

  console.log(sincer);
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
        dataLength={users.length} //This is important field to render the next data
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
