'use client'
import Image from "next/image";
import React,{useEffect,useContext} from "react";
import { VotingDappContext } from "../Context/VotingContext";
import AllowedVoters from "./allowedVoters/page"; 
import Style from '../Styles/index.module.css';
import Card from "../Components/Card/Card";
import Countdown from "react-countdown";
export default function Home() {
 const {
     checkIfWalletConnect,
    connectWallet,
    getAllVoters,

    giveVote,
    setCandidate,
    getAllCandidate,
    error,voterArray,
    voterLength,
    voterAddress,
    candidateArray,
    currentAccount}=useContext(VotingDappContext);
  const candidateArray4=[
  [1,2,131215,4545,5,1,5111111111111111111111111111111111111111111111111111222222222222222222222222222222222,3,3,48],
  [1,2,131215,4545,5,1,5111111111111111111111111111111111111111111111111111222222222222222222222222222222222,3,3,48],
  [1,2,131215,4545,5,1,5111111111111111111111111111111111111111111111111111222222222222222222222222222222222,3,3,48],
]
  // const {
  //   checkIfWalletConnect,
  //  }=useContext(VotingDappContext);  
  useEffect(()=>{
      checkIfWalletConnect();
      getAllVoters();
    },[])
  return (
    <div className={Style.home}>
    {currentAccount && (
      <div className={Style.winner}>
      <div className={Style.winner_info}>
      <div className={Style.candidate_list}>
      <p>
      No Candidate:  <span>6 </span>
       </p>
      </div>
      <div className={Style.candidate_list}> 
      <p>No voter:<span>{voterLength||10}</span>
       </p>
       </div>
      </div>

      <div className={Style.winner_message}>
      <small>
      <Countdown date={Date.now()+100000}/>
        </small>
      </div>
      </div>
    )}

      <Card candidateArray={candidateArray4}
      giveVote={giveVote}/>
    </div>
  );
}
