import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { loadingTrue, navigateTrue, searchRecipe } from '../../redux/action';
  
export default function Input() {
    const [value, setValue] = useState(''),

    dispatch = useDispatch(),    

    handlerChange = (e) =>{
        setValue(e.target.value)
    },

    handlerClick = (e) =>{
        e.preventDefault();
        if (value.trim()) {
            dispatch(navigateTrue());
            dispatch(searchRecipe(value));
            dispatch(loadingTrue())
        }
    };
    return(
        <div>
        <div className='input'>
            <label id='text' htmlFor="search"> Looking for something special? </label>
            <div>
                <input id='search' type="search" placeholder='Find it here!' onChange={(e) => handlerChange(e)}/>
                <button id='btnsearch' onClick={(e) => handlerClick(e)}>Search</button>
             </div>
        </div>
        </div>
    );
};
