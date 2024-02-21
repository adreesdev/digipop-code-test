import { addTodos, updateTodos } from '@/utils/store/actions/todoAction';
import { handlekClose } from '@/utils/store/features/todoSlice';
import { useAppDispatch, useAppSelector } from '@/utils/store/hooks';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputBase,
    MenuItem,
    Paper,
    Select,
} from '@mui/material';
import React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

interface todo {
    todo: string;
    completed: boolean;
}

export default function TodoModal({
    todo,
    completed,
    todoId,
}: {
    todo: string;
    completed: boolean;
    todoId: number;
}) {
    const { openModal, title } = useAppSelector((state) => state.todo);
    const { id } = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    const { register, handleSubmit, control } = useForm<todo>({
        defaultValues: {
            todo,
            completed,
        },
        values: {
            todo,
            completed,
        },
    });

    const submitForm: SubmitHandler<todo> = (data) => {
        if (title === 'Add') dispatch(addTodos({ ...data, id: id ? id : 0 }));
        else dispatch(updateTodos({ ...data, id: todoId }));
        dispatch(handlekClose());
    };

    return (
        <>
            <Dialog
                open={openModal}
                onClose={() => dispatch(handlekClose())}
                PaperProps={{
                    component: 'form',
                    onSubmit: handleSubmit(submitForm),
                }}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>{`${title} Todo`}</DialogTitle>
                <DialogContent>
                    <Box
                        sx={{
                            width: '100%',
                            mx: 'auto',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: 3,
                            p: 2,
                        }}
                    >
                        <Paper
                            variant="outlined"
                            sx={{
                                p: 2,
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                            }}
                        >
                            <InputBase
                                placeholder="Enter Todo"
                                {...register('todo', { value: todo })}
                                required
                                sx={{
                                    width: '100%',
                                    fontSize: '18px',
                                }}
                            />
                        </Paper>
                        <Paper
                            variant="outlined"
                            sx={{
                                py: 1,
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                            }}
                        >
                            <Controller
                                name="completed"
                                control={control}
                                defaultValue={title === 'Update' ? completed : false}
                                render={({ field }) => (
                                    <Select
                                        displayEmpty
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        required
                                        {...field}
                                        sx={{
                                            width: '100%',
                                            fontSize: '18px',
                                            '& .MuiOutlinedInput-notchedOutline': {
                                                border: 'none',
                                            },
                                        }}
                                    >
                                        <MenuItem value={'true'}>True</MenuItem>
                                        <MenuItem value={'false'}>False</MenuItem>
                                    </Select>
                                )}
                            />
                        </Paper>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => dispatch(handlekClose())}>Cancel</Button>
                    <Button type="submit">Submit</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
