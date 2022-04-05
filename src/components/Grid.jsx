import React from "react";
import { useState } from "react";

import useStore from "../Store";
import * as styles from "./css/Grid.module.css";

function Grid({ gridNumber, handlePlay }) {
  const EMPTY = "empty";
  const X = "x";
  const O = "o";

  const currentPlayer = useStore((state) => state.currentPlayer);
  const [gridState, setGridState] = useState(EMPTY);

  const handleClick = () => {
    if (gridState !== EMPTY) {
      return;
    }
    if (currentPlayer === X) {
      setGridState(X);
    }
    if (currentPlayer === O) {
      setGridState(O);
    }
    handlePlay(gridNumber);
  };

  return (
    <div
      className={
        gridState === EMPTY
          ? styles.gridEmpty
          : gridState === X
          ? styles.gridX
          : styles.gridO
      }
      onClick={() => handleClick()}
    ></div>
  );
}

export default Grid;
