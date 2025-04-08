'use client'
import React,{useEffect,useState,useContext} from 'react';
require('dotenv').config();
import {ethers}from 'ethers';
import Web3Modal from 'web3modal';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { VotingContractAbi,VotingContractAddress } from './Consant';
require('dotenv').config();
export const VotingDappContext=React.createContext();
import { create} from 'ipfs-http-client'
export const VotingDappProvider=({children})=>{
const [currentAccount,setCurrentAccount]=useState('');
const [candidateLength,setCandidateLength]=useState('');
const pushCandidate= [];
const candidateIndex=[];
const  [candidateArray,setCandidateArray]=useState(pushCandidate)
//--------END OF CANDIDATE DATA
const [error,setError]=useState('')
const higeVote=[];
//---VOTER SECTION
const pushVoter=[];
const [voterArray,setVoterArray]=useState(pushVoter);
const [voterLength,setVoterLength]=useState('');
const [web3modal,setweb3modal]=useState(null)
const [voterAddress,setVoterAddress]=useState([])
 const fetchContract=(signserOrProvider)=>{
    const contract=new ethers.Contract(VotingContractAddress,
        VotingContractAbi,signserOrProvider
    );
    return contract;
}
// //INTERNAL IMPORT
// useEffect(()=>{
// if(typeof window!==undefined){
//   const web3modal=new Web3Modal();
//     setweb3modal(web3modal);
//        console.log('web3modal issss',web3modal);

// }

//},[])

const projectId = process.env.NEXT_PUBLIC_INFURA_PROJECT_ID;
const projectSecret = process.env.NEXT_PUBLIC_INFURA_PROJECT_SECRET;
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

console.log('client isss',client);
//UPLOAD IMAGE VOtER
const uploadIPFS=async (file)=>{
    try{
        console.log("uploading ipfs",file);
          const added=await client.add({content:file});
          console.log("added",added);
        if(added){
        console.log('added to ipfs',added||"heeey");
       
            if (!added || !added.path) {
                console.error('IPFS upload failed. No path returned.');
                return null;
            }
     const url = `https://infura-ipfs.io/ipfs/${added.path}`;
   
    console.log('url',url);
    return url;
        }else{ console.log('added not work')}
    return url;
    }catch(error){
        setError('error  ploading  file to ipfs')
    }
}
//UPLOAD IMAGE CANDIDAtE
const uploadIPFSCANDIDAtE=async (file)=>{
    try{
        console.log("uploading ipfs",file);
          const added=await client.add({content:file});
          console.log("added",added);
        if(added){
        console.log('added to ipfs',added||"heeey");
       
            if (!added || !added.path) {
                console.error('IPFS upload failed. No path returned.');
                return null;
            }
     const url = `https://infura-ipfs.io/ipfs/${added.path}`;
   
    console.log('url',url);
    return url;
        }else{ console.log('added not work')}
    return url;
    }catch(error){
        setError('error  ploading  file to ipfs')
    }
}
 const checkIfWalletConnect=async()=>{
    try{
        if(!window.ethereum)return setError('please install your wallet');
        const accounts=await window.ethereum.request({
            method:'eth_accounts',
        })
        if(accounts.length>0){setCurrentAccount(accounts[0]);} 
        else{ setError("'error while  checking your wallet connec")}
        }catch(error){
    console.log('error while  checking your wallet connection',error)}
}
//CONNECtT WALLETT
const connectWallet=async()=>{
    try{
        if(!window.ethereum)return setError('install metamask')
        const accounts=await window.ethereum.request({
        method:'eth_requestAccounts',
        })
        setCurrentAccount(accounts[0])
    }catch(error){
        console.log('error while connecting');
        setError('error while connecting');
    }
}


//-----------CREATE VoTER
   const createVoter=async ({formInput,fileUrl,router})=>{
    try{

    const   {name,address,position}=formInput; 
    fileUrl=fileUrl?fileUrl:"a";
    
    if(!name||!address||!position) return setError('missing data');
    const web3modal=new Web3Modal();
    console.log('web3modal issss',web3modal);
 const connection = await web3modal.connect();
 console.log('Connection is:', connection);
 console.log('ethers issss',ethers);
 const provider= new ethers.BrowserProvider(connection);
 console.log('provider is:', provider);

 const signer= await provider.getSigner();
 console.log('signer is:', signer);
 const signerAddress=await signer.address;
 console.log('signerAddress is:', signerAddress);
 const Network=(await provider.getNetwork()).name;
 console.log('Network is:', Network);
 const contract= fetchContract(signer);
 console.log('contract is:', contract);
 console.log('confileUrlfileUrlfileUrlfileUrltract is:', fileUrl);
  const data=JSON.stringify({name,address,position,Image:fileUrl});
 const added=await client.add(data)||'';
 const url = `https://infura-ipfs.io/ipfs/${added.path||""}`;
 const voter=await contract.VoteRight(address,name,fileUrl,url?url:'karim',);

await voter.wait();
console.log('voter',voter)
router.push('/voteList')

   }catch(error){
    console.log(error); 
    }
   }
   //get voters Lists
   const getAllVoters=async()=>{
    try{
 const web3modal=new Web3Modal();
 console.log('web3modal issss',web3modal);
 const connection = await web3modal.connect();
 console.log('Connection is:', connection);
 console.log('ethers issss',ethers);
 const provider= new ethers.BrowserProvider(connection);
 console.log('provider is:', provider);

 const signer= await provider.getSigner();
 console.log('signer is:', signer);
 const signerAddress=await signer.address;
 console.log('signerAddress is:', signerAddress);
 const Network=(await provider.getNetwork()).name;
 console.log('Network is:', Network);
 const contract= fetchContract(signer);
   //VOTERS LISTS
   
   const voterLists=await contract.geVotedVoterList();
   setVoterAddress(voterLists);
   const pushVoter=await Promise.all(
    voterAddress.map(async(el)=>{  
            return await contract.getVoterData(el);
       })
   )
   setVoterArray(pushVoter);
      //VOTER LENGTH
   const voterLength=await contract.getVoterLenght();
   setVoterLength(voterLength.toNumber());  
}catch(error){
    setError("something went wrong with your fetching data");
}
   }
    // useEffect(()=>{
    // getAllVoters();
    // },[])

   const giveVote=async(id)=>{
    try{

    }catch(error){
         console.log(error);
    }
   }
//--CANDIDATE SECTION
const setCandidate=async ({candidatForm,fileUrl,router})=>{
    try{

    const   {address,age,name}=candidatForm; 
    fileUrl=fileUrl?fileUrl:"a";
    
    if(!name||!address||!age) return setError('missing data');
    const web3modal=new Web3Modal();
    console.log('web3modal issss',web3modal);
 const connection = await web3modal.connect();
 console.log('Connection is:', connection);
 console.log('ethers issss',ethers);
 const provider= new ethers.BrowserProvider(connection);
 console.log('provider is:', provider);

 const signer= await provider.getSigner();
 console.log('signer is:', signer);
 const signerAddress=await signer.address;
 console.log('signerAddress is:', signerAddress);
 const Network=(await provider.getNetwork()).name;
 console.log('Network is:', Network);
 const contract= fetchContract(signer);
 console.log('contract is:', contract);
 console.log('confileUrlfileUrlfileUrlfileUrltract is:', fileUrl);
  const data=JSON.stringify({name,address,age,Image:fileUrl});
 const added=await client.add(data)||'';
 const ipfs = `https://infura-ipfs.io/ipfs/${added.path||""}`;
 const candidate=await contract.setCandidate(address,age,name,fileUrl,ipfs);
await candidate.wait();
console.log('candidate',candidate)
//router.push('/voteList')

   }catch(error){
    console.log(error); 
    }
   }
   //GET CANDIDATE DATA
   const getAllCandidate=async()=>{
    try{
    const web3modal=new Web3Modal();
    console.log('web3modal issss',web3modal);
 const connection = await web3modal.connect();
 const provider= new ethers.BrowserProvider(connection);
 const signer= await provider.getSigner();
 const signerAddress=await signer.address;
 const Network=(await provider.getNetwork()).name;
 const contract= fetchContract(signer);
 allCanidates=await contract.getCandidates();
   
    allCanidates.map(async(el)=>{
       const singleCandidateData= await contract.getCandidateData(el); 
    pushCandidate.push(singleCandidateData);
    candidateIndex.push(singleCandidateData[4].toNumber());
    }
     )
     setCandidateArray(pushCandidate);
   const  candidatesLength =await contract.getCandidateLength();                                                 
     setCandidateLength(candidateLength.toNumber());
setCandidateArray(pushCandidate);
}catch(error){
    console.log("error",error);
}
   }
   useEffect(()=>{
    getAllCandidate();
   },[])
return (
        <VotingDappContext.Provider 
        value={{
        checkIfWalletConnect,
        createVoter,
        fetchContract,
        connectWallet,
        getAllVoters,
        uploadIPFS,
        uploadIPFSCANDIDAtE,
        giveVote,
        setCandidate,
        getAllCandidate,
        error,voterArray,
        voterLength,
        voterAddress,
        candidateArray,
        currentAccount,
        candidateLength}}>

            {children}
        </VotingDappContext.Provider>
    )


}

