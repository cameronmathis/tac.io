import { v4 as uuidv4 } from "uuid";

export function Game() {
  this.board = [
    ["empty", "empty", "empty"],
    ["empty", "empty", "empty"],
    ["empty", "empty", "empty"],
  ];
  this.currentPlayer = "";
  this.id = uuidv4().substring(0, 5);
  this.isActive = "";
  this.player1 = {
    gameScore: 0,
    id: "",
    name: "",
  };
  this.player2 = {
    gameScore: 0,
    id: "",
    name: "",
  };
  this.winner = "";
}
