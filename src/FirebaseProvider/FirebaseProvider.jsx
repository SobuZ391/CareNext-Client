// src/FirebaseProvider/FirebaseProvider.jsx
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../Firebase/firebase.config";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import useAxiosPublic from "../Hooks/useAxiosPublic";

// Initialize social providers
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const AuthContext = createContext(null);

const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  // ---------------- AUTH METHODS ----------------

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // ✅ Google login (renamed to match Login.jsx)
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const githubLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, githubProvider);
  };

  const updateUserProfile = async ({ displayName, photoURL }) => {
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, { displayName, photoURL });
    }
  };

  const updateUserEmail = async (email) => {
    if (auth.currentUser && email !== auth.currentUser.email) {
      await updateEmail(auth.currentUser, email);
    }
  };

  const updateUserPassword = async (newPassword) => {
    if (auth.currentUser) {
      await updatePassword(auth.currentUser, newPassword);
    }
  };

  const getUserPaymentHistory = async (userId) => {
    const paymentsRef = collection(db, "payments");
    const q = query(paymentsRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const payments = [];
    querySnapshot.forEach((doc) => {
      payments.push(doc.data());
    });
    return payments;
  };

  const logout = async () => {
    setUser(null);
    await signOut(auth);
    localStorage.removeItem("access-token");
  };

  // ---------------- OBSERVER ----------------
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const userInfo = { email: currentUser.email };
        axiosPublic
          .post("/jwt", userInfo)
          .then((res) => {
            if (res.data.token) {
              localStorage.setItem("access-token", res.data.token);
            }
          })
          .catch((err) => console.error("Error fetching token:", err));
      } else {
        localStorage.removeItem("access-token");
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [axiosPublic]);

  // ---------------- CONTEXT VALUE ----------------
  const allValues = {
    user,
    loading,
    createUser,
    signInUser,
    googleSignIn, 
    githubLogin,
    logout,
    updateUserProfile,
    updateUserEmail,
    updateUserPassword,
    getUserPaymentHistory,
  };

  return (
    <AuthContext.Provider value={allValues}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default FirebaseProvider;
