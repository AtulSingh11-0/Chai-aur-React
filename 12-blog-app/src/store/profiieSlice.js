import { createSlice } from "@reduxjs/toolkit";

const initialProfileState = {
  userProfile: null,
  userPosts: [],
  isLoading: false,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initialProfileState,
  reducers: {
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    setUserPosts: (state, action) => {
      state.userPosts = action.payload;
    },
    addPost: (state, action) => {
      state.userPosts.unshift(action.payload);
    },
    updatePost: (state, action) => {
      const index = state.userPosts.findIndex(
        (post) => post.$id === action.payload.$id
      );
      if (index !== -1) {
        state.userPosts[index] = action.payload;
      }
    },
    deletePost: (state, action) => {
      state.userPosts = state.userPosts.filter(
        (post) => post.$id !== action.payload
      );
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearProfile: (state) => {
      state.userProfile = null;
      state.userPosts = [];
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  setUserProfile,
  setUserPosts,
  addPost,
  updatePost,
  deletePost,
  setLoading,
  setError,
  clearProfile,
} = profileSlice.actions;
export default profileSlice.reducer;
