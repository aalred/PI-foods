import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

import { orderDiets } from './main-containers/functionsContainers';
import { getAllDiets, loadingFalse, resetAll, resetRecipeInfo, resetSearch } from '../redux/action';
import { getAllRecipes } from '../redux/action';

import Loading from './detail-containers/Loading';
import Input from './main-containers/Input';
import Filters from './main-containers/Filters';
import NotFound from './NotFound';

import './navbarStyle.css'

export default function MainPage() {
    const dispatch = useDispatch(),
    
    {diets} = useSelector((state) =>{
      return{
        diets: state.diets
      }
  }),
  
  {recipes} = useSelector((state) =>{
      return{
          recipes: state.recipes.all
      }
  });
    function handlerClick(){
        dispatch(resetSearch());
        if (error) {
            dispatch(resetAll())
        }
    }

    function handlerClickExit(){
        dispatch(resetAll())
    }
    
    useEffect(() => {
        if(!diets.length){
            dispatch(getAllDiets());                           
        }
        if (!recipes.api) {
            dispatch(getAllRecipes());
        }
        dispatch(resetRecipeInfo())
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
      

    const {search} = useSelector((state) =>{
        return{
            search: state.recipes.search
        }
    }),

    {error} = useSelector((state) =>{
        return{
            error: state.error
        }
    }), 

    {isLoading} = useSelector((state) =>{
        return{
            isLoading: state.isLoading
        }
    });

    useEffect(() => {
        if (search.api) {
            dispatch(loadingFalse())
        }
       orderDiets(recipes, search);
      }, [search, recipes]);
    
    return(
        <div>
        <div className='navbar'>
                <Input /> 
                <div className='btnsTop' >
                <Link to={"/creatRecipe"}> <button className='btnCreate' onClick={() => handlerClick()}>Creat Recipe</button></Link>
                <Link to={'/'}> <button className='btnHome' id='btnHome' onClick={() => handlerClickExit()}> Exit </button> </Link>
                </div>
        </div>
                { recipes.api ?  error === false && isLoading === false && <Filters diets={diets} recipes={recipes} search={search}/> : error === false && <Loading/>}
                {isLoading === true &&  <Loading/>}
                {error && <NotFound />}
        </div>
    );
}