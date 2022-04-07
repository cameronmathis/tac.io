import React from "react";

import * as styles from "./css/index.module.css";
import Menu from "./Menu";

// TODO: make title image centered when resizing
const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <div className={styles.title}></div>
      </div>
      <div className={styles.right}>
        <Menu />
      </div>
    </div>
  );
};

export default Header;
