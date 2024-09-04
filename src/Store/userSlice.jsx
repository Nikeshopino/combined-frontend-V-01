import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const BACKEND_URL = `https://yoursay-backendrender.onrender.com/v1`;
//const BACKEND_URL = `https://yoursay.live/v1`;

// Thunk to fetch user profile
export const getUserProfile = createAsyncThunk(
    'user/getUserProfile',
    async (_, { rejectWithValue }) => {
        try {
            const userId =  localStorage.getItem('userId');
            if (!userId) {
                throw new Error('No user ID found in localStorage');
            }
            const reqUrl = `${BACKEND_URL}/profile/${userId}`;
            const response = await axios.get(reqUrl);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: {
        profile: null,
        error: null,
    },
    reducers: {
        // Add any synchronous actions if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserProfile.fulfilled, (state, action) => {
                state.profile = action.payload;
            })
            .addCase(getUserProfile.rejected, (state, action) => {
                state.error = action.payload;
            });
    },
});

export default userSlice.reducer;