import React from "react";
import { useState } from "react";

import useStore from "../Store";
import * as styles from "./css/Grid.module.css";

function Home() {
  const EMPTY = "empty";
  const X = "x";
  const O = "o";

  const currentPlayer = useStore((state) => state.currentPlayer);
  const setCurrentPlayer = useStore((state) => state.setCurrentPlayer);
  const [gridState, setGridState] = useState(EMPTY);

  const handleClick = () => {
    if (gridState !== EMPTY) {
      return;
    }
    if (currentPlayer === X) {
      setGridState(X);
      setCurrentPlayer(O);
    }
    if (currentPlayer === O) {
      setGridState(O);
      setCurrentPlayer(X);
    }
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
      alt=""
    ></div>
  );
}

export default Home;
