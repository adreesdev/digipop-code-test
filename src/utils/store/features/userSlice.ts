'use client';
import { createSlice } from '@reduxjs/toolkit';
import { userAuth, userLogin, userSignup } from '../actions/userAction';
import { toast } from 'react-toastify';

export interface user {
    id: number | null;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
    token: string | null;
    loading: boolean;
    error: string | null;
    success: boolean;
}

const initialState: user = {
    id: null,
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    gender: '',
    image: '',
    token: '',
    loading: false,
    error: null,
    success: false,
};
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(userSignup.pending, (state: user) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(userSignup.fulfilled, (state: user) => {
                toast.success('Signed up');
                state.loading = false;
                state.error = null;
                state.success = true;
            })
            .addCase(userSignup.rejected, (state: user, { payload }) => {
                const error = typeof payload === 'string' ? payload : 'An error occurred';
                toast.error(error);
                state.success = false;
                state.loading = false;
                state.error = error;
            })
            .addCase(userLogin.pending, (state: user) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(userLogin.fulfilled, (state: user, { payload }) => {
                toast.success('Logged in');
                return {
                    ...payload,
                    success: true,
                    error: null,
                    loading: false,
                };
            })
            .addCase(userLogin.rejected, (state: user, { payload }: any) => {
                const error = typeof payload === 'string' ? payload : 'An error occurred';
                toast.error(error);
                state.loading = false;
                state.success = false;
                state.error = error;
            })
            .addCase(userAuth.pending, (state: user) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(userAuth.fulfilled, (state: user, { payload }) => {
                return {
                    ...payload,
                    token: state.token,
                    success: true,
                    error: null,
                    loading: false,
                };
            })
            .addCase(userAuth.rejected, (state: user) => {
                return {
                    ...state,
                    id: null,
                    username: '',
                    email: '',
                    firstName: '',
                    lastName: '',
                    gender: '',
                    image: '',
                    token: '',
                    loading: false,
                    error: null,
                    success: false,
                };
            });
    },
});

export default userSlice.reducer;
