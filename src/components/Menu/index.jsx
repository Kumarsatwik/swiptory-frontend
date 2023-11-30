import React from "react";
import "../styles/menu.css";
import { FaBookmark } from "react-icons/fa";
import { MdOutlineMenu } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { openModal, closeModal } from "../../reducer/postSlice";

const Menu = ({ isUser, setLoggedIn, setShowMenu }) => {
  let user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const post = useSelector((state) => state.posts);

  const handleLogout = () => {
    console.log("Logout");
    localStorage.clear();
    setLoggedIn("");
    // navigate("/");
    window.location.href = "/";
  };

  const handleAddStory = () => {
    dispatch(openModal(""));
    setShowMenu(false);
  };

  return (
    <div className="menu">
      <div className="menu__profile">
        {user.loggedIn && (
          <>
            <h3>{user.userDetails.username}</h3>
            <button className="btn bg-red" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
      <div className="menu__content">
        {!user.loggedIn ? (
          <>
            <button
              onClick={() => setLoggedIn("register")}
              className="btn bg-red"
            >
              Register Now
            </button>
            <button
              onClick={() => setLoggedIn("login")}
              className="btn bg-blue"
            >
              Sign In
            </button>
          </>
        ) : (
          <>
            <span className="menu__user">
              <span className="menu__user-info">
                <img
                  src="https://img.icons8.com/office/80/user-male-circle.png"
                  className="header__menu-img"
                  alt=""
                />
                <h3>{user.userDetails.username}</h3>
                {/* <IoClose className="close_icon" /> */}
              </span>
            </span>
            <button
              className="btn bg-red"
              onClick={() => navigate("/userstory")}
            >
              Your Story
            </button>
            <button className="btn bg-red" onClick={handleAddStory}>
              Add Story
            </button>
            <button
              onClick={() => navigate("/bookmark")}
              className="btn bg-red"
            >
              <FaBookmark /> Bookmark
            </button>
            <button type="button" className="btn bg-red" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Menu;
