'use client'
import React,{useEffect,useState,useContext, useCallback} from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Style from '../../Styles/allowedVoters.module.css'
import { useDropzone } from 'react-dropzone';
import {VotingDappContext} from '../../Context/VotingContext'
import images from '../../assets';
import Button from '../../Components/Button/Button';
import Input from '../../Components/Input/Input';

const CandidateRegistration=()=> {
    const {uploadIPFSCANDIDAtE,setCandidate,getAllCandidate,candidateArray}=useContext(VotingDappContext);
    const [fileUrl,setfileUrl]=useState(null);
    const [candidatForm,setCandidatForm]=useState({
      address:'',  
      age:'',
      name:''
    });
    const Router=useRouter();
    //-------VOTERS IMAGE DROP
    const onDrop=useCallback(async(acceptedFile)=>{
      console.log('acceptedFile',acceptedFile);
      if(!acceptedFile.length){ console.error("No file received in onDrop!");
        return;}
        const url=await uploadIPFSCANDIDAtE(acceptedFile[0]);
        if (!url) {
          console.log("Failed to upload file. URL is null or undefined.");
          return;
      }
        console.log('url',url);
        setFileUrl(url||'');
        console.log('fileurl(',fileUrl);
        
    }, []);

    const {getRootProps,getInputProps}=useDropzone({
        onDrop,
        accept:'image/*',
        maxSize:500000,
    });
    useEffect(()=>{
      getAllCandidate();
      console.log('allVocandidates',candidateArray)
    },[])
    return (
        <div className={Style.createVoter}>
        
            {fileUrl && (
                <div className={Style.voterInfo}>
                truuuuuuuuuuuue {console.log('fileurl',fileUrl)}
                <Image src={fileUrl||images.candidate5} width={10} height={10} alt="Voter Image"/>
                <div className={Style.voterInfo_paragraph}> 
                <p><span>name: {candidatForm.name} </span></p>
                <p><span>address: {candidatForm.address.slice(0,20)} </span></p>
                <p><span>age: {candidatForm.age} </span></p>

                 </div>
                 </div>
            )}
            {!fileUrl && (
             
                <div className={Style.sideInfo}>
                fallllssee {console.log('fileurl',fileUrl)}
                <div className={Style.sideInfo_box}>
                <h4>Create candidate for Voting </h4>
                <p>Blockchain voting organization
                 Provider ethereum nnn</p>
                 <p className={Style.sideInfo_para}>
                    Contract Candidate
                 </p>
                </div>
                <div className={Style.voter__container__box__div}>
                   {candidateArray.map((el,i)=>{
                        <div key={i+1} className={Style.card_box}> 
                        <div  className={Style.image}> 
                        <Image src='' alt='profile photo' />
                        </div>
                        
                        <div className={Style.card_info}> 
                        <p>Name</p>
                        <p> Address</p>
                        <p>Details</p>
                          </div>  
                          </div> 
                     })}
                </div>
                </div>
                
            )
            }
            <div className={Style.voter}>
            <div className={Style.voter_container}>
            <h1>Create New Candidate </h1> 
            <div className={Style.voter__container__box}>Create New Candidate </div>   
            <div className={Style.voter__container__box__div}>
            <div {...getRootProps()}> 
            <input type="text" placeholde='hhhhhhhhh' {...getInputProps()}/>
            <div className={Style.voter__container__box__div__info}>
            <p>Upload File:JPG,PNG,GIF,WEBM 10MB</p>
            <div className={Style.voter__container__box__div__image}> </div>
            <Image src={images.upload} 
            width={150} alt='File Upload' heigh={150} objectFit='contain'/>
             </div>
            </div>
             </div>
                </div>  
                <div className={Style.input__container}> rrrrr
                <Input  inputType='text' title="name" 
                placeholder="Votre name" 
                handleClick={(e)=>{
                  setCandidatForm({...candidatForm,name:e.target.value});
                  console.log('nameee',candidatForm);
                }
                }
                  />
                  <Input  inputType='text' title="Address" 
                placeholder="Votre Address" 
                handleClick={(e)=>{
                  setCandidatForm({...candidatForm,address:e.target.value});
                  console.log('addressss',candidatForm);
                 }
                }/>
                 
                  <Input  inputType='text' title="age" 
                placeholder="Votre age" 
                handleClick={(e)=>{
                setCandidatForm({...candidatForm,age:e.target.value});
                console.log('age',candidatForm);
                }}
                />
                  
                  <div className={Style.Button}>
                  <Button btnName='authorized candidate' 
                    handleClick={()=>{
                        setCandidate({candidatForm,fileUrl,Router});
                        console.log('candidatForm  heey',
                        candidatForm);
                      }
                    }
                
                  />  
                  </div>     
            </div>
        </div>
        <div className={Style.createVoter}>
        <div className={Style.createVoter__info}>
          <Image src={images.creator} alt='user Profile'/>
          <p>Notice For User </p>
          <p>Organizer<span>0x939939..</span> </p>
          <p>Only organizer of the voting contract can
          create for voting election</p>
        </div>
        </div>
        </div>
    );
}

export default CandidateRegistration;