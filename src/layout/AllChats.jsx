import { useEffect, useState } from "react";
import UserCart from "../components/UserCart";
import { Outlet } from "react-router-dom";
import axios from "axios";

const AllChats = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const i = setInterval(() => {
      fetch('https://connector-server.vercel.app/')
      .then((res) => res.json())
      .then((data) => setUsers(data));
    }, 2000);

    return () => clearInterval(i);
  
  }, []);



  return (
    <div className="flex w-full">
      <div className="bg-primary/90 backdrop-blur-2xl w-1/5 h-full px-5 pt-5">
        <h1 className="text-xl font-bold">Chats</h1>
        {/* <button onClick={del}>delete all</button> */}
        <div className="flex flex-col gap-2 pt-5">
          {users.map((user) => (
            <UserCart singleUser={user} key={user._id}></UserCart>
          ))}
        </div>
      </div>
      <Outlet></Outlet>
    </div>
  );
};

export default AllChats;