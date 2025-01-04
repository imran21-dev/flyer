import { useContext, useEffect, useRef, useState } from "react";
import { useLocation,  } from "react-router-dom";
import userImg from "../assets/blank-profile-picture-973460_640.webp";
import { BsThreeDots } from "react-icons/bs";

import { ThemeContext } from "../provider/ContextApi";
import Messages from "../components/Messages";
import sendIcon from '../assets/send.png'
import axios from "axios";
import moment from "moment";



const DynamicUser = () => {
  
  const { pathname } = useLocation();
  const id = pathname.split("/")[2];
  const [buffer, setBuffer] = useState(true);

  const [dynamicUser, setDynamicUser] = useState([]);
  const { name, photo, email, } = dynamicUser;
  const [activeUser, setActiveUser] = useState([]);
  const { active, lastSeen } = activeUser;

  const { user, } = useContext(ThemeContext);
  const senderEmail = user?.email;
  const senderPhoto = user?.photoURL
  const receiverEmail = email;
  const messagesEndRef = useRef(null);
  const [loading, setLoading] = useState(true)
 

  const [relativeTime, setRelativeTime] = useState("");

  useEffect(() => {
    const formattedDate = moment(lastSeen);

    if (formattedDate.isValid()) {
      setRelativeTime(formattedDate.fromNow());
    } else {
      
      setRelativeTime("Invalid date");
    }
  }, [lastSeen]);
  



  useEffect(() => {

    setLoading(true)
      axios.get(`https://connector-server.vercel.app/singleUser/${id}`)
    .then(res => {setDynamicUser(res.data)
      setLoading(false)
    })
    setBuffer(false);
 
    
  }, [id]);

  
  useEffect(() => {
    const i = setInterval(() => {
      axios.get(`https://connector-server.vercel.app/singleUser/${id}`)
      .then(res => setActiveUser(res.data))
    }, 1000);

    return () => clearInterval(i);
  
  }, [id]);

  const callApi = () => { 
    axios.patch(`https://connector-server.vercel.app/user-inActive?email=${senderEmail}`)
    .then(res => {

    })
  }

  const handleMessage = (e) => {
    e.preventDefault();
    const message = e.target.message.value;
    
    if (message.length < 1) {
        return;
    }
    
    
    
    const chat = {
      message,
      senderEmail,
    };

    const messageModule = { chat, senderEmail, receiverEmail, senderPhoto };

    axios.post("https://connector-server.vercel.app/message-add", messageModule)
      
      .then((res) => {
        if (res.data.insertedId) {
           e.target.reset()

        }

        axios.patch(`https://connector-server.vercel.app/user-active?email=${senderEmail}`)
        .then(res => {

        })

        setTimeout(callApi, 120000)



      });
  };

  const handleError = (e) => {
    e.target.src = userImg
   }
  return (
    
  loading ? <div>
    loading
  </div> : 
  <div className="flex-1 relative flex flex-col justify-between">
      <div className="px-5 py-5 bg-primary/70   w-full flex items-center gap-3 font-medium">
        {buffer ? (
          <div className="skeleton h-10 w-10 shrink-0 rounded-full"></div>
        ) : (
          <figure className="relative">
            {active && <div className="w-3 absolute h-3 border-2 bottom-0 right-0 border-white/70 rounded-full bg-text-texture"></div>}
            <img
            className="w-10 h-10 object-cover rounded-full "
            src={photo}
            onError={handleError}
            alt=""
          />
          </figure>
        )}
        {buffer ? (
          <div className="skeleton h-4 w-28"></div>
        ) : (
          <div className="flex-1  flex flex-col">
            <h1 className="flex-1">{name} <span>{senderEmail === email && '(You)'}</span></h1>

            {lastSeen &&  <div>
          {active ? <span className="text-xs font-normal leading-none text-accent">online</span> : 
           <span className="text-xs font-normal leading-none opacity-70">Active {relativeTime}</span>
          }
          </div>}
         
           
          </div>
        )}
        <BsThreeDots className=" w-6 h-6 rounded-full p-1 " />
      </div>

      <section className="pl-5 bg-primary/50  backdrop-blur-md overflow-y-auto flex-1  flex flex-col justify-end py-4 ">
      
        <Messages
          senderEmail={senderEmail}
          receiverEmail={receiverEmail}
          messagesEndRef={messagesEndRef}
      
          photo={photo}
          name={name}
          email={email}
        ></Messages>
      </section>

      <div className="px-5 bg-primary/70 py-4">
     
        <form
          onSubmit={handleMessage}
          className="w-full flex items-center gap-3"
        >
          {user ? (
            <input
              name="message"
              autoFocus
              className="py-2 px-3 rounded-full  indent-2 flex-1 focus:outline-none bg-primary/90 backdrop-blur-3xl placeholder:font-light"
              placeholder="Enter Message..."
              type="text"
            />
          ) : (
            <div className="skeleton py-5 px-3 rounded-xl flex-1"></div>
          )}

          {user ? (
            <button className="btn shadow-none bg-transparent hover:bg-transparent border-none min-h-max h-max">
              <img className="w-8" src={sendIcon} alt="" />
            </button>
          ) : (
            <div className="skeleton py-5 px-5 shrink-0 rounded-full"></div>
          )}
        </form>
      </div>
    </div>

    
  );
};

export default DynamicUser;
