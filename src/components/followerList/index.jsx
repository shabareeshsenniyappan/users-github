import React, { memo } from "react";
import style from "./followerList.module.css";
import Image from "next/image";
import { useRouter } from "next/router";

function ListOfUsers({ list, repo, isRepo = true }) {
  const router = useRouter();
  return (
    <div className={style.listcontainer}>
      {isRepo
        ? repo?.map((rep) => (
            <div className={style.simpleList} key={rep?.id}>
              <div className={style.simpleListNameRep}>{rep?.name}</div>
              <div className={style.simpleListNameRep}>
                {rep?.watchers} Watchers
              </div>
              <div className={style.simpleListNameRep}>{rep?.forks} Forks</div>
            </div>
          ))
        : list?.map((user) => (
            <div
              className={style.simpleList}
              key={user?.id}
              onClick={() => router.push(`/users/${user?.login}`)}
            >
              <Image
                src={user?.avatar_url}
                alt={user?.login}
                width={42}
                height={42}
                className={style.listImage}
              />
              <div className={style.simpleListName}>{user?.login}</div>
            </div>
          ))}
    </div>
  );
}

export default memo(ListOfUsers);
