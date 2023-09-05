// SelectedDishesContext.js
import React, { createContext, useContext, useState } from 'react';

const SelectedDishesContext = createContext();

export const useSelectedDishes = () => useContext(SelectedDishesContext);

export const SelectedDishesProvider = ({ children }) => {
    const [dishes, setDishes] = useState([]);
    const [numberOfDishes, setNumberOfDishes] = useState(0);
    const removeDishes = (dishId) => {
        // Utilisez la méthode setSelectedDishes pour mettre à jour le state et supprimer l'élément avec l'ID spécifié et mettre à jour le nombre de plats

        setDishes((prevDishes) => {
            return prevDishes.map((dish) => {
                if (dish.id === dishId) {
                    // Si l'ID correspond, ajoutez la quantité à cet objet
                    setNumberOfDishes(numberOfDishes - parseInt(dish.quantity));

                    return {
                        ...dish,
                        quantity: 0,
                    };
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
        <SelectedDishesContext.Provider value={{ dishes, setDishes, numberOfDishes, addDishes, removeDishes }}>
            {children}
        </SelectedDishesContext.Provider>
    );
};
