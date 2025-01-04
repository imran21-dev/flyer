import { useContext } from "react";
import { ThemeContext } from "../provider/ContextApi";
import spinner from '../assets/lottie/loading.json'
import Lottie from "lottie-react";
import { PropagateLoader, SyncLoader } from "react-spinners";
import { Navigate } from "react-router-dom";


const HomePrivate = ({children}) => {

    const {user,loading,verified, setVerified} = useContext(ThemeContext)

    if (loading) {
        return <div className="flex flex-col items-center h-screen justify-center">
        <SyncLoader />
    </div>
    }

  
  

    if (user) {

        if (user.emailVerified) {
            
            return children
        }
      return  <Navigate to='/login'></Navigate>
       
    }


    return (
        <Navigate to='/login'></Navigate>
    );
};

export default HomePrivate;