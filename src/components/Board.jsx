import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { HOME } from "../constants/Pages";
import GameOverModal from "../modals/GameOver";
import * as GameDataService from "../services/game.service";
import useStore from "../Store";
import * as styles from "./css/Board.module.css";
import Grid from "./Grid";

function Board() {
  const currentGameId = useStore((state) => state.currentGameId);
  const setCurrentGameId = useStore((state) => state.setCurrentGameId);
  const setCurrentPath = useStore((state) => state.setCurrentPath);
  const [gameResult, setGameResult] = useState("");
  const [isGameOverModalOpen, setIsGameOverModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleGameOver = (gameResult) => {
    let updatedGame = {
      id: currentGameId,
      isActive: false,
    };
    GameDataService.patchGame(updatedGame);
    setGameResult(gameResult);
    setIsGameOverModalOpen(true);
  };

  const closeGameOverModal = () => {
    setIsGameOverModalOpen(false);
    setCurrentGameId(null);
    setCurrentPath(HOME.path);
    navigate(HOME.path);
  };

  return (
    <>
      <div className={styles.board}>
        {[...Array(9)].map((_x, i) => (
          <Grid key={i} gridNumber={i} handleGameOver={handleGameOver} />
        ))}
      </div>
      <GameOverModal
        isOpen={isGameOverModalOpen}
        closeModal={closeGameOverModal}
        gameResult={gameResult}
      />
    </>
  );
}

export default Board;
