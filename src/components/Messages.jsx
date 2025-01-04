
import React, { useEffect, useState, useContext, useRef } from 'react';
import receiveSound from '../assets/receive.mp3';
import sendSound from '../assets/send.mp3';
import { ThemeContext } from '../provider/ContextApi';
import Chat from './Chat';
import userImg from "../assets/blank-profile-picture-973460_640.webp";
import { div } from 'motion/react-client';

const Messages = ({ senderEmail, receiverEmail, messagesEndRef, scrollToBottom,name, photo, email }) => {
  const { user } = useContext(ThemeContext);
  const currentUser = user?.email;
  const [allMessage, setAllMessage] = useState([]);
  const containerRef = useRef(null);
 

  const reverseAll = [...allMessage].reverse();
  const lastLength = reverseAll.length;
  const defaultLastMessage = reverseAll[lastLength - 1];
  const [newLastMessage, setNewLastMessage] = useState(undefined);






  useEffect(() => {

  
     const i = setInterval(() => {
        fetch(
          `https://connector-server.vercel.app/messages?senderEmail=${senderEmail}&receiverEmail=${receiverEmail}`
        )
          .then((res) => res.json())
          .then((data) => {

            setAllMessage(data)

          
          });

      
        
          setNewLastMessage(defaultLastMessage);

          if (defaultLastMessage?._id !== newLastMessage?._id) {
            if (defaultLastMessage !== undefined) {
              if (defaultLastMessage?.senderEmail === currentUser) {
                new Audio(sendSound).play();
               
              } 
          
              else {
                new Audio(receiveSound).play();
               
              }
            }
            
            if (containerRef.current) {
              const lastChild = containerRef.current.lastChild;
               if (lastChild) {
                 lastChild.className = 'ok'
               }
             const targetElement = document.querySelector('.ok');
             if (targetElement) {
               targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
             }
              
            }
          }


     
        }, 500);


      
      
          return () => clearInterval(i)

   
  }, [currentUser, defaultLastMessage, newLastMessage?._id, receiverEmail, senderEmail]);

    const handleError = (e) => {
      e.target.src = userImg
     }
  
 
  


  return (
    <div className="h-max overflow-y-auto flex-1">
      <div id='userInfo' >
        <img className='w-28 h-28 rounded-full object-cover' src={photo} onError={handleError} alt="user image" />
        <h1 className='text-xl font-semibold text-neutral/80 pt-1'>{name} {currentUser === email && '(You)'}</h1>
        <p className='opacity-80'>{email}</p>
       { currentUser === email ? <p className='opacity-80 text-sm'>Click on the message box to save message</p> : <p className='opacity-80 text-sm'>Click on the message box to send a message</p>}
      </div>

        <div id='chatBox' ref={containerRef} >
      {reverseAll.map((singleChat) => (
        <Chat singleChat={singleChat} key={singleChat._id}></Chat>
      ))}
    
    </div>
    </div>


  );
};

export default Messages;
