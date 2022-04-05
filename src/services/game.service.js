import { child, get, ref, set, update } from "firebase/database";

import { database } from "../firebase";

export function createGame(game) {
  get(child(ref(database), `games/${game.id}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return "Game already exists";
      }
    })
    .catch((error) => {
      console.error(error);
    });
  set(ref(database, "games/" + game.id), game);
}

export function getGame(id) {
  get(child(ref(database), `games/${id}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return "No data available";
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
