import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import React from "react";

import * as styles from "./css/index.module.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  p: 4,
};

const GameOverModal = ({ isOpen, closeModal, gameResult }) => {
  const TIE = "tie";
  const WON = "won";
  const LOST = "lost";

  const handleClose = () => {
    closeModal();
  };

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
    <Modal className={styles.module} open={isOpen} onClose={handleClose}>
      <Box className={styles.box} sx={style}>
        <div className={styles.body}>
          <h2 className={styles.header}>Game Over</h2>
          <p className={styles.message}>{getModalMessage()}</p>
          <Button
            className={styles.button}
            variant="outlined"
            onClick={handleClose}
          >
            Dismiss
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default GameOverModal;
