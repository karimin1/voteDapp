import React,{useState,useContext} from 'react';
import  Image from 'next/image'
import Link from 'next/link';
import {AiFillLock,AiFillUnlock} from 'react-icons/ai';
//IMPORt intERNAL 
import { VotingDappContext } from '../../Context/VotingContext';
import Style from './NavBar.module.css'
import images from '../../assets'   
import { ST } from 'next/dist/shared/lib/utils';
const  NavBar=() =>{
    const {connectWallet,error,currentAccount}=useContext(VotingDappContext)
    const[openNav,setOpenNav]=useState(true);
    const openNavigation=()=>{
        if(openNav){
            setOpenNav(false);
        }else if (!openNav){setOpenNav(true)}
    }
    return (
        <div className={Style.NavBar}>
           {error===''? (''
           ):(
            <div className={Style.message__box}>
                <div className={Style.message}>
                <p>
                {error}
                </p>
                </div>
            </div>
           )
           } 
           <div className={Style.NavBar_box}> 
               <div className={Style.title}>
                    <Link href={{pathname:'/'}}>
                    <Image src={images.loading} alt="logo" width={80}
                        height={80}/>
                    </Link>
                </div>

                <div className={Style.connect}>
                {currentAccount ? (
                    <div>
                        <div className={Style.connect_flex}>
                            <button onClick={()=>openNavigation()}> 
                            {currentAccount.slice(0,10)}...
                            </button> 
                            {currentAccount &&(
                                <span>{openNav?(
                                    <AiFillUnlock onClick={()=>openNavigation()}/> 
                                ):(
                                    <AiFillLock onClick={()=>openNavigation()}/> 
                                )} </span> 
                            )}   
                        </div> 
                        {openNav && (
                            <div className={Style.openNavigation}>  
                            <p>
                        <Link href={{pathname:'/'}}>Home</Link>
                            </p>
                            <p>
                        <Link href={{pathname:'candidateRegistration'}}>candidate Registration</Link>
                            </p>
                            <p>
                        <Link href={{pathname:'allowedVoters'}}>allowed Voters</Link>
                            </p>
                            </div>
                        )}
                    </div>
                ):(
                    <button onClick={()=>connectWallet()}> 
                            connectWallet
                    </button> 
                )}
                </div>
            </div>
         </div>
    );
}

export default NavBar