import { createSlice } from '@reduxjs/toolkit';

interface ThemeState {
    mode: 'light' | 'dark';
}

const initialState: ThemeState = {
    mode: 'dark',
};
export const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        changeTheme: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light';
        },
    },
});
export const { changeTheme } = themeSlice.actions;
export default themeSlice.reducer;
