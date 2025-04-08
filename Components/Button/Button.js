import React from 'react';
import Style from './Button.module.css'
const Button=({btnName,handleClick}) =>{
    return (
        <div >
            <button  className={Style.Button}
            onClick={()=>handleClick()}>{btnName} </button>
        </div>
    );
}

export default Button;