import React from 'react';
import { Link } from 'react-router-dom';
import mainImage from '../../image-resources/cooking.jpg';

import './style.css'
               
export default function RecipeCards({id, image, title, healthScore, diets}) {

    image = image ? image : mainImage

    return( 
        <div className='recipes'>
            <figure>
            <img src={image} alt="" width={'320'} height='210' />
            <figcaption>
                <Link className='title-text' to={`/detail/${id}`}>
                    <p className='title-text' >  {title}</p>
                </Link> 
                <p className='healthScore-info' > {healthScore} </p>
                {diets.length ? diets.map( (e, i)=>{
                    return <li key={i}>{e}</li>
                }):
                <span className='healthScore-info'>This recipe has no diets</span>
                }
            </figcaption>
            </figure>
        </div>
    );
};
