import { createSlice } from '@reduxjs/toolkit'
import axios from "axios";

export const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        value: [],
        orderDetails: {
            orderContent: {},
            // ... autres propriétés
        },
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
            .addCase(fetchOrderById.pending, (state) => {
                    state.status = 'loading';
            })
            .addCase(fetchOrderById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.orderDetails = action.payload;
            })
            .addCase(fetchOrderById.rejected, (state, action) => {
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

export const fetchOrderById = createAsyncThunk(
    'orders/fetchById',
    async (orderId, thunkAPI) => {
        console.log("orderId" + orderId);
        try {
            const response = await axios.get(`http://localhost:8080/api/orders/${orderId}`);
            console.log(response.data);
            return {
                orderContent: response.data.orderContent,
                totalPrice: response.data.totalPrice,
                date: response.data.date,
                address: response.data.address  // Assurez-vous que c'est "address" et non "adress" si c'est la clé correcte dans votre réponse
            };
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