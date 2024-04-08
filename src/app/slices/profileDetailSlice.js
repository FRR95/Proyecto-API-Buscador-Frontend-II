import { createSlice } from '@reduxjs/toolkit';

export const profileDetailSlice = createSlice({
    name: 'profileDetail',
    initialState: {
      profileDetail: {}
    },
    reducers: {
      updateProfileDetail: (state, action) => {
        return {
          ...state,
          ...action.payload
        }
      },
    }
    
});

export const { updateProfileDetail } = profileDetailSlice.actions;

export const profileDetailData = (state) => state.profileDetail;

export default profileDetailSlice.reducer;