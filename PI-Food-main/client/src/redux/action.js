const axios = require('axios')

export const GET_DIETS = 'GET_DIETS',
GET_RECIPE_NAME = 'GET_RECIPE_NAME',
GET_RECIPE_INFO = 'GET_RECIPE_INFO',
GET_RECIPES = 'GET_RECIPES';

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
    })
}

export const createRecipe = ({title, healthScore, summary, instructions,  dietsTypes}) => {

    console.log(title,healthScore,summary,instructions,dietsTypes)

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

export const mixinDietRecipe =({dietsTypes})=>{
    ('http://localhost:3001/recipes/', {
        dietsTypes,
    })
      .then(function (response) {
        console.log(response);
    })
      .catch(function (error) {
        console.log(error);
    });
}