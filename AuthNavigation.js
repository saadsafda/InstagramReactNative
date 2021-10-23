import React, { useEffect, useState } from "react";
import { SigenInStack, SignOutStack } from "./navigatoin";
import { firebase } from "./firebase";

const AuthNavigation = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const userHandler = (user) =>
    user ? setCurrentUser(user) : setCurrentUser(null);
  useEffect(
    () => firebase.auth().onAuthStateChanged((user) => userHandler(user)),
    []
  );
  return <>{currentUser ? <SigenInStack /> : <SignOutStack />}</>;
};

export default AuthNavigation;
