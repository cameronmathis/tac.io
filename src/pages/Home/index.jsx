import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { PLAY } from "../../constants/Pages";
import { Game } from "../../models/Game";
import * as GameDataService from "../../services/game.service";
import useStore from "../../Store";
import * as styles from "./css/index.module.css";

// TODO: address console warnings
function Home() {
  const currentUser = useStore((state) => state.currentUser);
  const currentGameId = useStore((state) => state.currentGameId);
  const setCurrentGameId = useStore((state) => state.setCurrentGameId);
  const setCurrentPath = useStore((state) => state.setCurrentPath);
  const [gameCode, setGameCode] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setGameCode(currentGameId);
  }, [currentGameId]);

  const handleChange = (event) => {
    setGameCode(event.target.value);
  };

  const handleJoinGame = () => {
    GameDataService.getGame(gameCode).then((game) => {
      if (game === "Game not found") {
        // TODO: add snackbar for game not found
        console.log("Game not found");
        return;
      }
      if (!game.isActive) {
        // TODO: add snackbar for game is not active
        console.log("Game is not currently active");
        return;
      }
      if (
        game.player1.id === currentUser.id ||
        game.player2.id === currentUser.id
      ) {
        setCurrentGameId(game.id);
        navigate(PLAY.path);
        setCurrentPath(PLAY.path);
        return;
      } else if (game.player2.id !== undefined) {
        // TODO: add snackbar for game already has two players
        console.log("Game already has two players");
        return;
      }
      game.player2.id = currentUser.id;
      game.player2.name = currentUser.name;
      GameDataService.patchGame(game);
      setCurrentGameId(game.id);
      navigate(PLAY.path);
      setCurrentPath(PLAY.path);
      // TODO: add snackbar to show game code
    });
  };

  const handleCreateGame = () => {
    let game = new Game();
    game.isActive = true;
    game.player1.id = currentUser.id;
    game.player1.name = currentUser.name;
    GameDataService.createGame(game);
    setCurrentGameId(game.id);
    navigate(PLAY.path);
    setCurrentPath(PLAY.path);
  };

  // TODO: style text field
  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <TextField
          className={styles.textField}
          id="outlined-search"
          label="Game Code"
          type="search"
          value={gameCode}
          onChange={handleChange}
        />
        <Button
          className={styles.button}
          variant="outlined"
          onClick={handleJoinGame}
        >
          Join Game
        </Button>
        <Button
          className={styles.button}
          variant="outlined"
          onClick={handleCreateGame}
        >
          Create Game
        </Button>
      </div>
    </div>
  );
}

export default Home;
