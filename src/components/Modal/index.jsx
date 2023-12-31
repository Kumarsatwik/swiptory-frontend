import React, { useEffect, useRef, useState } from "react";
import "../styles/modal.css";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useDispatch } from "react-redux";
import { setUser, setToken, setLoggedIn } from "../../reducer/userSlice";
import axios from "axios";
import { toast } from "react-hot-toast";
import { IoMdEye, IoIosEyeOff } from "react-icons/io";
const Modal = ({ isLogin, setIsLogin }) => {
  const dispatch = useDispatch();
  const usernameRef = useRef();
  const passwordRef = useRef();

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    axios
      .post(
        `https://swiptory-fm06.onrender.com/auth/${
          isLogin == "login" ? "login" : "register"
        }`,
        { username, password }
      )
      .then((res) => {
        dispatch(setToken(res.data.token));
        dispatch(setLoggedIn(true));
        setIsLogin("");

        dispatch(setUser(res.data.user));
        localStorage.setItem("_user", JSON.stringify(res.data.user));
        localStorage.setItem("_token", res.data.token);
        localStorage.setItem("_loggedIn", true);
        toast.success("Login Successful");
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  return (
    <>
      <div className="modal">
        <IoIosCloseCircleOutline
          className="close_icon"
          onClick={() => setIsLogin("")}
        />
        <h1 className="modal__heading">
          {isLogin == "login" ? "Login" : "Register"} to SwipTory
        </h1>
        <div className="modal__form">
          <span>
            <label htmlFor="">Username</label>
            <input type="text" ref={usernameRef} placeholder="Enter Username" />
          </span>
          <span className="passwordSpan">
            <label htmlFor="">Password</label>
            <input
              type={!showPassword ? "password" : "text"}
              ref={passwordRef}
              placeholder="Enter Password"
            />
            {!showPassword ? (
              <IoMdEye onClick={() => setShowPassword(true)} className="eye-icon"  />
            ) : (
              <>
                <IoIosEyeOff onClick={() => setShowPassword(false)} className="eye-icon" />
              </>
            )}
          </span>
          <button className="btn bg-blue text-black" onClick={handleSubmit}>
            {isLogin == "login" ? "Login" : "Register"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
