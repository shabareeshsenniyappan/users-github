import React from "react";
import styles from "./cardContainer.module.css";
import Card from "../card";

function CardContainer({ users, containerHeading, onFavClicked, isFav }) {
  return (
    <div className={styles.cardHeroContainer}>
      <div className={styles.heading}>{containerHeading}</div>
      <div className={styles.cardContainer}>
        {users &&
          users?.map((user) => (
            <Card
              isFav={isFav}
              userDetail={user}
              key={user?.id}
              onFavClicked={onFavClicked}
            />
          ))}
      </div>
    </div>
  );
}

export default CardContainer;
