import Lottie from 'lottie-react';
import conversationLottie from '../assets/lottie/conversation.json'

const StartConversation = () => {
    return (
        <div className='flex flex-col bg-primary/80 backdrop-blur-3xl items-center justify-center w-full'>
            
             <Lottie animationData={conversationLottie}></Lottie>
            <div className='text-lg px-10 font-semibold bg-primary/40 border border-primary text-transparent   py-1 rounded-full'><h1 className='bg-text-texture bg-clip-text'>Start Conversation</h1></div>
            
            </div>
    );
};

export default StartConversation;