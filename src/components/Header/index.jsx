import React from "react";

import * as styles from "./css/index.module.css";
import Menu from "./Menu";

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <div className={styles.title} />
      </div>
      <div className={styles.right}>
        <Menu />
      </div>
    </div>
  );
};

export default Header;
