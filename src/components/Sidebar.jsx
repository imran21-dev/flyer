import { useContext } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { PiChatTeardropDots, PiUser } from "react-icons/pi";
import { NavLink, useLocation } from "react-router-dom";
import { ThemeContext } from "../provider/ContextApi";
import userimg from '../assets/blank-profile-picture-973460_640.webp'
import logo from '../assets/logo.png'


const Sidebar = () => {
    const {user,loading,} = useContext(ThemeContext)
    const {state} = useLocation()
    const nav = state?.nav
    

   
      const handleError = (e) => {
       e.target.src = userimg
      }
  return (
    <div className="bg-primary backdrop-blur-3xl h-full w-[5rem] flex flex-col items-center justify-between py-5">
      <div className="">
      <img className="w-16 h-16 object-cover" src={logo} alt="" />
      </div>

      <div id='sidebar' className="flex flex-col gap-2  flex-1 justify-center">
        <NavLink to='/about'>
          <PiUser className="icon w-12 h-12 p-3 rounded-xl" />
        </NavLink>
        <NavLink className={nav === 'chat' && 'active'} to='/'>
          <PiChatTeardropDots className=' icon w-12 h-12 p-3 rounded-xl' />
        </NavLink>
        <NavLink to='/setting'>
          <IoSettingsOutline className="icon w-12 h-12 p-3 rounded-xl" />
        </NavLink>
      </div>

       <div className="">
       {
         loading ?  <div className="skeleton h-8 w-8 shrink-0 rounded-full"></div> : <img className="rounded-full w-8 h-8 object-cover " onError={handleError} src={user?.photoURL} alt="" />
        }
       </div>

       
    </div>
  );
};

export default Sidebar;
