const axios = require('axios')

export const GET_DIETS = 'GET_DIETS',
GET_RECIPE_NAME = 'GET_RECIPE_NAME',
GET_RECIPE_INFO = 'GET_RECIPE_INFO',
GET_RECIPES = 'GET_RECIPES',
RESET_SEARCH = 'RESET_SEARCH',
RESET_RECIPE_INFO = 'RESET_RECIPE_INFO',
CHANGE_COMPONENT = 'CHANGE_COMPONENT',
CHANGE_COMPONENT_TRUE = 'CHANGE_COMPONENT_TRUE',
ERROR =  'ERROR',
RESET = 'RESET',
LOADING= 'LOADING',
LOADING_TRUE= 'LOADING_TRUE';

export const getAllDiets = () => (dispatch) =>{
    return axios.get('http://localhost:3001/diets')
    .then(response => {
        dispatch({
            type: GET_DIETS,
            payload: response.data,
        })
    })
    .catch( err =>{
        console.log(err)
        dispatch({
            type: ERROR,
        })
    })
}

export const searchRecipe = (name) => (dispatch) => {
    return axios.get(`http://localhost:3001/recipes?name=${name}`)
    .then(response => {
        dispatch({
            type: GET_RECIPE_NAME,
            payload: response.data,
        })
    })
    .catch( err => {
        console.log(err)
        dispatch({
            type: ERROR,
        })
    })
}

export const getAllRecipes = () => (dispatch) =>{
    return axios.get(`http://localhost:3001/recipes`)
    .then(response => {
        dispatch({
            type: GET_RECIPES,
            payload: response.data,
        })
    })
    .catch( err => {
        console.log(err)
        dispatch({
            type: ERROR,
        })
    })
}

export const getRecipeInfo = (id) => (dispatch) =>{
    return axios.get(`http://localhost:3001/recipes/${id}`)
    .then(response =>{
        dispatch({
            type: GET_RECIPE_INFO,
            payload: response.data,
        })
    })
    .catch(err =>{
        console.log(err)
        dispatch({
            type: ERROR,
        })
    })
}

export const createRecipe = ({title, healthScore, summary, instructions,  dietsTypes}) => {

    return axios.post('http://localhost:3001/recipes', {
        title,
        healthScore,
        summary,
        instructions, 
        dietsTypes,
    })
      .then(function (response) {
        console.log(response);
    })
      .catch(function (error) {
        console.log(error);
    });
}

export const notNavigate = () =>{
    return{
        type:CHANGE_COMPONENT,
    }
}

export const navigateTrue = () =>{
    return{
        type:CHANGE_COMPONENT_TRUE,
    }
}

export const resetSearch = () => {
    return {
        type: RESET_SEARCH,
    }
}

export const resetAll = () =>{
    return{
        type:RESET
    }
}

export const resetRecipeInfo = () =>{
    return{
        type:RESET_RECIPE_INFO
    }
}

export const loadingFalse = () =>{
    return{
        type:LOADING
    }
}
export const loadingTrue = () =>{
    return{
        type:LOADING_TRUE
    }
}