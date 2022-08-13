import React from 'react';
import { Link } from 'react-router-dom'
import mainImage from '../image-resources/main-image.jpg'

export default function LandingPage() {

  return (
    <div>
      <h1>
        WiKi-tchen!
      </h1>
      <img src={mainImage} alt=""/>
      <div> 
        <p>A recipe for every moment.</p>
        <Link to='/main'><button>Know More</button></Link>
      </div>

    </div>
  );
};
