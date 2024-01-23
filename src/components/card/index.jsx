import { axiosConfig } from "@/config/axiosConfig";
import React, { memo, useEffect, useState } from "react";
import styles from "./card.module.css";
import { images } from "../../utils";
import Image from "next/image";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";

function Card({ userDetail, onFavClicked, isFav }) {
  const router = useRouter();
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const response = await axiosConfig.get(`/users/${userDetail?.login}`);
    setUsers(response?.data);
  };

  const onFavIconClick = (e) => {
    e.stopPropagation();
    onFavClicked(userDetail?.id);
  };

  const onCardClick = () => {
    router.push(`/users/${userDetail?.login}`);
  };
  const notifyFavAdd = () => toast.success("Link Copied to ClipBoard!!");

  const copyUrl = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(userDetail?.html_url).then(() => {
      notifyFavAdd();
    });
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div className={styles.cardHeroContainer} onClick={onCardClick}>
      <img
        src={userDetail?.avatar_url}
        alt={userDetail?.login}
        className={styles.imageContainer}
        loading={"lazy"}
      />
      <div className={styles.favIconHolder}>
        <Image
          src={isFav ? images.favourite : images.unFavourite}
          alt={"unFavourite"}
          width={20}
          height={20}
          loading={"lazy"}
          onClick={onFavIconClick}
        />
      </div>
      <div className={styles.detailContainer}>
        <div className={styles?.name}>{users?.name}</div>
        <div className={styles?.loginDetail}>@{userDetail?.login}</div>
        <div className={styles.shareIconHolder}>
          <Image
            src={images.shareIcon}
            onClick={copyUrl}
            alt={"shareIcon"}
            width={30}
            height={30}
            loading={"lazy"}
          />
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default memo(Card);
