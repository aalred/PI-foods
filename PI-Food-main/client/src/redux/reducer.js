import { GET_DIETS, 
  GET_RECIPES, 
  GET_RECIPE_NAME, 
  GET_RECIPE_INFO,
  RESET_SEARCH,
  ERROR,
  CHANGE_COMPONENT, 
  RESET,
  CHANGE_COMPONENT_TRUE,
  RESET_RECIPE_INFO,
  LOADING,
  LOADING_TRUE,
 } from './action';

const initialState = {
    recipes:{search: [], all:[]},
    recipe:[],
    diets:[],
    error: false,
    navigate: false,
    isLoading: false,
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
        recipes : {...state.recipes, search : []},
        isLoading: false
      };
    case RESET:
      return{
        ...state, 
        recipes:{...state.recipes, search : []},
        recipe:[],
        error: false
      }
    case RESET_RECIPE_INFO:
      return{
        ...state, 
        recipe:[],
      }
      case CHANGE_COMPONENT:
        return{
          ...state,
          navigate:false,
        }
      case CHANGE_COMPONENT_TRUE:
        return{
          ...state,
          navigate:true,
        }
      case LOADING:
        return{
          ...state,
          isLoading:false,
        }
      case LOADING_TRUE:
        return{
          ...state,
          isLoading:true,
        }
    default:
      return {...state};
  }
}

export default rootReducer;