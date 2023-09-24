import { createSlice } from '@reduxjs/toolkit'
import axios from "axios";

export const dishesSlice = createSlice({
    name: 'dishes',
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
            .addCase(loadDishes.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadDishes.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.value = action.payload;
            })
            .addCase(loadDishes.rejected, (state, action) => {
                state.status = 'failed';
            });
    },
});

// ...


import { createAsyncThunk } from '@reduxjs/toolkit';


// Définissez une fonction asynchrone pour charger les données
export const loadDishes = createAsyncThunk(
    'dishes/load',
    async (query, thunkAPI) => {
        try {
            const response = await axios.get('http://localhost:8080/api/dishes', { params: query });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// ...

// Action creators are generated for each case reducer function
export const { load, addDishes } = dishesSlice.actions;

export default dishesSlice.reducer