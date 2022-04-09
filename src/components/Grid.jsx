import React, { useState } from "react";

import { EMPTY, PLAYER1 } from "../constants/Players";
import * as GameDataService from "../services/game.service";
import ErrorSnackbar from "../snackbars/Error";
import useStore from "../Store";
import * as styles from "./css/Grid.module.css";

function Grid({ gridNumber, gridState, game, handlePlay }) {
  const currentGameId = useStore((state) => state.currentGameId);
  const currentUser = useStore((state) => state.currentUser);
  const [errorSnackbarMessage, setErrorSnackbarMessage] = useState("");
  const [isErrorSnackbarOpen, setIsErrorSnackbarOpen] = useState(false);

  // Check if it is the logged in user's turn
  const isUsersTurn = () => {
    const currentUsersTurn = game[game.currentPlayer].id;
    return currentUsersTurn === currentUser.id;
  };

  // Mark the board with the appropriate symbol
  const markGrid = () => {
    const y = Math.floor(gridNumber / 3);
    const x = gridNumber % 3;

    if (!game.isActive) {
      return;
    }

    if (gridState === EMPTY) {
      let updatedBoard = game.board;
      updatedBoard[y][x] = game.currentPlayer;

      let updatedGame = {
        id: currentGameId,
        board: updatedBoard,
      };
      GameDataService.patchGame(updatedGame);
    }
  };
  const handleClick = () => {
    if (isUsersTurn()) {
      markGrid(gridNumber);
      handlePlay();
    } else {
      setErrorSnackbarMessage("Not your turn");
      setIsErrorSnackbarOpen(true);
    }
  };

  return (
    <>
      <div
        className={
          gridState === EMPTY
            ? styles.gridEmpty
            : gridState === PLAYER1
            ? styles.gridO
            : styles.gridX
        }
        onClick={() => handleClick()}
      />
      <ErrorSnackbar
        isOpen={isErrorSnackbarOpen}
        closeSnackbar={setIsErrorSnackbarOpen}
        message={errorSnackbarMessage}
      />
    </>
  );
}

export default Grid;
