import { createSlice } from '@reduxjs/toolkit'

export const basketSlice = createSlice({
    name: 'basket',
    initialState: {
        value: []
    },
    reducers: {
        addDishesToBasket: (state, action) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            const { dishId, quantity } = action.payload;

            const existingDishIndex = state.value.findIndex(item => item.id === dishId);

            if (existingDishIndex !== -1) {
                const updatedBasket = state.value;
                updatedBasket[existingDishIndex].quantity += quantity;
                state.value = updatedBasket;
            } else {
                const newBasketItem = { id: dishId, quantity: quantity };
                state.value = [...state.value, newBasketItem];
            }
            console.log(state.value)
        },
        removeDishesFromBasket: (state, action) => {
            const { dishId, quantity } = action.payload;
            const existingDishIndex = state.value.findIndex(item => item.id === dishId);

            if (existingDishIndex !== -1) {
                const updatedBasket = [...state.value];
                if (quantity === 0) {
                    //setNumberOfDishes(numberOfDishes - updatedBasket.find(e => e.id === dishId).quantity)
                    updatedBasket.splice(existingDishIndex, 1); // Retirer le plat du panier
                } else {
                    updatedBasket[existingDishIndex].quantity -= quantity; // Mettre à jour la quantité
                    // setNumberOfDishes(numberOfDishes - number)
                    if (updatedBasket[existingDishIndex].quantity <= 0) {
                        // setNumberOfDishes(numberOfDishes - updatedBasket[existingDishIndex].quantity)
                        updatedBasket.splice(existingDishIndex, 1); // Retirer le plat si la quantité devient nulle
                    }
                }
                console.log("updated basket" + updatedBasket)
                state.value = updatedBasket;
            }
        },

    }
})

// Action creators are generated for each case reducer function
export const { addDishesToBasket, removeDishesFromBasket } = basketSlice.actions

export default basketSlice.reducer