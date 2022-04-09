import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import React from "react";

import { LOST, TIE, WON } from "../../constants/GameResults";
import * as styles from "./css/index.module.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  p: 4,
};

const GameOverModal = ({ isOpen, newGame, endGame, gameResult }) => {
  const getModalMessage = () => {
    if (gameResult === TIE) {
      return "You tied.";
    }
    if (gameResult === WON) {
      return "You won.";
    }
    if (gameResult === LOST) {
      return "You lost.";
    }
    return "";
  };

  return (
    <Modal className={styles.module} open={isOpen}>
      <Box className={styles.box} sx={style}>
        <div className={styles.body}>
          <h2 className={styles.header}>Game Over</h2>
          <p className={styles.message}>{getModalMessage()}</p>
          <div className={styles.buttons}>
            <Button
              className={styles.button}
              variant="outlined"
              onClick={newGame}
            >
              New Game
            </Button>
            <Button
              className={styles.button}
              variant="outlined"
              onClick={endGame}
            >
              End Game
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default GameOverModal;
