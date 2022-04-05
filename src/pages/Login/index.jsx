import React from "react";
import { GoogleLogin } from "react-google-login";

import { User } from "../../models/User";
import * as UserDataService from "../../services/user.service";
import useStore from "../../Store";
import * as styles from "./css/index.module.css";

function Login() {
  const setCurrentUser = useStore((state) => state.setCurrentUser);

  const onSuccess = (res) => {
    let profile = res.profileObj;
    profile.tokens = 0;
    let user = new User();
    user.email = profile.email;
    user.id = profile.googleId;
    user.name = profile.givenName;
    UserDataService.patchUser(user);
    setCurrentUser(user);
  };

  return (
    <div className={styles.container}>
      <GoogleLogin
        className={styles.button}
        clientId="3090956232-ce08f1dh67r05p3bdu1o2rff252hqeok.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={onSuccess}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      ></GoogleLogin>
    </div>
  );
}

export default Login;
