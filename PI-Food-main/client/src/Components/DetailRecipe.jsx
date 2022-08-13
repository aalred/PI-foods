import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, Navigate } from 'react-router-dom';

import { getRecipeInfo, notNavigate } from '../redux/action';

import Input from './main-containers/Input';
import Loading from './detail-containers/Loading';
import BodyRecipe from './detail-containers/BodyRecipe';

import './navbarStyle.css'
import { orderDietRecipe } from './main-containers/functionsContainers';
import { useState } from 'react';

export default function DetailRecipe(params) {
  const [recipeDetail, setRecipeDetail] = useState({}); 
  
  const {recipe} = useSelector((state) =>{
    return{
        recipe: state.recipe
    }
  }),
  
  dispatch = useDispatch(),
  
  {id} =  useParams(params); 
  
  useEffect(() =>{
    dispatch(getRecipeInfo(id))
    // eslint-disable-next-line
  }, []);

  const {navigate} = useSelector((state) =>{
    return{
      navigate: state.navigate
    }
  }),
  
  {error} = useSelector((state) =>{
    return{
      error: state.error
    }
  });

  useEffect(() =>{
    return () => dispatch(notNavigate())
  }, []);

  
  useEffect(() =>{
    if (/b/i.test(id)) {
      setRecipeDetail((i) => ({...i, diets : orderDietRecipe(recipe)}))
    }
    setRecipeDetail(recipe)
  }, [recipe]);
  
  useEffect(() =>{
    console.log(recipeDetail)
  }, []);

  return(
    <div >
      {navigate && <Navigate to={'/main'}/>}
      {error && <Navigate to={'/main'}/>}
      <div className='navbar'>
        <Input />
        <div className='btnsTop' >
          <Link to={"/creatRecipe"}> <button className='btnCreate' >Creat Recipe</button></Link>
          <Link to={'/main'}><button className='btnHome'> Home </button></Link>
        </div>
      </div>
      {recipe.id ? <BodyRecipe  className='cards-recipes' recipe={recipeDetail} /> : <Loading />}
    </div> 
  ) 
};