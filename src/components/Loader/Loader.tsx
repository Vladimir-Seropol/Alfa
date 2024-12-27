
import React from "react";
import styles from "./Loader.module.css";

const Loader: React.FC = () => {
  return (
    <div className={styles.loaders}>
      <div className={styles.loader_box}>
        <div className={styles.loader}><span></span></div>
        <div className={styles.loader}><span></span></div>
        <div className={styles.loader}><i></i></div>
        <div className={styles.loader}><i></i></div>
      </div>
    </div>
  );
};

export default Loader;
