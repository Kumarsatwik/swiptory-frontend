import { useState } from "react";
import "../styles/header.css";
import { MdOutlineMenu } from "react-icons/md";
import Modal from "../Modal";
import { FaBookmark } from "react-icons/fa";
import Menu from "../Menu";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AddStory from "../AddStory/addStory";
import { openModal, closeModal } from "../../reducer/postSlice";

const Header = ({ newPostModal, setNewPostModal }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [loggedIn, setLoggedIn] = useState("");
  const [isUser, setIsUser] = useState(false);

  let user = useSelector((state) => state.user);
  let post = useSelector((state) => state.posts);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // console.log(loggedIn);

  const ClosePostModal = () => {
    dispatch(closeModal());
  };

  return (
    <header className="header">
      <Link to="/" className="header__heading">
        SwipTory
      </Link>
      <div className="header__menu">
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
            <button
              onClick={() => navigate("/bookmark")}
              className="btn bg-red"
            >
              <FaBookmark /> Bookmark
            </button>
            <button
              className="btn bg-red"
              onClick={() => dispatch(openModal(""))}
            >
              Add Story
            </button>
            <img
              src="https://img.icons8.com/office/80/user-male-circle.png"
              className="header__menu-img"
              alt=""
            />
            <MdOutlineMenu
              onClick={() => setShowMenu(!showMenu)}
              className="header__menu-icon"
            />
          </>
        )}
      </div>
      <div className="menu_icon">
        <MdOutlineMenu
          onClick={() => setShowMenu(!showMenu)}
          className="header__menu-icon"
        />
      </div>
      {!user.loggedIn && loggedIn !== "" && (
        <Modal isLogin={loggedIn} setIsLogin={setLoggedIn} />
      )}
      {showMenu && (
        <Menu
          isUser={isUser}
          setLoggedIn={setLoggedIn}
          setShowMenu={setShowMenu}
        />
      )}
      {post.addDataModal.isOpen && (
        <AddStory
          onClose={ClosePostModal}
          editData={post.addDataModal.editData}
        />
      )}
    </header>
  );
};

export default Header;
