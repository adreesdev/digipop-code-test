import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { todo, todos } from '../features/todoSlice';

export const getTodos = createAsyncThunk(
    'todo/getstatus',
    async (
        {
            skip,
            id,
        }: {
            skip: number;
            id: number;
        },
        { rejectWithValue },
    ) => {
        try {
            const data = await axios
                .get(`${process.env.NEXT_PUBLIC_BASE_URL}/todos/user/${id}`, {
                    params: {
                        limit: 3,
                        skip: skip,
                    },
                })
                .then((res: { data: todo }) => res.data);

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
export const addTodos = createAsyncThunk(
    'todo/addstatus',
    async (
        {
            todo,
            completed,
            id,
        }: {
            todo: string;
            completed: boolean;
            id: number;
        },
        { rejectWithValue },
    ) => {
        try {
            const data = await axios
                .post(`${process.env.NEXT_PUBLIC_BASE_URL}/todos/add`, {
                    todo: todo,
                    completed,
                    userId: id,
                })
                .then((res: { data: todos }) => res.data);

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
export const updateTodos = createAsyncThunk(
    'todo/updatestatus',
    async (
        {
            todo,
            completed,
            id,
        }: {
            todo: string;
            completed: boolean;
            id: number;
        },
        { rejectWithValue },
    ) => {
        try {
            const data = await axios
                .put(`${process.env.NEXT_PUBLIC_BASE_URL}/todos/${id}`, {
                    todo: todo,
                    completed,
                })
                .then((res: { data: todos }) => res.data);

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
export const deleteTodos = createAsyncThunk(
    'todo/deletestatus',
    async (
        {
            id,
        }: {
            id: number;
        },
        { rejectWithValue },
    ) => {
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/todos/${id}`);

            return id;
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    },
);
