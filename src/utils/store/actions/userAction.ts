import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { user } from '../features/userSlice';

export const userSignup = createAsyncThunk(
    'user/signupstatus',
    async (
        {
            username,
            email,
            firstName,
            lastName,
            gender,
            password,
        }: {
            username: string;
            email: string;
            firstName: string;
            lastName: string;
            gender: string;
            password: string;
        },
        { rejectWithValue },
    ) => {
        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/users/add`,
                { username, email, firstName, lastName, password, gender },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    },
);

export const userLogin = createAsyncThunk(
    'user/loginStatus',
    async ({ username, password }: { username: string; password: string }, { rejectWithValue }) => {
        try {
            const data = await axios
                .post(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
                    { username, password },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    },
                )
                .then((res: { data: user }) => res.data);

            return data;
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    },
);

export const userAuth = createAsyncThunk(
    'user/authStatus',
    async ({ token }: { token: string }, { rejectWithValue }) => {
        try {
            const data = await axios
                .get(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/me`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((res: { data: user }) => res.data);

            return data;
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    },
);
