import { createSlice } from '@reduxjs/toolkit'
import axios from "axios";

export const detailledBasketSlice = createSlice({
    name: 'detailledBasket',
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
            .addCase(loadDetailledBasket.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadDetailledBasket.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.value = action.payload;
            })
            .addCase(loadDetailledBasket.rejected, (state, action) => {
                state.status = 'failed';
            });
    },
});

// ...


import { createAsyncThunk } from '@reduxjs/toolkit';

// Définissez une fonction asynchrone pour charger les données
export const loadDetailledBasket = createAsyncThunk(
    'dishes/load',
    async (basket, thunkAPI) => {
        const axiosPromises = basket.map(async (e) => {
            try {
                const response = await axios.get('http://localhost:8080/api/dishes/' + e.id );
                console.log(response.data);
                return response.data;
            } catch (error) {
                console.error("Erreur lors de la requête axios :", error);
                return null;
            }
        });

        // Attendre que toutes les requêtes soient terminées avant de mettre à jour detailledBasket
        try {
            return await Promise.all(axiosPromises);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// ...

// Action creators are generated for each case reducer function
export const { load } = detailledBasketSlice.actions;

export default detailledBasketSlice.reducer