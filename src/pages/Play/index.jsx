import React, { useState } from "react";

import GameCodeSnackbar from "../../snackbars/GameCode";
import Board from "../../components/Board";
import * as styles from "./css/index.module.css";

function Play() {
  const [isGameCodeSnackbarOpen, setIsGameCodeSnackbarOpen] = useState(true);

  return (
    <>
      <div className={styles.container}>
        <Board />
      </div>
      <GameCodeSnackbar
        isOpen={isGameCodeSnackbarOpen}
        closeSnackbar={setIsGameCodeSnackbarOpen}
      />
    </>
  );
}

export default Play;
