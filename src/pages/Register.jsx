import { motion } from "motion/react";
import { useContext, useState } from "react";
import { IoMdMail } from "react-icons/io";
import { PiLink } from "react-icons/pi";
import { TbShieldLockFilled } from "react-icons/tb";

import { TiUser } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../provider/ContextApi";
import { sendEmailVerification, updateProfile } from "firebase/auth";
import { auth } from "../firebase.config";
import { CgSpinner } from "react-icons/cg";

const Register = () => {
  const { registration, } = useContext(ThemeContext);
  const [buttonSpin, setButtonSpin] = useState(false);
  const navigate = useNavigate()
  const handleSignUp = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target).entries());

    setButtonSpin(true);

    const { name, photoURL, email, password } = formData;

    registration(email, password)
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photoURL,
        })
          .then(() => {
            setButtonSpin(false);
          })
          .catch((error) => {
            setButtonSpin(false);

         
          });
        sendEmailVerification(auth.currentUser).then(() => {
          setButtonSpin(false);
          
          navigate('/login')
          
        
        });
      })
      .catch((error) => {
        setButtonSpin(false);

        
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <motion.h1
        initial={{ opacity: 0, scale: 0.5, y: [0, 100] }}
        animate={{ opacity: 1, scale: 1, y: [100, 0] }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className="text-transparent leading-[5rem]  font-extrabold bg-text-texture w-fit text-3xl bg-clip-text"
      >
        Create your account on
        <span className="font-[Pacifico] text-4xl"> Flyer</span>
      </motion.h1>

      <motion.form
        onSubmit={handleSignUp}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 2,
          delay: 1,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className=" w-5/12 bg-red-200/0"
      >
        <div className="form-control ">
          <label className="label">
            <span className="input-label">Name</span>
          </label>
          <div className="input-bg">
            <div className="input-con">
              <TiUser className="mx-2 text-lg text-accent" />
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="input-class"
                required
              />
            </div>
          </div>
        </div>

        <div className="form-control ">
          <label className="label">
            <span className="input-label">Photo URL</span>
          </label>
          <div className="input-bg">
            <div className="input-con">
              <PiLink className="mx-2 text-lg text-accent" />
              <input
                type="url"
                name="photoURL"
                placeholder="Enter your photo URL"
                className="input-class"
                required
              />
            </div>
          </div>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="input-label">Email</span>
          </label>
          <div className="input-bg">
            <div className="input-con">
              <IoMdMail className="mx-2  text-accent" />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input-class"
                required
              />
            </div>
          </div>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="input-label">Password</span>
          </label>
          <div className="input-bg">
            <div className="input-con">
              <TbShieldLockFilled className="mx-2  text-accent" />
              <input
                type="password"
                name="password"
                placeholder="Enter strong password"
                className="input-class"
                required
              />
            </div>
          </div>
        </div>

        <div className="form-control mt-6">
          <button className="btn  border-none bg-text-texture text-white rounded-full">
            {buttonSpin && <CgSpinner size={20} className="animate-spin" />}{" "}
            Sign Up
          </button>
        </div>

        <div className="pt-2 text-center">
          <h2 className="text-xs font-medium text-neutral/70">
            Already have an account?{" "}
            <Link to="/login" className="text-accent hover:underline font-bold">
              Login
            </Link>
          </h2>
        </div>
      </motion.form>
    </div>
  );
};

export default Register;
