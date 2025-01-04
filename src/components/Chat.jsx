import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../provider/ContextApi";
import userimg from '../assets/blank-profile-picture-973460_640.webp'

const Chat = ({ singleChat }) => {
  const { user } = useContext(ThemeContext);
  const userEmail = user.email;
  const { chat,senderPhoto } = singleChat;
  const { message, senderEmail } = chat;


  const handleError = (e) => {
    e.target.src = userimg
   }
  


// const deleteAll = () => {
//   fetch('https://connector-server.vercel.app/delete',{
//     method: "DELETE"
//   })
//   .then(res => res.json())
//   .then(data => console.log(data))
// }




  return (
    <div className="">
      <div
        className={`chat py-2 ${
          userEmail === senderEmail ? "chat-end" : "chat-start"

        }`}
      >
        <div className="chat-image avatar">
          <div className={`w-9 h-9 object-cover rounded-full ${userEmail === senderEmail ? 'mr-5' : ''}`} >
            <img
              alt="user photo"
              onError={handleError}
              src={senderPhoto ? senderPhoto : userimg}
            />
          </div>
        </div>
        
        <div className={`chat-bubble  chat-bubble-info py-2 text-black h-max min-h-max  rounded-3xl text-sm ${userEmail === senderEmail ? 'bg-gradient-to-r from-accent  text-white': 'bg-primary'}`}>{message}</div>
       
      </div>
     
    </div>
  );
};

export default Chat;
