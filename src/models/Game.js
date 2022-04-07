import { v4 as uuidv4 } from "uuid";

const PLAYER1 = "player1";
const PLAYER2 = "player2";

export function Game() {
  this.board = [
    ["empty", "empty", "empty"],
    ["empty", "empty", "empty"],
    ["empty", "empty", "empty"],
  ];
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
