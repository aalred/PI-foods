import React from 'react';
import { useSelector } from 'react-redux';

export default function NotFound() {

    const {error} = useSelector(state =>{
        return{
           error: state.error
        }
    }),

    handlerSubmit =() =>{
        return
    }

    const titleStyle ={
        fontFamily: 'Lobster, cursive',
        display: 'grid',
        justifyContent: 'center',
        fontSize: '50px',
        alignItems: 'center',
      },
      
      buttonHome ={
        width: '190px',
        height: '45px',
        color: 'white',
        backgroundColor: '#D63447',
        border: '#D63447',
        justifyContent: 'center',
      }

    return(
    <div style={titleStyle}>
            <span >Page not Found</span>
            {error && <form onSubmit={() => handlerSubmit()}><button style={buttonHome} type='submit'>Home</button></form>}
    </div>
    )
};
