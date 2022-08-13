import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom'
               /*  {params.diets.map( (e, i)=>{
                    return <li key={i}>{e}</li>
                })} */
export default function RecipeCards(params) {
    useEffect(() =>{
        console.log(params)
    }, [params])
    return( 
        <div>
            <figure>
            <img src={params.image} alt="" />
            <figcaption>
                <Link to={`/detail/${params.id}`}>
                    <p>  {params.title}</p>
                </Link> 
                <p> {params.healthScore} </p>

            </figcaption>
            </figure>
        </div>
    );
};
