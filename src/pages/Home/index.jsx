import Button from "@mui/material/Button";
import React from "react";
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
  const navigate = useNavigate();

  const handleJoinGame = () => {
    console.log("joining game");
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
