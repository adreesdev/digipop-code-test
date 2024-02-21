'use client';
import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { addTodos, deleteTodos, getTodos, updateTodos } from '../actions/todoAction';

export interface todo {
    todos: Array<{
        id: number;
        todo: string;
        completed: boolean;
        userId: number;
    }>;
    title: string;
    total: number;
    skip: number;
    limit: number;
    loading: boolean;
    error: string | null;
    success: boolean;
    openModal: boolean;
}

export type todos = {
    id: number;
    todo: string;
    completed: boolean;
    userId: number;
};

const initialState: todo = {
    todos: [],
    title: '',
    skip: 0,
    total: 0,
    limit: 3,
    loading: true,
    error: null,
    success: false,
    openModal: false,
};

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        next: (state: todo) => {
            state.skip = state.skip + state.limit;
        },
        prev: (state: todo) => {
            state.skip = state.skip - state.limit;
        },
        handlekOpen: (state: todo, { payload }: { payload: string }) => {
            state.openModal = true;
            state.title = payload;
        },
        handlekClose: (state: todo) => {
            state.openModal = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTodos.pending, (state: todo) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(getTodos.fulfilled, (state: todo, { payload }) => {
                state.loading = false;
                state.error = null;
                state.success = true;
                state.total = payload.total;
                state.todos = payload.todos;
            })
            .addCase(getTodos.rejected, (state: todo, { payload }) => {
                const error = typeof payload === 'string' ? payload : 'An error occurred';
                toast.error(error);
                state.success = false;
                state.loading = false;
                state.error = error;
            })
            .addCase(addTodos.pending, (state: todo) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(addTodos.fulfilled, (state: todo, { payload }) => {
                toast.success('Todo Added');
                state.loading = false;
                state.error = null;
                state.success = true;
                state.total = state.total + 1;
                state.todos = [...state.todos, payload];
            })
            .addCase(addTodos.rejected, (state: todo, { payload }) => {
                const error = typeof payload === 'string' ? payload : 'An error occurred';
                toast.error(error);
                state.success = false;
                state.loading = false;
                state.error = error;
            })
            .addCase(updateTodos.pending, (state: todo) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(updateTodos.fulfilled, (state: todo, { payload }) => {
                toast.success('Todo Updated');
                state.loading = false;
                state.error = null;
                state.success = true;

                const index = state.todos.findIndex((obj) => obj.id === payload.id);

                state.todos[index] = { ...payload };
            })
            .addCase(updateTodos.rejected, (state: todo, { payload }) => {
                const error = typeof payload === 'string' ? payload : 'An error occurred';
                toast.error(error);
                state.success = false;
                state.loading = false;
                state.error = error;
            })
            .addCase(deleteTodos.pending, (state: todo) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(deleteTodos.fulfilled, (state: todo, { payload }) => {
                toast.success('Todo Deleted');
                state.loading = false;
                state.error = null;
                state.success = true;

                state.todos = state.todos.filter((obj) => obj.id !== payload);
            })
            .addCase(deleteTodos.rejected, (state: todo, { payload }) => {
                const error = typeof payload === 'string' ? payload : 'An error occurred';
                toast.error(error);
                state.success = false;
                state.loading = false;
                state.error = error;
            });
    },
});

export const { next, prev, handlekOpen, handlekClose } = todoSlice.actions;

export default todoSlice.reducer;
