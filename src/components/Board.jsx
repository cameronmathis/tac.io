import React from "react";

import * as styles from "./css/Board.module.css";
import Grid from "./Grid";

function Board() {
  return (
    <div className={styles.board}>
      {[...Array(9)].map((_x, i) => (
        <Grid key={i} gridNumber={i} />
      ))}
    </div>
  );
}

export default Board;
