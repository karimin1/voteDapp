# Voting Dapp 
A decentralized voting platform built with Solidity, React, Next.js and Ethers.js. Users can connect their wallet, view candidates, and vote in real-time.

## Tech Stack
 **Solidity**: Smart contract for candidates & voters
 **Hardhat**: Local Ethereum development environment
 **Ethers.js**: Interact with smart contracts
 **React.js**: Frontend UI
**IPFS**: Stores candidate images and voter profiles (via `ipfs-http-client`)
 **Next.js**: Fullstack React framework

##  Features
-  Wallet connection (Metamask)
-  Add candidates with age, name, image (stored on IPFS)
-  Add voters with image and details
-  Vote for a candidate (only once per voter)
-  Live vote counts and candidate list
-  Countdown until voting ends
-  Admin panel for election control