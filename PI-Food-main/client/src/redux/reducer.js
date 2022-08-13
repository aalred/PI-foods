import { GET_DIETS, GET_RECIPES, GET_RECIPE_NAME, GET_RECIPE_INFO } from './action';

const initialState = {
    recipes:{search: [], all:[]},
    recipe:[],
    diets:[],
    
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DIETS:
      return{
        ...state,
        diets: action.payload
      };
    case GET_RECIPE_NAME:
      return{
        ...state,
       recipes : {...state.recipes, search : action.payload}
      };
    case GET_RECIPES:
      return{
        ...state,
        recipes :{...state.recipes, all : action.payload}
      }; 
    case GET_RECIPE_INFO:
      return{
        ...state,
        recipe: action.payload
      }
    default:
      return {...state};
  }
}

export default rootReducer;