'use client'
import React,{useEffect,useContext} from 'react';
//INTERNAL IMPORT 
import Style from '../../Styles/voteList.module.css'
import { VotingDappContext,voterArray } from '../../Context/VotingContext';
import VoterCard from '../../Components/VoterCard/VoterCard';
const VoteList=() =>{
    const {getAllVoters,voterArray}=useContext(VotingDappContext)
   useEffect(()=>{
    getAllVoters()
   },[])
    return (
        <div>
        
       <VoterCard voterArray={voterArray}/>   
        </div>
    );
}

export default VoteList;