import { configureStore } from '@reduxjs/toolkit'
import dishesReducer from './src/slices/Dishes'
import basketReducer from './src/slices/Basket'
import detailledBasketReducer from './src/slices/DetailledBasket'
import dishReducer from './src/slices/Dish'
import userReducer from './src/slices/User'
import orderReducer from './src/slices/Order'
export default configureStore({
    reducer: {
        dishes: dishesReducer,
        basket: basketReducer,
        detailledBasket: detailledBasketReducer,
        dish: dishReducer,
        user : userReducer,
        order: orderReducer,

    }
})