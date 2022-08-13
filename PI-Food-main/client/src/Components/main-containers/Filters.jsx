import React, { useEffect, useState } from 'react';
import Buttons from './Buttons';
import { filterOrder } from './functionsContainers';

export default function Filters({diets, recipes, search}) {

  const [filters, setFilters] = useState({alphabet:'disabled',  healthSc:'disabled', dietsTypes:'all'}),

  [renderRec, setRenderRec] = useState([]),

  handleChangeFilters = (e) =>{
    e.target.id === 'alphabet' && setFilters({...filters, [e.target.id ]: e.target.value, healthSc:'disabled'})
    
    e.target.id === 'healthSc' && setFilters({...filters, [e.target.id ]: e.target.value, alphabet:'disabled'}) 

    e.target.id === 'dietsTypes' && setFilters({...filters, [e.target.id]: e.target.value})
  };   

  useEffect(()=>{
    setRenderRec(filterOrder(filters, recipes, search))
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters ,search, recipes])

  return(
    <div>
          <form onChange={(e) => handleChangeFilters(e)} >
            <label htmlFor=""> Diet Types </label>
        <select name="dietsTypes" id="dietsTypes" value={filters.dietsTypes} readOnly>
          <option  value='all'> All </option>
          {diets.map(e =>{
            return <option key={e.id} value={e.name}>{e.name}</option>
          })}
        </select>
          <label htmlFor=""> Alphabetical </label>
          <select value={filters.alphabet} name="alphabet" id="alphabet" readOnly>
            <option  value='disabled' > Select Order </option>
            <option  value='asc' > A - Z </option>
            <option  value='desc' > Z - A </option>
          </select>
          <label htmlFor=""> Health Score </label>
          <select  name="healthSc" id="healthSc" value={filters.healthSc} readOnly>
            <option value='disabled' > Select Order </option>
            <option  value='asc' > 0 - 100 </option>
            <option  value='desc' > 100 - 0 </option>
          </select>
        </form>
      <div>
          <Buttons renderRec={renderRec} filters={filters.dietsTypes}/>
      </div>
    </div>
  );
}