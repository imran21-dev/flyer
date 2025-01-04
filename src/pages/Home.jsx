import { useContext } from "react";
import { ThemeContext } from "../provider/ContextApi";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";


const Home = () => {
    const {user} = useContext(ThemeContext)
    return (
        <div className="flex h-screen bg-appBackground bg-no-repeat bg-cover">
            <Sidebar></Sidebar>
            <Outlet></Outlet>
        </div>
    );
};

export default Home;