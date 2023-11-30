import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./reducer/postSlice";
import userSlice from "./reducer/userSlice";

const userInfo = localStorage.getItem("_user")
  ? JSON.parse(localStorage.getItem("_user"))
  : null;

const tokenInfo = localStorage.getItem("_token")
  ? localStorage.getItem("_token")
  : null;

const loggedInInfo = localStorage.getItem("_loggedIn");

const postInfo = localStorage.getItem("_post")
  ? JSON.parse(localStorage.getItem("_post"))
  : null;

const initialState = {
  user: { userDetails: userInfo, token: tokenInfo, loggedIn: loggedInInfo },
  posts: {
    postList: postInfo,
    addDataModal: {
      isOpen: false,
      editData: null,
      postId: null,
    },
    authModal: false,
  },
};

const store = configureStore({
  reducer: {
    posts: postSlice.reducer,
    user: userSlice.reducer,
  },
  preloadedState: initialState,
});

export default store;
