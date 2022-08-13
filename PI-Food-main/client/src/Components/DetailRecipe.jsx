import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getRecipeInfo } from '../redux/action';
import Input from './main-containers/Input';
import Loading from './detail-containers/Loading';
import BodyRecipe from './detail-containers/BodyRecipe';

export default function DetailRecipe(params) {
  
  const dispatch = useDispatch(),
  
  {id} =  useParams(params); 
  
  useEffect(() =>{
    dispatch(getRecipeInfo(id))
    // eslint-disable-next-line
  }, []);  
  
  const {recipe} = useSelector((state) =>{
    return{
      recipe: state.recipe
    }
  });
  
  return(
    <div >
      <Link to={'/main'}><button> Home </button></Link>
      <Input />
      <Link to={"/creatRecipe"}>Creat Recipe</Link>
      {recipe.id ? <BodyRecipe recipe={recipe} /> : <Loading />}
    </div> 
  )
};