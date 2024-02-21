'use client';
import React, { useEffect, useState } from 'react';
import {
    Backdrop,
    Box,
    CircularProgress,
    Container,
    IconButton,
    Paper,
    Stack,
    Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { EditNote, Delete, NavigateNext, NavigateBefore } from '@mui/icons-material';

import { useAppDispatch, useAppSelector } from '@/utils/store/hooks';
import { deleteTodos, getTodos } from '@/utils/store/actions/todoAction';
import { handlekOpen, next, prev } from '@/utils/store/features/todoSlice';
import TodoModal from '@/Components/TodoModal';

export default function Index() {
    const [completed, setcompleted] = useState(false);
    const [todo, settodo] = useState('');
    const [todoId, settodoId] = useState(0);
    const { token, id } = useAppSelector((state) => state.user);
    const { skip, todos, total, limit, loading } = useAppSelector((state) => state.todo);

    const router = useRouter();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!token) router.push('/login');
        else if (id) dispatch(getTodos({ skip, id }));
    }, [token, router, dispatch, skip, id]);

    return (
        <>
            <Backdrop
                sx={(theme) => ({
                    color: theme.palette.text.primary,
                    zIndex: theme.zIndex.drawer + 1,
                })}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <TodoModal todo={todo} completed={completed} todoId={todoId} />
            <Container maxWidth="md">
                <Box
                    sx={{
                        width: '100%',
                        mx: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 3,
                    }}
                >
                    <Typography variant="h3" textAlign="center">
                        Todo List
                    </Typography>
                    {todos.map((todo, index) => (
                        <Paper
                            variant="outlined"
                            key={index}
                            sx={{
                                width: '100%',
                                mx: 'auto',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                gap: 2,
                                p: 2,
                            }}
                        >
                            <Typography>{todo.todo}</Typography>
                            <Box>
                                <IconButton
                                    onClick={() => {
                                        settodo(todo.todo);
                                        settodoId(todo.id);
                                        setcompleted(todo.completed);
                                        dispatch(handlekOpen('Update'));
                                    }}
                                >
                                    <EditNote />
                                </IconButton>
                                <IconButton
                                    onClick={() => {
                                        dispatch(deleteTodos({ id: todo.id }));
                                    }}
                                >
                                    <Delete />
                                </IconButton>
                            </Box>
                        </Paper>
                    ))}
                    <Stack direction="row" spacing={2}>
                        <IconButton
                            onClick={() => dispatch(prev())}
                            disabled={skip === 0 || loading}
                        >
                            <NavigateBefore />
                        </IconButton>
                        <IconButton
                            onClick={() => dispatch(next())}
                            disabled={skip + limit >= total || loading}
                        >
                            <NavigateNext />
                        </IconButton>
                    </Stack>
                </Box>
            </Container>
        </>
    );
}
