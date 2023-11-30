// postSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postList: [],
  addDataModal: {
    isOpen: false,
    editData: null,
    postId: null,
  },
  authModal: false,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    listPost(state, action) {
      state.postList = action.payload;
    },
    openModal(state, action) {
      state.addDataModal = {
        isOpen: true,
        editData: action.payload.story || "",
        postId: action.payload.postId || "",
      };
    },
    closeModal(state, action) {
      state.addDataModal = {
        isOpen: false,
        editData: null,
        postId: null,
      };
    },
    
    authModal(state, action) {
      state.authModal = !state.authModal;
    },
  },
});

export const { listPost, openModal, closeModal, authModal } = postSlice.actions;
export default postSlice;
