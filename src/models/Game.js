import { v4 as uuidv4 } from "uuid";

const PLAYER1 = {
  name: "player1",
  symbol: "x",
};
const PLAYER2 = {
  name: "player2",
  symbol: "o",
};

export function Game() {
  this.board = [
    ["empty", "empty", "empty"],
    ["empty", "empty", "empty"],
    ["empty", "empty", "empty"],
  ];
  this.currentPlayer = Math.random() < 0.5 ? PLAYER1.name : PLAYER2.name;
  this.id = uuidv4().substring(0, 5);
  this.isActive = false;
  this.player1 = {
    gameScore: 0,
    id: null,
    name: null,
  };
  this.player2 = {
    gameScore: 0,
    id: null,
    name: null,
  };
  this.winner = null;
}
