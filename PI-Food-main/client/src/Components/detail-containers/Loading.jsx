import React from 'react';
import MainImage from '../../image-resources/cook.png'

export default function Loading() {
  const titleStyle ={
    fontFamily: 'Lobster, cursive',
    display: 'grid',
    justifyItems: 'stretch',
    justifyContent: 'center',
  },

  imgStyle ={
    width: '300px',
    height: '300px',
  };

  return(
    <div style={titleStyle} >
    <h1 >
     Loading...
    </h1>
    <img style={imgStyle} src={MainImage} alt="" />
    </div>
  )
};
