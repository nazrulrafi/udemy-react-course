import {useEffect, useState} from "react";
import MealItem from "./MealItem.jsx";
import useHttp from "../hooks/useHttp.js";
import Error from "./Error.jsx";
const requestConfig={}

export default function Meals(props) {
    const {
        data:loadedMeals,
        isLoading,
        error
    }=useHttp("http://localhost:3000/meals",requestConfig,[]);

    if (isLoading){
        return <p>Featching Meals....</p>
    }
    if (error){
        return <Error message={error} title="Failed to fetch meals"/>;
    }
    return (
        <ul id="meals">
            {loadedMeals.map((meal) => (
                <MealItem meal={meal} key={meal.id} />
            ))}
        </ul>
    )
}