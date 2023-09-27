import React, { createContext, useContext, useState } from 'react';

const ApplicationContext = createContext();

export const useApplicationContext = () => useContext(ApplicationContext);

export const ApplicationContextProvider = ({ children }) => {
    const [dishes, setDishes] = useState([]);
    const [numberOfDishes, setNumberOfDishes] = useState(0);
    const [token, setToken] = useState("")
    const [basket, setBasket] = useState([{id:10,quantity: 2},{id:5,quantity: 5},{id:4,quantity: 1},{id:1,quantity: 2},{id:8,quantity: 10}]);

    const removeDishesFromBasket = (dishId, number = 0) => {
        const existingDishIndex = basket.findIndex(item => item.id === dishId);
        if (existingDishIndex !== -1) {
            const updatedBasket = [...basket];
            if (number === 0) {
                setNumberOfDishes(numberOfDishes - updatedBasket.find(e => e.id === dishId).quantity)
                updatedBasket.splice(existingDishIndex, 1);
            } else {
                updatedBasket[existingDishIndex].quantity -= number;
                setNumberOfDishes(numberOfDishes - number)
                if (updatedBasket[existingDishIndex].quantity <= 0) {
                    setNumberOfDishes(numberOfDishes - updatedBasket[existingDishIndex].quantity)
                    updatedBasket.splice(existingDishIndex, 1);
                }
            }
            setBasket(updatedBasket);
        }
    };

    const addDishesToBasket = (dishId, quantity) => {
        const existingDishIndex = basket.findIndex(item => item.id === dishId);

        if (existingDishIndex !== -1) {
            const updatedBasket = [...basket];
            updatedBasket[existingDishIndex].quantity += quantity;
            setBasket(updatedBasket);
        } else {
            const newBasketItem = { id: dishId, quantity: quantity };
            setBasket([...basket, newBasketItem]);
        }
        setNumberOfDishes(numberOfDishes + quantity)
    };
    return (
        <ApplicationContext.Provider value={{ dishes, setDishes, numberOfDishes, addDishesToBasket, removeDishesFromBasket, token, setToken, basket }}>
            {children}
        </ApplicationContext.Provider>
    );
};
