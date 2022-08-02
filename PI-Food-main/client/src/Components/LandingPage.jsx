import React from 'react';
import { Link } from 'react-router-dom'
import mainImage from '../image-resources/main-image.jpg'

export default function LandingPage() {
  return (
    <div>
      <h1>
        Wi-Kitchen!
      </h1>
      <img src={mainImage} alt=""/>
      <div> 
        <p>A recipe for every moment.</p>
        <button>Know More</button>
      </div>
    </div>
  );
};
