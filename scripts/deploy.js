const hre=require('hardhat') ;
async function Main(){
try{
const VotingContract=await hre.ethers.getContractFactory('VotingContract');
const votingContract=await VotingContract.deploy();
await votingContract.waitForDeployment()
console.log(`this is  the contract :  ${votingContract.target}`);
}catch(error){
    console.log('error',error);
} 
}
Main();