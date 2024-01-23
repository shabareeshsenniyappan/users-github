import React from "react";
import ReactLoading from "react-loading";
import style from "./loading.module.css";

function Loading() {
  return (
    <div className={style.loader}>
      <ReactLoading type={"spin"} color={"black"} height={"3%"} width={"3%"} />
    </div>
  );
}
export default Loading;
