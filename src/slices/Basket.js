import { createSlice } from '@reduxjs/toolkit'

export const basketSlice = createSlice({
    name: 'basket',
    initialState: {
        basket: [],
        detailledBasket: []
    },
    reducers: {
        addDishesToBasket: (state, action) => {
            const { dishId, quantity } = action.payload;
            const existingDishIndex = state.basket.findIndex(item => item.id === dishId);
            if (existingDishIndex !== -1) {
                state.basket = state.basket.map((item, index) =>
                    index === existingDishIndex ? { ...item, quantity: item.quantity + quantity } : item
                );
            } else {
                const newBasketItem = { id: dishId, quantity: quantity };
                state.basket = [...state.basket, newBasketItem];
            }
            console.log("state basket", state.basket);
        },
        removeDishesFromBasket: (state, action) => {
            const { dishId, quantity } = action.payload;
            const existingDishIndex = state.basket.findIndex(item => item.id === dishId);

            if (existingDishIndex !== -1) {
                const updatedBasket = [...state.basket];
                if (quantity === 0) {
                    //setNumberOfDishes(numberOfDishes - updatedBasket.find(e => e.id === dishId).quantity)
                    updatedBasket.splice(existingDishIndex, 1); // Retirer le plat du panier
                    state.detailledBasket = state.detailledBasket.filter((item) => item.id !== dishId);
                } else {
                    updatedBasket[existingDishIndex].quantity -= quantity; // Mettre à jour la quantité
                    // setNumberOfDishes(numberOfDishes - number)
                    if (updatedBasket[existingDishIndex].quantity <= 0) {
                        // setNumberOfDishes(numberOfDishes - updatedBasket[existingDishIndex].quantity)
                        updatedBasket.splice(existingDishIndex, 1); // Retirer le plat si la quantité devient nulle
                        state.detailledBasket = state.detailledBasket.filter((item) => item.id !== dishId);

                    }
                }
                state.basket = updatedBasket;
                console.log("updated basket" , updatedBasket)
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadDetailledBasket.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(loadDetailledBasket.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.detailledBasket = action.payload;
                console.log("c'est fini" + action.payload)
            })
            .addCase(loadDetailledBasket.rejected, (state, action) => {
                state.status = 'failed';
            });
    },
})

export const selectBasketSize = (state) => {
    return state.basket.basket.reduce((total, item) => total + item.quantity, 0);
}

export const getQuantities = (state) => {
    const quantities = {};
    state.basket.basket.forEach(item => {
        quantities[item.id] = item.quantity;
    });
    return quantities;
}
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";

// Définissez une fonction asynchrone pour charger les données
export const loadDetailledBasket = createAsyncThunk(
    'basket/load',
    async (_, thunkAPI) => {
        const state = thunkAPI.getState();
        console.log("state" + state)
        const axiosPromises = state.basket.basket.map(async (e) => {
            try {
                const response = await axios.get('http://localhost:8080/api/dishes/' + e.id );
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

export const selectTotalPrice = (state) => {
    if (state === undefined || state.basket === undefined || state.basket.basket === undefined || state.basket.basket.length === 0) {
        return 0;
    }
    console.log("dans select total price" + state.basket)
    state.basket.basket.forEach(item => {
        console.log("item" , item)
    })
    return state.basket.detailledBasket.reduce((total, item) => total + item.price*state.basket.basket.find((element) => element.id === item.id)?.quantity, 0);
}


// Action creators are generated for each case reducer function
export const { addDishesToBasket, removeDishesFromBasket, getBasketSize, load } = basketSlice.actions

export default basketSlice.reducer