import { onValue, ref } from "firebase/database";
import React from "react";
import { useEffect, useState } from "react";

import { database } from "../firebase";
import * as GameDataService from "../services/game.service";
import useStore from "../Store";
import * as styles from "./css/Grid.module.css";

function Grid({ gridNumber, gameBoard }) {
  const EMPTY = "empty";
  const PLAYER1 = {
    name: "player1",
    symbol: "x",
  };
  const PLAYER2 = {
    name: "player2",
    symbol: "o",
  };

  const currentGame = useStore((state) => state.currentGame);
  const [tile, setTile] = useState();
  const [currentPlayer, setCurrentPlayer] = useState();

  useEffect(() => {
    const y = Math.floor(gridNumber / 3);
    const x = gridNumber % 3;
    // TODO: debug issue when initializing with gameBoard
    // setTile(gameBoard[y][x]);
    setTile("x");

    const currentPlayerRef = ref(
      database,
      "games/" + currentGame + "/currentPlayer"
    );
    onValue(currentPlayerRef, (snapshot) => {
      if (snapshot.exists()) {
        setCurrentPlayer(snapshot.val());
      } else {
        return "Current player not found";
      }
    });
  }, [gridNumber, gameBoard, currentGame]);

  function markBoard() {
    const y = Math.floor(gridNumber / 3);
    const x = gridNumber % 3;

    if (tile === EMPTY) {
      let updatedBoard = gameBoard;
      updatedBoard[y][x] = currentPlayer;

      let game = {
        id: currentGame,
        board: updatedBoard,
      };
      GameDataService.patchGame(game);
    }
  }

  function updatePlayerTurn() {
    // TODO: add check to only update if it is user's turn
    let newPlayer = null;
    if (currentPlayer === PLAYER1.name) {
      newPlayer = PLAYER2.name;
    }
    if (currentPlayer === PLAYER2.name) {
      newPlayer = PLAYER1.name;
    }

    let game = {
      id: currentGame,
      currentPlayer: newPlayer,
    };
    GameDataService.patchGame(game);
  }

  function getWinner() {
    // Check horizontals
    for (let row in gameBoard) {
      let set = new Set(gameBoard[row]);
      if (set.size === 1) {
        if (gameBoard[row][0] !== EMPTY) return gameBoard[row][0];
      }
    }
    // Check verticals
    for (let column in gameBoard) {
      let set = new Set(
        gameBoard.map(function (value) {
          return value[column];
        })
      );
      if (set.size === 1) {
        if (gameBoard[0][column] !== EMPTY) return gameBoard[0][column];
      }
    }
    // Check diagonals
    let diagonalOne = new Set();
    diagonalOne.add(gameBoard[0][0]);
    diagonalOne.add(gameBoard[1][1]);
    diagonalOne.add(gameBoard[2][2]);
    if (diagonalOne.size === 1) {
      if (gameBoard[0][0] !== EMPTY) return gameBoard[0][0];
    }
    let diagonalTwo = new Set();
    diagonalTwo.add(gameBoard[0][2]);
    diagonalTwo.add(gameBoard[1][1]);
    diagonalTwo.add(gameBoard[2][0]);
    if (diagonalTwo.size === 1) {
      if (gameBoard[0][2] !== EMPTY) return gameBoard[0][2];
    }
  }

  const handleClick = () => {
    markBoard(gridNumber);
    updatePlayerTurn();
    const winner = getWinner();
    // TODO: add pops for winner/loser and start new game
    if (winner === PLAYER1.symbol) console.log("Player1 WON!");
    if (winner === PLAYER2.symbol) console.log("Player2 WON!");
  };

  return (
    <div
      className={
        tile === EMPTY
          ? styles.gridEmpty
          : tile === PLAYER1.symbol
          ? styles.gridX
          : styles.gridO
      }
      onClick={() => handleClick()}
    ></div>
  );
}

export default Grid;
