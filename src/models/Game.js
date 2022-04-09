import { v4 as uuidv4 } from "uuid";

import { PLAYER1, PLAYER2 } from "../constants/Players";
import { GameBoard } from "./GameBoard";

export function Game() {
  this.board = new GameBoard().board;
  this.currentPlayer = Math.random() < 0.5 ? PLAYER1 : PLAYER2;
  this.id = uuidv4().substring(0, 5);
  this.isActive = false;
  this.player1 = {
    gameScore: 0,
    id: null,
    name: null,
    symbol: "x",
  };
  this.player2 = {
    gameScore: 0,
    id: null,
    name: null,
    symbol: "o",
  };
  this.winner = null;
}
