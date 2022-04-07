import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { PLAY } from "../../constants/Pages";
import { Game } from "../../models/Game";
import * as GameDataService from "../../services/game.service";
import ErrorSnackbar from "../../snackbars/Error";
import useStore from "../../Store";
import * as styles from "./css/index.module.css";

function Home() {
  const currentUser = useStore((state) => state.currentUser);
  const currentGameId = useStore((state) => state.currentGameId);
  const setCurrentGameId = useStore((state) => state.setCurrentGameId);
  const setCurrentPath = useStore((state) => state.setCurrentPath);
  const [gameCode, setGameCode] = useState("");
  const [isErrorSnackbarOpen, setIsErrorSnackbarOpen] = useState(false);
  const [errorSnackbarMessage, setErrorSnackbarMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setGameCode(currentGameId ? currentGameId : "");
  }, [currentGameId]);

  const handleChange = (event) => {
    setGameCode(event.target.value);
  };

  const handleJoinGame = () => {
    GameDataService.getGame(gameCode).then((game) => {
      if (game === "Game not found") {
        setErrorSnackbarMessage("Game not found");
        setIsErrorSnackbarOpen(true);
        return;
      }
      if (!game.isActive) {
        setErrorSnackbarMessage("Game is not currently active");
        setIsErrorSnackbarOpen(true);
        return;
      }
      if (
        game.player1.id === currentUser.id ||
        game.player2.id === currentUser.id
      ) {
        setCurrentGameId(game.id);
        setCurrentPath(PLAY.path);
        navigate(PLAY.path);
        return;
      } else if (game.player2.id !== undefined) {
        setErrorSnackbarMessage("Game already has two players");
        setIsErrorSnackbarOpen(true);
        return;
      }
      game.player2.id = currentUser.id;
      game.player2.name = currentUser.name;
      GameDataService.patchGame(game);
      setCurrentGameId(game.id);
      setCurrentPath(PLAY.path);
      navigate(PLAY.path);
    });
  };

  const handleCreateGame = () => {
    let game = new Game();
    game.isActive = true;
    game.player1.id = currentUser.id;
    game.player1.name = currentUser.name;
    GameDataService.createGame(game);
    setCurrentGameId(game.id);
    setCurrentPath(PLAY.path);
    navigate(PLAY.path);
  };

  // TODO: style text field
  return (
    <>
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
      <ErrorSnackbar
        isOpen={isErrorSnackbarOpen}
        closeSnackbar={setIsErrorSnackbarOpen}
        message={errorSnackbarMessage}
      ></ErrorSnackbar>
    </>
  );
}

export default Home;
