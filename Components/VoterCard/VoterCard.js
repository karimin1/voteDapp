import React from 'react';
import Image from 'next/image'
//INTERNAL IMPORT 
import Style from '../Card/Card.module.css'
import VoterCardStyle from './VoterCard.module.css'
import images from '../../assets'
const VoterCard=({voterArray}) =>{
voterArray=[45441,2,1,545454545454545454444444445545454545454545454,7,5,true,1,4,5]
    return (
        <div className={Style.card}>
            {voterArray.map((el,i)=>{
                <div className={Style.card_box}>
                <div className={Style.image}>
                <Image src={el[4]} alt='profile photo'/> 
                </div> 

                <div className={Style.card_info}> 
                <h2> 
                {el[1]} # {el[0]}
                </h2>
                <p> Address : {el[3]}... </p> 
                <p>details</p> 
                <p className={VoterCardStyle.vote_Status}>
                {el[6]}==true? "You already Voted" : "Not Voted yet"</p> 
                </div>   
                </div>    
            })}
        </div>
    );
}

export default VoterCard;