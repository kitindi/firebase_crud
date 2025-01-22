import { createContext, useContext, useState, useEffect } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";

const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const signUp = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

const logOut = () => {
  return signOut(auth);
};

const googleSignIn = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};
export const userAuthContext = createContext({
  login,
  signUp,
  logOut,
  googleSignIn,
});

const value = {
  login,
  signUp,
  logOut,
  googleSignIn,
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return <userAuthContext.Provider value={value}>{children}</userAuthContext.Provider>;
};

// exporting useAuthContext

export const useAuthContext = () => {
  return useContext(userAuthContext);
};
