import React, { memo, useState } from "react";
import style from "./tabs.module.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import ListOfUsers from "../followerList";
import Loading from "../loading";

function TabsComponent({ tabsName, list, repo, getRepo, loading }) {
  return (
    <Tabs>
      <TabList>
        {tabsName?.map((tab) => (
          <Tab
            onClick={() => {
              if (tab.includes("Public Repo")) {
                getRepo();
              }
            }}
          >
            {tab}
          </Tab>
        ))}
      </TabList>

      <TabPanel>
        <>
          {loading ? <Loading /> : <ListOfUsers list={list} isRepo={false} />}
        </>
      </TabPanel>
      <TabPanel>
        <>{loading ? <Loading /> : <ListOfUsers repo={repo} isRepo={true} />}</>
      </TabPanel>
      <TabPanel>
        <h2>Any content 3</h2>
      </TabPanel>
    </Tabs>
  );
}

export default memo(TabsComponent);
