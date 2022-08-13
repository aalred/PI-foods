import React, { useEffect } from 'react';

import mainImage from '../../image-resources/cooking.jpg'

import './styleDetail.css'

export default function BodyRecipe({recipe}) {
  recipe.image = recipe.image? recipe.image : mainImage;  

    useEffect(() =>{
      console.log(recipe)
        recipe && (document.getElementById('summary-detail').innerHTML= recipe.summary);
        recipe && (document.getElementById('instructions-detail').innerHTML= recipe.instructions);
    }, [recipe]);  

  return(
    <div>
      
      <div className='title-main'>
        <figure>
          <figcaption>
            <h1 className='name'> {recipe.title} </h1>
            <h2 className='score-num'>Health Score: {recipe.healthScore}</h2>
          </figcaption>
          <img className='recipe-image' src={recipe.image} alt="" />
        </figure>
      </div>

      <div className='info-diet-dish'>
      {  recipe.diets && recipe.diets.length !== 0 ?
        <div className='diet-types'>
          <h4>Diets that can be included:</h4>
          {  recipe.diets.map( (e, i)=>{
            return <li key={i}>{e}</li>
          })}
        </div> : 
        <h4 className='diet-types'>Diets not included</h4>}
      {recipe.dishTypes && recipe.dishTypes.length !== 0?
        <div className='dish-types'>
          <h4 >Dish Types:</h4>
        { recipe.dishTypes.map((e, i)=>{
            return <li key={i}>{e}</li>
        })}
        </div>:
        <h4 className='dish-types'>Dish Types not included</h4>}
      </div>

      <div className='summary-detail'>
        <h3>Summary:</h3>
        <p id='summary-detail'></p>
      </div>

      <div className='instructions-detail'>
        <h3>Instructions:</h3>
        <p id='instructions-detail'></p>
      </div>

    </div>
  )
};