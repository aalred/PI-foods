import React, { useEffect } from 'react';
import { useState } from 'react';

import { createNumBtn, switchBtns } from './functionsContainers';

import RecipeCards from './RecipeCards';
import NotFound from '../NotFound';

import './style.css'

export default function Buttons({renderRec, filters}) {
  const [buttons, setbuttons] = useState([]),
  [index, setIndex] = useState({slice:0, page: 1}),
  [array, setNewArray]= useState([]);
 
  useEffect(() => {
    const btns =  document.querySelectorAll('.nums'),
    btnsDirection = document.querySelectorAll('.direc');

    if (btnsDirection) {
      index.page === 1 ? btnsDirection[0].disabled = true :btnsDirection[0].disabled = false;
      index.page === btns.length ? btnsDirection[1].disabled = true :btnsDirection[1].disabled = false;
    }
    if (btns.length === 0) {
      btnsDirection[0].disabled = true;
      btnsDirection[1].disabled = true;
    }

    btns[0] && switchBtns(index.page);
    renderRec && typeof index.slice === 'number' && setNewArray(renderRec.slice(index.slice, index.slice + 9));
  }, [index, buttons, renderRec]);
  
  useEffect(() =>{
    renderRec && setbuttons(createNumBtn(renderRec));
  }, [renderRec]);

  useEffect(() =>{
    setIndex({slice:0, page: 1})
  }, [filters]);

  const handlerDireccion = (e) =>{
    if ( e.target.id === 'Next'){ 
      setIndex({slice: index.slice + 9, page: index.page + 1} );
    } else{
      setIndex({slice:index.slice - 9, page: index.page  - 1});
    }
  },
  
  handlerClick = (e) =>{
    const num = parseInt(e.target.id)
    num === 1 && setIndex({slice:0, page: 1});
    setIndex({slice:(num * 9 - 9), page: num})
    switchBtns(num)
  };

  return (
    <div>
       {renderRec && renderRec.length === 0 && <NotFound />}
      <div  >
      {array.map(e =>{
         return <RecipeCards 
          key={e.id}
          id={e.virtualID? e.virtualID : e.id}
          image={e.image}
          title={e.title}
          healthScore={e.healthScore}
          diets={e.diets}
        />
      })}
      </div>
      <br />

      <div className='btns-bottom'>
        {<button className='direc' id='Prev' onClick={(e) => handlerDireccion(e) } >Previous</button>}
        {buttons.map((e) => {
        return( 
          <button key={e} 
          className='nums'
          id={e} 
          onClick={(e) => handlerClick(e)} > 
            {e} 
          </button>
        )
        })}
        {<button className='direc' id='Next' onClick={(e) => handlerDireccion(e) }>Next</button>}
      </div>
      
    </div>
  );
};