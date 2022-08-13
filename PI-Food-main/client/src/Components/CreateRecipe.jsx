import './create-containers/style.css'

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import { arrayBackground, arrayDiets } from './main-containers/functionsContainers';
import { getAllDiets } from '../redux/action';
import { createRecipe } from '../redux/action';

import Input from './main-containers/Input';

export default function CreateRecipe() {
  const dispatch = useDispatch(),

  [creation, setCreation] = useState({
    title:'', 
    healthScore:0,
    summary:'',
    instructions:'',
    dietsTypes:[],
  }),

  [changeSelect, setChangeSelect] = useState([]),

  [check, setCheck] = useState({
    radio: true, 
    stateIn: 'normal',  
    stateRd:'normal',
    select: 'diets',
    btn: true,
  }),

  {diets} = useSelector((state) =>{
    return{
      diets: state.diets
    }
  }),

  handleSubmit = (e) =>{
    e.preventDefault()
    createRecipe(creation)
  },

  eventHandler =(e) =>{
    if (e.target.id === 'name') {
      if (e.target.value.length > 0) {
        e.target.value.match(/[\w\s]+/g) === null ||
        e.target.value.match(/[\w\s]+/g).join() !== e.target.value  ? 
        setCheck((i)=>({...i, stateIn:'error'})):
        setCheck((i)=>({...i, stateIn:'normal'}));
      }
      e.target.value.length === 0 && setCheck((i)=>({...i, stateIn:'normal'}));
    }else if (e.target.id === 'healthScore') {
      if (parseInt(e.target.value) > 100 || parseInt(e.target.value) < 0 ) {
        setCheck((i)=>({...i, stateRd:'error'})) 
      }else{
        setCheck((i)=>({...i, stateRd:'normal'}))
      }
    }
    setCreation((i) =>({...i, [e.target.id]: e.target.value}))
  },

  eventHandlerCheck =(e) =>{
    setCheck((i)=>({...i, radio: true}))
    setChangeSelect([])
    arrayBackground()
  }, 

  eventHandlerDiets =(e) =>{
    const diets = arrayDiets(e.target.value, changeSelect)
    diets ? setChangeSelect(diets):
    setChangeSelect([...changeSelect, e.target.value]);
    arrayBackground(e.target.value, changeSelect)
  };

  useEffect(()=>{
    diets.length === 0 && dispatch(getAllDiets())
    if (changeSelect.length) {
      setCheck((i)=>({...i, radio:false}));
    }
    setCreation((i) =>({...i, dietsTypes: changeSelect}));
  },[diets, changeSelect]);

  useEffect(() =>{
    creation.title && creation.instructions && 
    check.stateIn !== 'error' && check.stateRd !== 'error' ? 
    setCheck((i)=>({...i, btn: false})):
    setCheck((i)=>({...i, btn: true}));
  }, [creation])

  return(
    <div>
      <div>
      <Input />
      <Link to={'/main'}><button> Home </button></Link>
      </div>
      <h2>Create You're Recipe!...</h2>
      <form onSubmit={(e) => handleSubmit(e)} method='post'>
        <div>
          <label htmlFor="" >Recipe Name*: </label>
          <input placeholder='Not special characters: ?@#%'
            className={`${check.stateIn}`} id="title" 
            onChange={(e) => eventHandler(e)}/>
          <br />
          {check.stateIn === 'error' && <span>{ 'Try not to enter special characters, like: "$%&()/"... etc.'}</span>}
        </div>
        <div>
          <label htmlFor="">Health Score: </label>
          <input type='number' placeholder='Rate your recipe'
            min="0" max="100" className={`${check.stateRd}`}
            id="healthScore" 
            onChange={(e) => eventHandler(e)}/>
        <br />
        {check.stateRd === 'error' && <span>{'Limit: 0 - 100'} </span> }
        </div>
        <div>
          <label htmlFor="summary">Summary: </label>
          <input placeholder='Enter a description' 
            className="description" id="summary" 
            onChange={(e) => eventHandler(e)}/>
        </div>
        <div>
          <label htmlFor="instructions">Steps*: </label>
          <input placeholder='How do you prepare it?' 
            className="description" id="instructions" 
            onChange={(e) => eventHandler(e)}/>
        <br />
        </div>
        <div>
        <label htmlFor="">Diet Types: </label>
        <br />
          <select multiple name="" id="diets-create" onChange={(e) => eventHandlerDiets(e)}>
            <option value="disabled" disabled>Select Option</option>
            {diets.map(e =>{
              return (
                <option id={e.id} className='diets-create' key={e.id} value={e.id}>{e.name}</option>
              )
            })}
          </select>
          <br />
          <input checked={check.radio} type="radio" id='radio' onChange={(e) => eventHandlerCheck(e)}/>
          <label htmlFor="" >None</label>
        </div>
        <button type='submit' disabled={check.btn}>Create</button>
      </form>
        <div>
            <p>* Required fields</p>
        </div>
    </div>
  );
};