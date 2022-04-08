import { onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { HOME } from "../constants/Pages";
import { database } from "../firebase";
import GameOverModal from "../modals/GameOver";
import { Game } from "../models/Game";
import { GameBoard } from "../models/GameBoard";
import * as GameDataService from "../services/game.service";
import useStore from "../Store";
import * as styles from "./css/Board.module.css";
import Grid from "./Grid";

function Board() {
  const EMPTY = "empty";
  const PLAYER1 = "player1";
  const PLAYER2 = "player2";
  const TIE = "tie";
  const WON = "won";
  const LOST = "lost";

  const currentGameId = useStore((state) => state.currentGameId);
  const setCurrentGameId = useStore((state) => state.setCurrentGameId);
  const currentUser = useStore((state) => state.currentUser);
  const setCurrentPath = useStore((state) => state.setCurrentPath);
  const [game, setGame] = useState(new Game());
  const [gameResult, setGameResult] = useState("");
  const [isGameOverModalOpen, setIsGameOverModalOpen] = useState(false);
  const navigate = useNavigate();

  // TODO: Update users screen if other player wins
  useEffect(() => {
    const gameRef = ref(database, "games/" + currentGameId);
    onValue(gameRef, (snapshot) => {
      if (snapshot.exists()) {
        let data = snapshot.val();
        setGame(data);
      } else {
        return "Game not found";
      }
    });
  }, [currentGameId]);

  // Update which players turn it is
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

  // Return winner if one exists
  const getWinner = () => {
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

  // Check if the logged in user won
  const didUserWin = () => {
    const winner = getWinner();
    console.log(winner);
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

  const handleGameOver = (gameResult) => {
    let updatedGame = {
      id: currentGameId,
      isActive: false,
    };
    GameDataService.patchGame(updatedGame);
    setGameResult(gameResult);
    setIsGameOverModalOpen(true);
  };

  const handlePlay = () => {
    updatePlayerTurn();
    didUserWin();
  };

  const handleNewGame = () => {
    let updatedGame = {
      id: currentGameId,
      isActive: true,
      board: new GameBoard().board,
    };
    GameDataService.patchGame(updatedGame);
    setIsGameOverModalOpen(false);
    setGameResult("");
  };

  const handleEndGame = () => {
    let updatedGame = {
      id: currentGameId,
      isActive: false,
    };
    GameDataService.patchGame(updatedGame);
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
