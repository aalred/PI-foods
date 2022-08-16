import './create-containers/style.css'

import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import { arrayBackground, arrayDiets } from './main-containers/functionsContainers';
import { getAllDiets, getAllRecipes } from '../redux/action';
import { createRecipe } from '../redux/action';

import Input from './main-containers/Input';

import './navbarStyle.css'

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
    message: false,
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

  {navigate} = useSelector((state) =>{
    return{
      navigate: state.navigate
    }
  }),

  handleSubmit = (e) =>{
    e.preventDefault();
    dispatch(getAllRecipes())
    createRecipe(creation);
    setCreation({
      title:'', 
      healthScore:0,
      summary:'',
      instructions:'',
      dietsTypes:[],
    });
    setCheck((i)=>({...i, radio:true, message:true}));
    arrayBackground();
    setChangeSelect([]);
  },

  eventHandler =(e) =>{
    if (e.target.id === 'title') {
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
    setCheck((i)=>({...i, message:false}));
    setCreation((i) =>({...i, [e.target.id]: e.target.value}))
  },

  eventHandlerCheck =() =>{
    setCheck((i)=>({...i, radio: true, message:false}))
    setChangeSelect([])
    arrayBackground()
  }, 

  eventHandlerDiets =(e) =>{
    const diets = arrayDiets(e.target.value, changeSelect)
    diets ? setChangeSelect(diets):
    setChangeSelect([...changeSelect, e.target.value]);
    arrayBackground(e.target.value, changeSelect)
    setCheck((i)=>({...i,message:false}))
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

  function handlerDispatch(){

  }

  return(
    <div className='containerCreate'>
      {navigate && <Navigate to="/main" replace={true} />}
      <div className='navbar'>
      <Input />
        <div className='btnsTop'>
          <Link to={'/main'} onClick ={() => handlerDispatch()} ><button className='btnHome' id='btnHome' > Home </button></Link>
        </div>
      </div>
      <h2 className='title'>Create You're Recipe!...</h2>
      <form className='form' id='form' onSubmit={(e) => handleSubmit(e)} method='post'>
        <div className='name'>
          <label htmlFor="" >Recipe Name*: </label>
          <input placeholder='Not special characters: ?@#%'
            value={creation.title}
            className={`${check.stateIn}`} id="title" 
            onChange={(e) => eventHandler(e)}/>
          {check.stateIn === 'error' && <span className='error'>{ 'Try not to enter special characters, like: "$%&()/"... etc.'}</span>}
        </div>
        <div className='healthScore'>
          <label htmlFor="">Health Score: </label>
          <input type='number' placeholder='Rate your recipe'
            value={creation.healthScore}
            min="0" max="100" className={`${check.stateRd}`}
            id="healthScore" 
            onChange={(e) => eventHandler(e)}/>
        <br />
        {check.stateRd === 'error' && <span className='error'>{'Limit: 0 - 100'} </span> }
        </div>
        <div className='summary'>
          <label htmlFor="summary">Summary: </label>
          <textarea id="summary" cols="30" rows="10"
            value={creation.summary}
            className="description"
            placeholder='Enter a description'
            onChange={(e) => eventHandler(e)}/>      
        </div>
        <div className='steps'>
          <label htmlFor="instructions">Steps*: </label>
          <textarea id="instructions" cols="30" rows="10"
              className="description"
              placeholder='How do you prepare it?'             
              value={creation.instructions}
              onChange={(e) => eventHandler(e)} />
        <br />
        </div>
        <div className='dietTypes'>
        <label htmlFor="">Diet Types: </label>
          <select value={[]} multiple id="diets-create" onChange={(e) => eventHandlerDiets(e)}>
            {diets.map(e =>{
              return (
                <option id={e.id} className='diets-create' key={e.id} value={e.id}>{e.name}</option>
              )
            })}
          </select>
          <div className='radio-form'>
          <input checked={check.radio} type="radio" id='radio' onChange={(e) => eventHandlerCheck(e)}/>
          <label htmlFor="" >None</label>
          </div>
          <button type='submit' disabled={check.btn} id='btnsubmit'>Create</button>
        </div>
      </form>
        <div className='foot'>
            {check.message && <span className='succes'>Recipe created successfully </span>}
            <span className='note'>* Required fields</span>
        </div>
    </div>
  );
};