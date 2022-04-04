import React from "react";
import Grid from "../../components/Grid";

import * as styles from "./css/index.module.css";

function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {[...Array(9)].map((x, i) => (
          <Grid key={i} />
        ))}
      </div>
    </div>
  );
}

export default Home;
