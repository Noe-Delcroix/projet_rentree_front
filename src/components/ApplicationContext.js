// SelectedDishesContext.js
import React, { createContext, useContext, useState } from 'react';

const ApplicationContext = createContext();

export const useApplicationContext = () => useContext(ApplicationContext);

export const ApplicationContextProvider = ({ children }) => {
    const [dishes, setDishes] = useState([]);
    const [numberOfDishes, setNumberOfDishes] = useState(0);
    const [token, setToken] = useState("")
    const [basket, setBasket] = useState([]);

    const removeDishesFromBasket = (dishId, number = 0) => {
        const existingDishIndex = basket.findIndex(item => item.id === dishId);
        console.log("dans removeDishesFromBasket" + basket)
        if (existingDishIndex !== -1) {
            const updatedBasket = [...basket];
            if (number === 0) {
                setNumberOfDishes(numberOfDishes - updatedBasket.find(e => e.id === dishId).quantity)
                updatedBasket.splice(existingDishIndex, 1); // Retirer le plat du panier
            } else {
                updatedBasket[existingDishIndex].quantity -= number; // Mettre à jour la quantité
                setNumberOfDishes(numberOfDishes - number)
                if (updatedBasket[existingDishIndex].quantity <= 0) {
                    setNumberOfDishes(numberOfDishes - updatedBasket[existingDishIndex].quantity)
                    updatedBasket.splice(existingDishIndex, 1); // Retirer le plat si la quantité devient nulle
                }
            }
            console.log("updated basket" + updatedBasket)
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
