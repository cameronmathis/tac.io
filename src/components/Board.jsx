import { onValue, ref } from "firebase/database";
import React from "react";
import { useState, useEffect } from "react";

import { database } from "../firebase";
import useStore from "../Store";
import * as styles from "./css/Board.module.css";
import Grid from "./Grid";

function Board() {
  const currentGame = useStore((state) => state.currentGame);
  const [gameBoard, setGameBoard] = useState();

  useEffect(() => {
    const gameBoardRef = ref(database, "games/" + currentGame + "/board");
    onValue(gameBoardRef, (snapshot) => {
      if (snapshot.exists()) {
        setGameBoard(snapshot.val());
      } else {
        return "Game board not found";
      }
    });
  }, [currentGame]);

  return (
    <div className={styles.board}>
      {[...Array(9)].map((_x, i) => (
        <Grid key={i} gridNumber={i} gameBoard={gameBoard} />
      ))}
    </div>
  );
}

export default Board;
