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
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const GameOverModal = ({ isOpen, setIsOpen, gameResult }) => {
  const TIE = "tie";
  const WON = "won";
  const LOST = "LOST";

  const handleClose = () => {
    setIsOpen(false);
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
    <div>
      <Modal open={isOpen} onClose={handleClose}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Game Over
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {getModalText}
          </Typography>
          <Button
            className={styles.button}
            variant="outlined"
            onClick={handleClose}
          >
            Dismiss
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default GameOverModal;
