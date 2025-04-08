import React,{useEffect,useContext} from 'react';
//INTERNAL IMPORT
import Style from './Input.module.css'
import { VotingDappContext } from '../../Context/VotingContext';
const  Input=({inputType,title,placeholder,handleClick})=> {
    return (
        <div className={Style.input}>
        <p>{title}</p>
        {inputType==="text"?(
            <div className={Style.input__box}>
         <input type='text' className={Style.input__box__form}
            placeholder={placeholder}
            onChange={(e)=>handleClick(e)}
         /> 
    </div>  
         ):("")}
        </div>
    );
}
 
export default Input;