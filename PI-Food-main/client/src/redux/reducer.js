import { GET_DIETS, 
  GET_RECIPES, 
  GET_RECIPE_NAME, 
  GET_RECIPE_INFO,
  RESET_SEARCH,
  ERROR,
  CHANGE_COMPONENT, 
  RESET,
 } from './action';

const initialState = {
    recipes:{search: [], all:[]},
    recipe:[],
    diets:[],
    error: false,
    navigate: false
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
       recipes : {...state.recipes, search : action.payload},
       navigate: true
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
      };
    case ERROR:
      return{
        ...state,
        error: true
      };
    case RESET_SEARCH:
      return{
        ...state,
        recipes : {...state.recipes, search : []}
      };
      case RESET:
        return{
          ...state, 
          recipes:{...state.recipes, search : []},
          recipe:[],
          error: false
        }
        case CHANGE_COMPONENT:
          return{
            ...state,
            navigate:false,
          }
    default:
      return {...state};
  }
}

export default rootReducer;