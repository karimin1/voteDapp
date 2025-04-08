'use client'
import React,{useEffect,useContext} from "react";
 import { VotingDappProvider } from "../Context/VotingContext";
 import  "../Styles/globals.css";
import NavBar from "../Components/NavBar/NavBar";
const RootLayout=({ children })=> {
  return (
    <html lang="en">
      <body >
       <VotingDappProvider > 
       <NavBar />
        {children}
         </VotingDappProvider> 
      </body>
    </html>
  );
}
export default RootLayout;