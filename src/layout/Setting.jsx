import { useContext } from "react";
import { ThemeContext } from "../provider/ContextApi";


const Setting = () => {
     const {getSignOut} = useContext(ThemeContext)
       const signOutf = () => {
        getSignOut()
          .then(() => {
                
            })
            .catch((error) => {
                
            })
       }
    return (
        <div className="flex w-full">
        <div className="bg-gray-100 w-1/5 h-full px-5 pt-5">
        <h1 className="text-xl font-bold">Setting</h1>
        <button onClick={signOutf}>signOut</button>  
    </div>

    </div>
    );
};

export default Setting;