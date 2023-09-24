import { createSlice } from '@reduxjs/toolkit'
import axios from "axios";

export const dietsSlice = createSlice({
    name: 'diets',
    initialState: {
        value: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        // ...
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadDiets.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadDiets.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.value = action.payload;
            })
            .addCase(loadDiets.rejected, (state, action) => {
                state.status = 'failed';
            });
    },
});

// ...


import { createAsyncThunk } from '@reduxjs/toolkit';


// Définissez une fonction asynchrone pour charger les données
export const loadDiets = createAsyncThunk(
    'diets/load',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('http://localhost:8080/api/dishes/diets');
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// ...

// Action creators are generated for each case reducer function
export const { load } = dietsSlice.actions;

export default dietsSlice.reducer