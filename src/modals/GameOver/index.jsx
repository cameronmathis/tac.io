import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import React from "react";

import * as styles from "./css/index.module.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid red",
  p: 4,
};

// TODO: style modal
const GameOverModal = ({ isOpen, closeModal, gameResult }) => {
  const TIE = "tie";
  const WON = "won";
  const LOST = "LOST";

  const handleClose = () => {
    closeModal();
  };

  const getModalText = () => {
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
    <Modal open={isOpen} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Game Over
        </Typography>
        <Typography sx={{ mt: 2 }}>{getModalText()}</Typography>
        <Button
          className={styles.button}
          variant="outlined"
          onClick={handleClose}
        >
          Dismiss
        </Button>
      </Box>
    </Modal>
  );
};

export default GameOverModal;
