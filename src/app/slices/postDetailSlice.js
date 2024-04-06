import { createSlice } from '@reduxjs/toolkit';

export const postDetailSlice = createSlice({
    name: 'postDetail',
    initialState: {
      postDetail: {}
    },
    reducers: {
      updatePostDetail: (state, action) => {
        return {
          ...state,
          ...action.payload
        }
      },
    }
    
});

export const { updatePostDetail } = postDetailSlice.actions;

export const detailData = (state) => state.postDetail;

export default postDetailSlice.reducer;