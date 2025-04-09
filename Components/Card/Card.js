import React from 'react';
import Image from 'next/image';
//INERNAL IMPOR
import Style from './Card.module.css'
import images from '../../assets'
const Card=({candidateArray,giveVote}) =>{
    console.log('candidateArray',candidateArray)
    return (
        <div className={Style.card}>
        {candidateArray.map((el,i)=>{
            <div key={i+1} className={Style.card_box} >
            <div className={Style.card_box} >
            <div className={Style.image} >
            <img src={el[1]} alt='profile'/>   
                </div>   
                <div className={Style.card_info}>
                <h2>
                    {el[1]}#{el[2]}
                </h2>
                <p>{el[0]} </p>
                <p>Address:{el[6]}...</p>
                <p className={Style.total}>Address:{el[6]}...</p>
                <p className={Style.total}>Total Vote</p>
                    </div>   
                    <div className={Style.card_vote}> 
                    <p> {el[1]} </p> 
                    </div> 
                    <div className={Style.card_button}> 
                    <button onClick={()=>giveVote({id:el[2].toNumber(),address:el[6]})}> Give Vote</button> 
                    </div> 

                </div>   
            </div>
        })}
            
        </div>
    );
}

export default Card;