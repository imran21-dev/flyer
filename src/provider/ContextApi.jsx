import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase.config";

export const ThemeContext = createContext(null);

const ContextApi = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
  
    const [currentUpdate, setCurrentUpdate] = useState(0)

    const [verified, setVerified] = useState(false)
    
   
    

  const registration = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  const getSignOut = () => {
    setLoading(true)
    return signOut(auth)
  }

  
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth , (currentUser) => {
        setUser(currentUser)
        setLoading(false)
    })
    return () => {
        unsubscribe()
    }
},[])



const value = {
  registration,
  login,
  loading,
  setLoading,
  user,
  setUser,
  currentUpdate,
  setCurrentUpdate,
  getSignOut,
  verified, setVerified,
};
  
console.log(user)

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ContextApi;
