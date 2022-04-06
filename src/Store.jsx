import create from "zustand";

const useStore = create((set) => ({
  currentPath: "/",
  setCurrentPath: (path) => set(() => ({ currentPath: path })),

  isMobile: null,
  setIsMobile: (bool) => set(() => ({ isMobile: bool })),

  currentUser: null,
  setCurrentUser: (user) => set(() => ({ currentUser: user })),

  currentGame: null,
  setCurrentGame: (game) => set(() => ({ currentGame: game })),
}));

export default useStore;
