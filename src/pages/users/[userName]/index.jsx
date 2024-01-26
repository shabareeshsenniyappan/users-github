import React, { Suspense, useEffect, useState } from "react";
import style from "./userDetails.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  getUserDetail,
  getUserRepos,
  getUserfollowers,
} from "@/services/apiServices";
import { images } from "@/utils";
import TabsComponent from "@/components/tabs";
import Loading from "@/components/loading";
import Link from "next/link";

export async function getServerSideProps(context) {
  const { userName } = context.query;
  let userDetailsLoading = true;
  // const response = await axiosConfig.get(`/users/${userName}`);
  const userDetails = await fetch(`https://api.github.com/users/${userName}`, {
    method: "GET",
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    },
  })
    .then((resq) => {
      userDetailsLoading = false;
      return resq.json();
    })
    .catch(() => (userDetailsLoading = false));

  //
  const userFollowers = await fetch(
    `https://api.github.com/users/${userName}/followers`,
    {
      method: "GET",
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
      },
    }
  ).then((resq) => resq.json());
  return { props: { userDetails, userDetailsLoading, userFollowers } };
}

function UserDetails({ userDetails, userDetailsLoading, userFollowers }) {
  const router = useRouter();
  const userName = router.query.userName;
  const [detail] = useState(userDetails);
  const [followers] = useState(userFollowers);
  const [repo, setrepo] = useState();
  const [loading] = useState(userDetailsLoading);
  const [tabloading, settabloading] = useState(false);

  const getRepoData = () => {
    getUserRepos(userName)
      .then((res) => {
        setrepo(res?.data);
        settabloading(false);
      })
      .catch((err) => settabloading(false));
  };

  let companyNames = detail?.company?.split(",");
  let tabsName = [
    `Followers:${detail?.followers}`,
    `Public Repo:${detail?.public_repos}`,
  ];
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className={style.userDetailsHeroContainer}>
          <Link href={"/users"} className={style.cronkHead}>
            Home{" "}
          </Link>
          <span className={style.cronk}> /{" " + detail?.login}</span>
          <div className={style.detailContainer}>
            <div className={style.imageContainer}>
              <img
                src={detail?.avatar_url}
                alt={detail?.login}
                loading={"lazy"}
                className={style.imageQ}
              />
              <div className={style.infoRightContainer}>
                <div className={style.userName}>{detail?.name}</div>
                <div className={style.loginName}>@{detail?.login}</div>
                <div className={style.smallInfoContainer}>
                  <div className={style.iconBooster}>
                    {detail?.location && (
                      <>
                        <div className={style.iconT}>
                          <Image
                            src={images.location}
                            alt={"location"}
                            height={32}
                            width={32}
                          />
                        </div>
                        <div className={style.info}>{detail?.location}</div>
                      </>
                    )}

                    {detail?.email && (
                      <>
                        <div className={style.iconT}>
                          <Image
                            src={images.email}
                            alt={"email"}
                            height={32}
                            width={32}
                          />
                        </div>
                        <div className={style.info}>{detail?.email}</div>
                      </>
                    )}
                    {detail?.twitter_username && (
                      <>
                        <div className={style.iconT}>
                          <Image
                            src={images.twitter}
                            alt={"twitter"}
                            height={32}
                            width={32}
                          />
                        </div>
                        <div className={style.info}>
                          {detail?.twitter_username}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className={style.infoContainer}></div>
          </div>
          <div className={style.detailContainer}>
            <div className={style.heading}>Bio</div>
            <div className={style.wrapper}>
              {detail?.bio ? detail?.bio : <>-</>}
            </div>
            <div className={style.heading}>Company</div>
            <div className={style.wrapperInc}>
              {companyNames?.map((company, index) => (
                <span className={style.bubbler} key={index}>
                  {company}
                </span>
              ))}
            </div>
            <div className={style.heading}>Following : {detail?.following}</div>
          </div>
          <div className={style.detailContainerTabs}>
            <TabsComponent
              tabsName={tabsName}
              list={followers}
              getRepo={getRepoData}
              repo={repo}
              loading={tabloading}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default UserDetails;
