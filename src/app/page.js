import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import HeaderComponent from "../components/header/index.jsx";

export default function Home() {
  return (
    <div>
      <HeaderComponent />
      <div className={styles.contentHome}>
        <div className={styles.typo}> Get all the details of the Git users</div>
        <Link href={"/users"}>
          <button className={styles.butExp}>Explore Git-User</button>
        </Link>
      </div>
    </div>
  );
}
