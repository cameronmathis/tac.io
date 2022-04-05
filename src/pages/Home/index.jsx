import React from "react";

import Board from "../../components/Board";
import * as styles from "./css/index.module.css";

function Home() {
  return (
    <div className={styles.container}>
      <Board />
    </div>
  );
}

export default Home;
