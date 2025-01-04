import { NavLink, useNavigation } from 'react-router-dom';
import userImg from '../assets/blank-profile-picture-973460_640.webp'
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../provider/ContextApi';


const UserCart = ({singleUser}) => {
    const {user} = useContext(ThemeContext)
    const userEmail = user?.email
    
    const {name, photo , _id, email,active} = singleUser

    const [lastMessage, setLastMessage] = useState(null)


  useEffect(()=>{
    const interval = setInterval(() => {
      fetch(
        `https://connector-server.vercel.app/last-messages?senderEmail=${userEmail}&receiverEmail=${email}`
      )
        .then((res) => res.json())
        .then((data) => setLastMessage(...data));

      
      
      
    }, 500);
    return () => clearInterval(interval);
  },[email, userEmail])


   const handleError = (e) => {
    e.target.src = userImg
   }

  
    return (
      <div id='user'>
         
          <NavLink state={{nav: 'chat'}} to={`/user/${_id}`} className='flex w-full items-center gap-3 hover:bg-primary/80 px-3 py-2 rounded-xl '>
          <figure className='relative'>
          {active && <div className="w-3 absolute h-3 border-2 bottom-0 right-0 border-white/70 rounded-full bg-text-texture"></div>}
           <img className='w-10 h-10 object-cover rounded-full' onError={handleError} src={photo} alt="User Image" />
          </figure>
           <div className='flex-1 overflow-x-hidden'>
           <h2 title={name} className='font-medium truncate  '>{name} <span>{userEmail === email ? '(You)' : ''}</span></h2>
           <p className='text-xs line-clamp-1'><span>{lastMessage?.senderEmail === userEmail && 'You: '}</span>{lastMessage ? lastMessage?.chat?.message : 'No message avaiable'}</p>
           </div>
       </NavLink>
          
      <div className='w-11/12 mx-auto h-[1px] bg-text-texture opacity-15 backdrop-blur-3xl '/>
         
      </div>
    );
};

export default UserCart;