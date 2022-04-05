import React from "react";
import { useState } from "react";

import useStore from "../Store";
import * as styles from "./css/Board.module.css";
import Grid from "./Grid";

function Board() {
  const X = "x";
  const O = "o";

  const currentPlayer = useStore((state) => state.currentPlayer);
  const setCurrentPlayer = useStore((state) => state.setCurrentPlayer);
  const [board, setBoard] = useState([
    ["empty", "empty", "empty"],
    ["empty", "empty", "empty"],
    ["empty", "empty", "empty"],
  ]);

  function markBoard(gridNumber) {
    const y = Math.floor(gridNumber / 3);
    const x = gridNumber % 3;
    let updatedBoard = board;
    updatedBoard[y][x] = currentPlayer;
    setBoard(updatedBoard);
  }

  function updatePlayerTurn() {
    if (currentPlayer === X) {
      setCurrentPlayer(O);
    }
    if (currentPlayer === O) {
      setCurrentPlayer(X);
    }
  }

  function checkIfWon() {}

  const handleClick = (gridNumber) => {
    markBoard(gridNumber);
    updatePlayerTurn();
    checkIfWon();
  };

  return (
    <div className={styles.board}>
      {[...Array(9)].map((_x, i) => (
        <Grid key={i} gridNumber={i} handlePlay={handleClick} />
      ))}
    </div>
  );
}

export default Board;
