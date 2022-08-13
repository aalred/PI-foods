import React, { useEffect } from 'react';


export default function BodyRecipe({recipe}) {
    
    useEffect(() =>{
        console.log(recipe)
        recipe && (document.getElementById('summary').innerHTML= recipe.summary);
        recipe && (document.getElementById('instructions').innerHTML= recipe.instructions);
    }, [recipe]);  

    return(
        <div>
            <div>
          <div>
        <figure>
          <figcaption>
            <h1> {recipe.name} </h1>
            <h2>Health Score: {recipe.healthScore}</h2>
          </figcaption>
          <img src={recipe.image} alt="" />
        </figure>
      </div>
      <div>
        <p id='summary'></p>
        {
          recipe.diets.length !== 0 ?
          <div>
            <h4>Diets that can be included:</h4>
            {
              recipe.diets.map( (e, i)=>{
              return <li key={i}>{e}</li>
              })
            }
          </div> : 
          <h4>Diets not included</h4> 
        }
        {
          recipe.dishTypes.length !== 0?
            <div>
              <h4>Dish Types:</h4>
            {
              recipe.dishTypes.map((e, i)=>{
                return <li key={i}>{e}</li>
              })
            }
          </div>:
          <h4>Dish Types not included</h4> 
        }
      </div>
      <div>
        <h3>Instructions:</h3>
        <p id='instructions'></p>
      </div>  
        </div>
        </div>
    )
};
