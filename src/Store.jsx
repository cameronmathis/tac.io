import create from "zustand";

const useStore = create((set) => ({
  currentPath: "/home",
  setCurrentPath: (path) => set(() => ({ currentPath: path })),

  isMobile: null,
  setIsMobile: (bool) => set(() => ({ isMobile: bool })),

  currentPlayer: Math.random() < 0.5 ? "x" : "o",
  setCurrentPlayer: (player) => set(() => ({ currentPlayer: player })),

  currentUser: null,
  setCurrentUser: (user) => set(() => ({ currentUser: user })),

  currentGame: null,
  setCurrentGame: (game) => set(() => ({ currentGame: game })),

  gameBoard: [
    ["empty", "empty", "empty"],
    ["empty", "empty", "empty"],
    ["empty", "empty", "empty"],
  ],
  setGameBoard: (board) => set(() => ({ gameBoard: board })),
}));

export default useStore;
