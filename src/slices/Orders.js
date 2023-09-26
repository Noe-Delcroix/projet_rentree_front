import { createSlice } from '@reduxjs/toolkit'
import axios from "axios";

export const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        value: [],
        orderDetails: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        // ...
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadOrders.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadOrders.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.value = action.payload;
            })
            .addCase(loadOrders.rejected, (state, action) => {
                state.status = 'failed';
            })
            .addCase(loadDetailledOrders.pending, (state) => {
                    state.status = 'loading';
            })
            .addCase(loadDetailledOrders.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.orderDetails = action.payload;
            })
            .addCase(loadDetailledOrders.rejected, (state, action) => {
                state.status = 'failed';
            });
    },
});

// ...


import { createAsyncThunk } from '@reduxjs/toolkit';
import {toaster} from "evergreen-ui";


// Définissez une fonction asynchrone pour charger les données
export const loadOrders = createAsyncThunk(
    'orders/load',
    async ({ sortType = 'DATE', sortOrder = 'DESC' }, thunkAPI) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/orders?sortBy=${sortType}&sortOrder=${sortOrder}`);
            console.log(response)
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const loadDetailledOrders = createAsyncThunk(
    'orders/loadDetailled',
    async (_, thunkAPI) => {
        const state = thunkAPI.getState();
        console.log("state" , state)
        const axiosPromises = state.orders.value.map(async (e) => {
            try {
                const response = await axios.get('http://localhost:8080/api/orders/' + e.id );
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

export const addOrder = createAsyncThunk(
    'orders/add',
    async ({ address, basket }, thunkAPI) => {  // Utilisez une déstructuration pour extraire address et basket des arguments
        if (address === null || address === undefined || address === '') {
            toaster.warning('Veuillez renseigner une adresse');
            return thunkAPI.rejectWithValue("L'adresse est vide");
        }
        const d = {
            orderContent: {},
            address: address
        };
        console.log("address" + address);

        basket.forEach(e => {
            if(e.quantity>0){
                d.orderContent[e.id]=e.quantity;
            }
        });

        try {
            const response = await axios.post('http://localhost:8080/api/orders', d);
            console.log(response.data);
            toaster.success('Votre commande a bien été envoyé');
            // Utilisez NavigationContainer.navigate ou une autre méthode pour naviguer
        } catch (error) {
            console.log('ERREUR');
            console.error(error);
            toaster.warning('Une erreur est survenue');
            return thunkAPI.rejectWithValue(error.message);
        }

        try {
            const response = await axios.get('http://localhost:8080/api/orders?sortBy=DATE&sortOrder=DESC');
            console.log(response);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// ...

// Action creators are generated for each case reducer function
export const { load, add, fetchById } = ordersSlice.actions;

export default ordersSlice.reducer