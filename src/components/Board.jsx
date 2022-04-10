import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { LOST, TIE, WON } from "../constants/GameResults";
import { HOME } from "../constants/Pages";
import { EMPTY, PLAYER1, PLAYER2 } from "../constants/Players";
import { database } from "../firebase";
import GameOverModal from "../modals/GameOver";
import { Game } from "../models/Game";
import { GameBoard } from "../models/GameBoard";
import * as GameDataService from "../services/game.service";
import ErrorSnackbar from "../snackbars/Error";
import useStore from "../Store";
import * as styles from "./css/Board.module.css";
import Grid from "./Grid";

function Board() {
  const currentGameId = useStore((state) => state.currentGameId);
  const setCurrentGameId = useStore((state) => state.setCurrentGameId);
  const currentUser = useStore((state) => state.currentUser);
  const setCurrentPath = useStore((state) => state.setCurrentPath);
  const [game, setGame] = useState(new Game());
  const [isGameFound, setIsGameFound] = useState(true);
  const [errorSnackbarMessage, setErrorSnackbarMessage] = useState("");
  const [isErrorSnackbarOpen, setIsErrorSnackbarOpen] = useState(false);
  const [gameResult, setGameResult] = useState("");
  const [isGameOverModalOpen, setIsGameOverModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const gameRef = ref(database, "games/" + currentGameId);
    onValue(gameRef, (snapshot) => {
      if (snapshot.exists()) {
        let data = snapshot.val();
        if (data.winner !== undefined) {
          const result =
            data.winner === TIE
              ? TIE
              : data.winner === currentUser.id
              ? WON
              : LOST;
          setGameResult(result);
          setIsGameOverModalOpen(true);
        } else {
          setGame(data);
        }
        setIsGameFound(true);
      } else {
        setIsGameFound(false);
      }
    });
  }, [currentGameId, currentUser]);

  useEffect(() => {
    if (!isGameFound && !isGameOverModalOpen) {
      setErrorSnackbarMessage("Error loading game");
      setIsErrorSnackbarOpen(true);
    }
  }, [isGameFound, isGameOverModalOpen]);

  const updatePlayerTurn = () => {
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
  };

  const calculateWinner = () => {
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
      for (let column in game.board[row]) {
        if (game.board[row][column] === EMPTY) return;
      }
    }
    return TIE;
  };

  const handleGameOver = (gameResult) => {
    let updatedGame = null;
    const winner =
      gameResult === TIE ? TIE : gameResult === WON ? currentUser.id : null;
    if (winner !== null) {
      updatedGame = {
        id: currentGameId,
        isActive: false,
        winner: winner,
      };
    } else {
      updatedGame = {
        id: currentGameId,
        isActive: false,
      };
    }
    GameDataService.patchGame(updatedGame);
    setGameResult(gameResult);
    setIsGameOverModalOpen(true);
  };

  const didCurrentUserWin = () => {
    const winner = calculateWinner();
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
  };

  const handlePlay = () => {
    if (game.isActive) {
      updatePlayerTurn();
    }
    didCurrentUserWin();
  };

  const handleNewGame = () => {
    let updatedGame = game;
    updatedGame.board = new GameBoard().board;
    updatedGame.isActive = true;
    updatedGame.winner = null;
    GameDataService.patchGame(updatedGame);
    setIsGameFound(true);
    setIsGameOverModalOpen(false);
    setGameResult("");
  };

  const handleEndGame = () => {
    GameDataService.deleteGame(currentGameId);
    setCurrentGameId(null);
    setIsGameOverModalOpen(false);
    setCurrentPath(HOME.path);
    navigate(HOME.path);
  };

  return (
    <>
      <div className={styles.board}>
        {[...Array(9)].map((_x, i) => (
          <Grid
            key={i}
            gridNumber={i}
            gridState={game.board[Math.floor(i / 3)][i % 3]}
            game={game}
            handlePlay={handlePlay}
          />
        ))}
      </div>
      <ErrorSnackbar
        isOpen={isErrorSnackbarOpen}
        closeSnackbar={setIsErrorSnackbarOpen}
        message={errorSnackbarMessage}
      />
      <GameOverModal
        isOpen={isGameOverModalOpen}
        newGame={handleNewGame}
        endGame={handleEndGame}
        gameResult={gameResult}
      />
    </>
  );
}

export default Board;
