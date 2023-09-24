import { createSlice } from '@reduxjs/toolkit'
import axios from "axios";

export const dishSlice = createSlice({
    name: 'dish',
    initialState: {
        value: {},
        status: 'idle',
        error: null,
    },
    reducers: {
        // ...
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadDish.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadDish.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.value = action.payload;
            })
            .addCase(loadDish.rejected, (state, action) => {
                state.status = 'failed';
            });
    },
});

// ...


import { createAsyncThunk } from '@reduxjs/toolkit';


// Définissez une fonction asynchrone pour charger les données
export const loadDish = createAsyncThunk(
    'dish/load',
    async (id, thunkAPI) => {
        console.log("prout prout")
        try {
            const response = await axios.get(`http://localhost:8080/api/dishes/${id}`);
            console.log(response)
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// ...

// Action creators are generated for each case reducer function
export const { load } = dishSlice.actions;

export default dishSlice.reducer