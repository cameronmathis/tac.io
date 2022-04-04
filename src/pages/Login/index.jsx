import React from "react";

import useStore from "../../Store";
import * as styles from "./css/index.module.css";

function Login() {
  const setIsInGame = useStore((state) => state.setIsInGame);

  return <div className={styles.container}></div>;
}

export default Login;
