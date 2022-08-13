import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchRecipe } from '../../redux/action';
  
export default function Input() {
    const [value, setValue] = useState(''),

    dispatch = useDispatch(),    

    handlerChange = (e) =>{
        setValue(e.target.value)
    },

    handlerClick = (e) =>{
        e.preventDefault();
        if (value.trim()) {
            dispatch(searchRecipe(value))
        }
    };

    return(
        <span>
            <div>
                <label htmlFor=""> Looking for something special? </label>
                <br />
                <input type="search" placeholder='Find it here!' onChange={(e) => handlerChange(e)}/>
                <button onKeyPress={(e) => console.log(e)} onClick={(e) => handlerClick(e)}>Search</button>
            </div>
        </span>
    );
};
