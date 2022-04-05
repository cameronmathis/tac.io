import { child, get, ref, set, update } from "firebase/database";

import { database } from "../firebase";

export function createUser(user) {
  get(child(ref(database), `users/${user.id}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return "User already exists";
      }
    })
    .catch((error) => {
      console.error(error);
    });
  set(ref(database, "users/" + user.id), user);
}

export function getUser(id) {
  get(child(ref(database), `users/${id}`))
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

export function putUser(user) {
  set(ref(database, "users/" + user.id), user);
}

export function patchUser(user) {
  update(ref(database, "users/" + user.id), user);
}

export function deleteUser(id) {
  set(ref(database, "users/" + id), {});
}
