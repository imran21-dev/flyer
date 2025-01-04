import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ContextApi from './provider/ContextApi.jsx';
import Home from './pages/Home.jsx';
import Register from './pages/Register.jsx';
import AllChats from './layout/AllChats.jsx';
import DynamicUser from './layout/DynamicUser.jsx';
import Login from './pages/Login.jsx';
import StartConversation from './components/StartConversation.jsx';
import HomePrivate from './private/HomePrivate.jsx';
import Setting from './layout/Setting.jsx';
import About from './layout/About.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePrivate><Home></Home></HomePrivate>,
    children: [
      {
        path: '/',
        element: <AllChats></AllChats>,
        children: [
          {
            path: '/',
            element: <StartConversation></StartConversation>
          },
          {
            path:'/user/:id',
            element: <DynamicUser></DynamicUser>
          }
        ]
      },
      {
        path: '/setting',
        element: <Setting></Setting>
      },
      {
        path: '/about',
        element: <About></About>
      },



    ]
  },
  {
    path: '/register',
    element:<Register></Register>
  },
  {
    path: '/login',
    element: <Login></Login>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextApi>
    <RouterProvider router={router} />
    </ContextApi>
  </StrictMode>,
)
