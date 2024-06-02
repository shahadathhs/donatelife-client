import { 
  createUserWithEmailAndPassword, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut, 
  updateProfile
} from 'firebase/auth';
import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';
import auth from '../firebase/firebase.config';
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic()

  // createUser
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  }

  // update user profile
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo
      })   
  }

  // loginUser
  const login =  (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }

  // logout user
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  }

  // observer
  // useEffect(() => {
  //   const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser);
  //     // if user exist then issue a token
  //     // const userEmail = { email: currentUser?.email || user?.email }
  //     // if (currentUser) {
  //     //   // get token and store client
  //     //   axiosPublic.post('/jwt', userEmail, { withCredentials: true })
  //     //     .then(res => {
  //     //       if(res.data.token){
  //     //         localStorage.setItem("access-token", res.data.token)
  //     //         setLoading(false);
  //     //       }
  //     //     })
  //     // } else {
  //     //   // remove token
  //     //   localStorage.removeItem("access-token")
  //     //   setLoading(false);
  //     //   axiosPublic.post('/logout', userEmail, { withCredentials: true })
  //     //     .then(res => {console.log(res.data)})

  //     // }
  //     setLoading(false);
  //   });
  //   return () => {
  //     unSubscribe();
  //   }
  // }, [user,axiosPublic])
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      if (currentUser) {
        // get token and store client
        const userInfo = { email: currentUser.email };
          axiosPublic.post('/jwt', userInfo)
            .then(res => {
              if (res.data.token) {
                localStorage.setItem('access-token', res.data.token);
                  setLoading(false);
                }
              })
      }
      else {
        localStorage.removeItem('access-token');
        setLoading(false);
      }
    });
    return () => {
        return unsubscribe();
    }
}, [axiosPublic])

  const authInfo = {
    user, setUser, loading, 
    createUser, updateUserProfile,
    login, logOut,
  }

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

AuthProvider.propTypes = {
  children: PropTypes.node,
}