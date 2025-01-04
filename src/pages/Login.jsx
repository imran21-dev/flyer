import { useContext, useState } from "react";
import { ThemeContext } from "../provider/ContextApi";
import { Link, useNavigate } from "react-router-dom";
import { TbShieldLockFilled } from "react-icons/tb";
import { IoMdMail } from "react-icons/io";
import { motion } from "motion/react";
import { CgSpinner } from "react-icons/cg";
import axios from "axios";

const Login = () => {
  const { login, user, setUser, setLoading, setVerified } =
    useContext(ThemeContext);
  const navigate = useNavigate();
  const [buttonSpin, setButtonSpin] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setButtonSpin(true);
    const form = new FormData(e.target);
    const formData = Object.fromEntries(form.entries());
    const { email, password } = formData;

    login(email, password)
      .then((users) => {
        const currentUser = users.user;

        if (currentUser.emailVerified) {
          setUser(currentUser);
          setLoading(false);
          setButtonSpin(false);

          const userName = currentUser.displayName;
          const userEmail = currentUser.email;
          const userVerification = currentUser.emailVerified;
          const userPhoto = currentUser.photoURL;
          const userTheme = "light";
          const verifiedUser = {
            name: userName,
            email: userEmail,
            isVerified: userVerification,
            photo: userPhoto,
            theme: userTheme,
          };
          
   

  

          axios.post("https://connector-server.vercel.app/user-add", verifiedUser)
          .then(res => {

          })
          
          
          
          
          
          
          
          
          
          
          navigate("/");



        } else {
          setVerified(false);
          setButtonSpin(false);

          
        }
      })
      .catch((error) => {
       
        setButtonSpin(false);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen relative">
      <motion.h1
        initial={{ opacity: 0, scale: 0.5, y: [0, 100] }}
        animate={{ opacity: 1, scale: 1, y: [100, 0] }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className="text-transparent leading-[5rem] font-extrabold bg-text-texture  text-3xl bg-clip-text text-left w-5/12"
      >
        Welcome to
        <span className="font-[Pacifico] text-4xl"> Flyer</span>
      </motion.h1>

      <motion.form
        onSubmit={handleLogin}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 2,
          delay: 1,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className=" w-5/12 bg-red-200/0"
      >
        {user ? (
          <h2 className="input-label">
            A verification email sent to{" "}
            <span className="font-medium">{user?.email} </span>
            <br /> Activate to login
          </h2>
        ) : (
          ""
        )}

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
                placeholder="Enter your password"
                className="input-class"
                required
              />
            </div>
          </div>
        </div>

        <div className="form-control mt-6">
          <button className="btn border-none bg-text-texture text-white rounded-full">
            {buttonSpin && <CgSpinner size={20} className="animate-spin" />}{" "}
            Login
          </button>
        </div>

        <div className="pt-2 text-center">
          <h2 className="text-xs font-medium text-neutral/70">
            Do not have an account?{" "}
            <Link
              to="/register"
              className="text-accent hover:underline font-bold"
            >
              Create
            </Link>
          </h2>
        </div>
      </motion.form>
    </div>
  );
};

export default Login;
