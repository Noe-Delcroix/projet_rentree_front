import { configureStore } from '@reduxjs/toolkit'
import dishesReducer from './features/dishes/Dishes'
import basketReducer from './features/dishes/Basket'
import detailledBasketReducer from './features/dishes/DetailledBasket'
import dishReducer from './features/dishes/Dish'
import userReducer from './features/dishes/User'
import orderReducer from './features/dishes/Order'
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