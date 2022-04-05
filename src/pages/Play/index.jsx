import React from "react";

import Board from "../../components/Board";
import * as styles from "./css/index.module.css";

function Play() {
  return (
    <div className={styles.container}>
      <Board />
    </div>
  );
}

export default Play;
