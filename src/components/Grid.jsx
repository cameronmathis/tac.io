import { onValue, ref } from "firebase/database";
import React from "react";
import { useEffect, useState } from "react";

import { database } from "../firebase";
import GameOverModal from "../modals/GameOver";
import { Game } from "../models/Game";
import * as GameDataService from "../services/game.service";
import useStore from "../Store";
import * as styles from "./css/Grid.module.css";

function Grid({ gridNumber }) {
  const gridY = Math.floor(gridNumber / 3);
  const gridX = gridNumber % 3;
  const EMPTY = "empty";
  const PLAYER1 = "player1";
  const PLAYER2 = "player2";
  const TIE = "tie";
  const WON = "won";
  const LOST = "lost";

  const currentUser = useStore((state) => state.currentUser);
  const currentGameId = useStore((state) => state.currentGameId);
  const [game, setGame] = useState(new Game());
  const [gameResult, setGameResult] = useState("");
  const [isGameOverModalOpen, setIsGameOverModalOpen] = useState(false);

  useEffect(() => {
    const gameRef = ref(database, "games/" + currentGameId);
    onValue(gameRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setGame(data);
      } else {
        return "Game not found";
      }
    });
  }, [currentGameId]);

  // Check if it is the logged in user's turn
  function isUsersTurn() {
    const currentUsersTurn = game[game.currentPlayer].id;
    return currentUsersTurn === currentUser.id;
  }

  // Mark the board with the appropriate symbol
  function markBoard() {
    const y = Math.floor(gridNumber / 3);
    const x = gridNumber % 3;

    if (game.board[gridY][gridX] === EMPTY) {
      let updatedBoard = game.board;
      updatedBoard[y][x] = game.currentPlayer;

      let updatedGame = {
        id: currentGameId,
        board: updatedBoard,
      };
      GameDataService.patchGame(updatedGame);
    }
  }

  // Update which players turn it is
  function updatePlayerTurn() {
    let newPlayer = null;
    if (game.currentPlayer === PLAYER1) {
      newPlayer = PLAYER2;
    }
    if (game.currentPlayer === PLAYER2) {
      newPlayer = PLAYER1;
    }

    let updatedGame = {
      id: currentGameId,
      currentPlayer: newPlayer,
    };
    GameDataService.patchGame(updatedGame);
  }

  // Return winner if one exists
  function getWinner() {
    // Check horizontals
    for (let row in game.board) {
      let set = new Set(game.board[row]);
      if (set.size === 1) {
        if (game.board[row][0] !== EMPTY) return game.board[row][0];
      }
    }
    // Check verticals
    for (let column in game.board) {
      let set = new Set(
        game.board.map(function (value) {
          return value[column];
        })
      );
      if (set.size === 1) {
        if (game.board[0][column] !== EMPTY) return game.board[0][column];
      }
    }
    // Check diagonals
    let diagonalOne = new Set();
    diagonalOne.add(game.board[0][0]);
    diagonalOne.add(game.board[1][1]);
    diagonalOne.add(game.board[2][2]);
    if (diagonalOne.size === 1) {
      if (game.board[0][0] !== EMPTY) return game.board[0][0];
    }
    let diagonalTwo = new Set();
    diagonalTwo.add(game.board[0][2]);
    diagonalTwo.add(game.board[1][1]);
    diagonalTwo.add(game.board[2][0]);
    if (diagonalTwo.size === 1) {
      if (game.board[0][2] !== EMPTY) return game.board[0][2];
    }
    // Check for tie
    for (let row in game.board) {
      for (let column in row) {
        if (game.board[row][column] === EMPTY) return;
      }
    }
    return TIE;
  }

  // TODO: add modal game over
  function handleGameOver(gameResult) {
    let updatedGame = {
      id: currentGameId,
      isActive: false,
    };
    GameDataService.patchGame(updatedGame);
    setGameResult(gameResult);
    setIsGameOverModalOpen(true);
  }

  // Check if the logged in user won
  function didUserWin() {
    const winner = getWinner();
    if (winner === TIE) {
      handleGameOver(TIE);
      return;
    }
    if (winner === PLAYER1) {
      if (game.player1.id === currentUser.id) {
        handleGameOver(WON);
      } else {
        handleGameOver(LOST);
      }
    }
    if (winner === PLAYER2) {
      if (game.player2.id === currentUser.id) {
        handleGameOver(WON);
      } else {
        handleGameOver(LOST);
      }
    }
  }

  const handleClick = () => {
    if (isUsersTurn()) {
      markBoard(gridNumber);
      updatePlayerTurn();
      didUserWin();
    } else {
      // TODO: add snackbar for playing out of turn
      console.log("Not your turn");
    }
  };

  return (
    <div
      className={
        game.board[gridY][gridX] === EMPTY
          ? styles.gridEmpty
          : game.board[gridY][gridX] === PLAYER1
          ? styles.gridO
          : styles.gridX
      }
      onClick={() => handleClick()}
    ></div>
  );
}

export default Grid;
