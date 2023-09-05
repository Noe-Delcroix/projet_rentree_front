// SelectedDishesContext.js
import React, { createContext, useContext, useState } from 'react';

const ApplicationContext = createContext();

export const useApplicationContext = () => useContext(ApplicationContext);

export const ApplicationContextProvider = ({ children }) => {
    const [dishes, setDishes] = useState([]);
    const [numberOfDishes, setNumberOfDishes] = useState(0);
    const [token, setToken] = useState("")
    const removeDishes = (dishId, number=0) => {
        // Utilisez la méthode setSelectedDishes pour mettre à jour le state et supprimer l'élément avec l'ID spécifié et mettre à jour le nombre de plats

        setDishes((prevDishes) => {
            return prevDishes.map((dish) => {
                if (dish.id === dishId) {
                    // Si l'ID correspond, ajoutez la quantité à cet objet
                    if (number > 0) {
                        setNumberOfDishes(numberOfDishes - parseInt(number));
                        return {
                            ...dish,
                            quantity: dish.quantity - parseInt(number),
                        };
                    }else{
                        setNumberOfDishes(numberOfDishes - parseInt(dish.quantity));
                        return {
                            ...dish,
                            quantity: 0,
                        };
                    }
                }
                return dish; // Si l'ID ne correspond pas, retournez l'objet tel quel
            });
        });

    }


    const addDishes = (dishId, price, quantity) => {
        console.log(dishId);
        console.log(price);
        console.log(quantity);
        setDishes((prevDishes) => {
            return prevDishes.map((dish) => {
                if (dish.id === dishId) {
                    // Si l'ID correspond, ajoutez la quantité à cet objet
                    return {
                        ...dish,
                        quantity: dish.quantity + parseInt(quantity),
                    };
                }
                return dish; // Si l'ID ne correspond pas, retournez l'objet tel quel
            });
        });
        setNumberOfDishes(numberOfDishes + parseInt(quantity));
    }
    return (
        <ApplicationContext.Provider value={{ dishes, setDishes, numberOfDishes, addDishes, removeDishes, token, setToken }}>
            {children}
        </ApplicationContext.Provider>
    );
};
