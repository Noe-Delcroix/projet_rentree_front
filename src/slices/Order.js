import { createSlice } from '@reduxjs/toolkit'
import axios from "axios";

export const orderSlice = createSlice({
    name: 'order',
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
            .addCase(loadOrderInfo.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadOrderInfo.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.value = action.payload;
            })
            .addCase(loadOrderInfo.rejected, (state, action) => {
                state.status = 'failed';
                if (action.payload === "Vous n'êtes pas connecté") {
                    state.value = {};
                }
            });
    },
});

// ...


import { createAsyncThunk } from '@reduxjs/toolkit';


// Définissez une fonction asynchrone pour charger les données
export const loadOrderInfo = createAsyncThunk(
    'order/load',
    async (id,thunkAPI) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/orders/${id}`);
            return response.data;
        } catch (error) {
            if (error.response.status === 401) {
                return thunkAPI.rejectWithValue("Vous n'êtes pas connecté");
            }
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// ...

// Action creators are generated for each case reducer function
export const { load } = orderSlice.actions;

export default orderSlice.reducer