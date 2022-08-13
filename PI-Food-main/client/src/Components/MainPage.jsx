import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { getAllRecipes } from '../redux/action';
import { getAllDiets } from '../redux/action';
import * as Db from './main-containers/db-fake'     //COMENTAR
import { Link } from 'react-router-dom'
// import Loading from './detail-containers/Loading';
import Input from './main-containers/Input';
import Filters from './main-containers/Filters';

export default function MainPage() {
    const dispatch = useDispatch();
    const [recipe, setRecipes] = useState({})       // COMENTAR
    
    useEffect(() => {
        dispatch(getAllDiets());
        setRecipes(Db)                               //   COMENTAR
        // dispatch(getAllRecipes()) 
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

      
      const {diets} = useSelector((state) =>{
        return{
          diets: state.diets
        }
    }),
    
    /*     {recipes} = useSelector((state) =>{
            return{
                recipes: state.recipes.all
            }
        }), */

    {search} = useSelector((state) =>{
        return{
            search: state.recipes.search
        }
    });
    

    return(
        <div>
                <Input /> 
                <Link to={"/creatRecipe"}>Creat Recipe</Link>
                {/* {recipes.api ? <Filters diets={diets} recipes={recipes} search={search}/> : <Loading/>} */}
                <Filters diets={diets} recipes={recipe} search={search}/>
        </div>
    );
}