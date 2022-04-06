import Button from "@mui/material/Button";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { PLAY } from "../../constants/Pages";
import { Game } from "../../models/Game";
import * as GameDataService from "../../services/game.service";
import useStore from "../../Store";
import * as styles from "./css/index.module.css";

function Home() {
  const currentUser = useStore((state) => state.currentUser);
  const setCurrentGame = useStore((state) => state.setCurrentGame);
  const setCurrentPath = useStore((state) => state.setCurrentPath);
  // TODO: update game code based off UI input
  const [gameCode, setGameCode] = useState("c97ee");
  const navigate = useNavigate();

  const handleJoinGame = () => {
    GameDataService.getGame(gameCode).then((game) => {
      if (game === "Game not found") {
        console.log("Game not found");
        return;
      }
      if (!game.isActive) {
        console.log("Game is not currently active");
        return;
      }
      if (
        game.player1.id === currentUser.id ||
        game.player2.id === currentUser.id
      ) {
        setCurrentGame(game.id);
        navigate(PLAY.path);
        setCurrentPath(PLAY.path);
        return;
      } else if (game.player2.id !== undefined) {
        console.log("Game already has two players");
        return;
      }
      game.player2.id = currentUser.id;
      game.player2.name = currentUser.name;
      GameDataService.patchGame(game);
      setCurrentGame(game.id);
      navigate(PLAY.path);
      setCurrentPath(PLAY.path);
    });
  };

  const handleCreateGame = () => {
    let game = new Game();
    game.isActive = true;
    game.player1.id = currentUser.id;
    game.player1.name = currentUser.name;
    GameDataService.createGame(game);
    setCurrentGame(game.id);
    navigate(PLAY.path);
    setCurrentPath(PLAY.path);
  };

  // TODO: add input for game code
  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <Button
          className={styles.button}
          variant="outlined"
          onClick={() => handleJoinGame()}
        >
          Join Game
        </Button>
        <Button
          className={styles.button}
          variant="outlined"
          onClick={() => handleCreateGame()}
        >
          Create Game
        </Button>
      </div>
    </div>
  );
}

export default Home;
