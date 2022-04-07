import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import React from "react";

import useStore from "../../Store";
import * as styles from "./css/index.module.css";

// TODO: style snackbar
const GameCodeSnackbar = ({ isOpen, closeSnackbar }) => {
  const SNACKBAR_POSITION = { vertical: "top", horizontal: "center" };
  const SNACKBAR_DURATION = 5000;

  const currentGameId = useStore((state) => state.currentGameId);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    closeSnackbar();
  };

  const getMessage = () => {
    return "Game Code: " + currentGameId;
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Snackbar
      class={styles.snackbar}
      open={isOpen}
      anchorOrigin={SNACKBAR_POSITION}
      autoHideDuration={SNACKBAR_DURATION}
      onClose={handleClose}
      message={getMessage()}
      action={action}
    />
  );
};

export default GameCodeSnackbar;
