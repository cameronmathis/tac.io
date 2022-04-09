import { child, get, ref, set, update } from "firebase/database";

import { database } from "../firebase";

export function createGame(game) {
  return get(child(ref(database), `games/${game.id}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return "Game already exists";
      } else {
        set(ref(database, "games/" + game.id), game);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

export function getGame(id) {
  return get(child(ref(database), `games/${id}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return "Game not found";
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

export function putGame(game) {
  set(ref(database, "games/" + game.id), game);
}

export function patchGame(game) {
  update(ref(database, "games/" + game.id), game);
}

export function deleteGame(id) {
  set(ref(database, "games/" + id), {});
}
