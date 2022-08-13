import React from 'react';
import { Link } from 'react-router-dom'
import mainImage from '../image-resources/main-image.jpg'

export default function LandingPage() {
  const estiloDiv = {
		color: 'black',
    fontFamily: 'Lobster, cursive',
    },

    h1Style ={
      fontSize: '650%',
      position: 'relative',
      marginLeft: '33%',
      marginTop: '0%',
      paddingTop: '10%'
    },

    infoLink ={
      fontSize: '50px',
      display: 'flex',
      position: 'relative',
      fontFamily: 'Lobster, cursive',
      alignItems: 'center',
      flexDirection: 'column',
    },

    buttonLink ={
      width: '190px',
      height: '45px',
      color: 'white',
      backgroundColor: '#D63447',
      border: '#D63447',
    },

    imgStyle ={
      height: '100%',
      position: 'absolute',
      width: '100%',
    };

  return (
    <div style={estiloDiv}>
      <div>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Lobster&display=swap" rel="stylesheet" />
      </div>
      <img src={mainImage} alt="" style={imgStyle}/>
      <div>
        <h1 style={h1Style} >
          WiKi-tchen!
        </h1>
      </div>
      <div style={infoLink}> 
        <span>A recipe for every moment.</span>
        <Link to='/main'><button style={buttonLink} >Know More</button></Link>
      </div>
    </div>
  );
};
