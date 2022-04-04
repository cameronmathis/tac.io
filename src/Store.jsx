import create from "zustand";

const useStore = create((set) => ({
  isInGame: true,
  setIsInGame: (bool) => set(() => ({ isInGame: bool })),

  currentPlayer: Math.random() < 0.5 ? "x" : "o",
  setCurrentPlayer: (player) => set(() => ({ currentPlayer: player })),

  currentPath: "/home",
  setCurrentPath: (path) => set(() => ({ currentPath: path })),

  isMobile: null,
  setIsMobile: (bool) => set(() => ({ isMobile: bool })),
}));

export default useStore;
