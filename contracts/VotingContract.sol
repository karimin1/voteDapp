//SPDX-License-Identifier:UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";
contract VotingContract{
using Counters for Counters.Counter;
Counters.Counter public _voterId;
Counters.Counter public _candidateId;
address public  votingOrganizer;
//CANDIDATE DATA
struct Candidate{
    uint256 candidateId;
    string age;
    string name;
    string image;
    uint256 voteCount;
    address _address;
    string ipfs;
}
event CandidateCreate ( 
   uint256 indexed candidateId,
    string age,
    string name,
    string image,
    uint256 voteCount,
    address _address,
    string ipfs);

address [] public candidateAddress;
mapping( address=>Candidate)public candidates;
//END OF CANDIDATE DATA
//VOTER DATA
address [] public votedVoters;
address [] public votedAddress;
mapping (address=>Voter) public voters;
struct Voter{
    uint256  voter_voterId;
    string voter_name;
    string voter_image;
    address voter_address;
    uint256 voter_allowed;
    bool voter_voted;
    uint256 voter_vote;
    string voter_ipfs;
}
event VoterCreated(
 uint256 indexed voter_voterId,
    string voter_name,
    string voter_image,
    address voter_address,
    uint256 voter_allowed,
    bool voter_voted,
    uint256 voter_vote,
    string voter_ipfs
);
//END OF  VOTER
constructor(){
      votingOrganizer=msg.sender;

}
function setCandidate(address _address,string memory _age,
string memory _name,string memory _image,string memory _ipfs)public{
require(msg.sender==votingOrganizer,'not alloawed you re  not  votingOrganizer');
Candidate storage candidate=candidates[_address];
_candidateId.increment();
uint256 number=_candidateId.current();
candidate.candidateId=number;
candidate._address=_address;
candidate.age=_age;
candidate.name=_name;
candidate.voteCount=0;
candidate.image=_image;
candidate.ipfs=_ipfs;

emit CandidateCreate(number,_age,_name,_image,0,_address,_ipfs);
 candidateAddress.push(_address);
}
function getCandidates()public view  returns(address [] memory ){
return candidateAddress;
}
function getCandidateLength()public view returns (uint256){
    return candidateAddress.length;
}
function getCandidateData(address _address)public view returns( 
    uint256 ,
    string memory ,
    string  memory,
    string  memory,
    uint256 ,
    address ,
    string memory){
    Candidate storage candidate= candidates[_address];
    return(
candidate.candidateId,
candidate.age,
candidate.name,
candidate.image,
candidate.voteCount,
candidate._address,
candidate.ipfs

    );
}
//VOTER SECTION
function VoteRight(
    address _address,string memory _name,
    string memory _image, string memory _ipfs
     )public{
     require(msg.sender==votingOrganizer,'you ara not alooawed to');
_voterId.increment();
uint256 numberVote=_voterId.current();
Voter storage voter=voters[_address];
require(voter.voter_allowed==0,'having no right to  vote');
voter.voter_allowed=1;
voter.voter_name=_name;
voter.voter_ipfs=_ipfs;
voter.voter_address=_address;
voter.voter_voterId=numberVote;
voter.voter_vote=1000;
voter.voter_voted=false;
votedAddress.push(_address);
emit VoterCreated( 
    numberVote,
    _name,
    _image,
    _address,
    1,
    false,
        1000,
    _ipfs);
}

//END OF  VOTER

function vote( address _candidateAddress,
uint256 _candidateVoteId)external{
Voter storage voter=voters[msg.sender];
require(voter.voter_allowed!=0,'no alloawed to vot');
require(!voter.voter_voted,'you have already');
voter.voter_voted=true;
voter.voter_vote=_candidateVoteId;
votedVoters.push(msg.sender);
candidates[_candidateAddress].voteCount+=voter.voter_allowed;
}
function getVoterLenght() public view returns(uint256){
    return( votedAddress.length);
}
function getVoterData(address _voter)public view  returns(
    uint256,
    string memory,
    string memory,
    address ,
    bool,
    uint256,

    string memory
){
return( 
voters[_voter].voter_voterId,
voters[_voter].voter_name,
voters[_voter].voter_image,
voters[_voter].voter_address,
voters[_voter].voter_voted,
voters[_voter].voter_vote,
voters[_voter].voter_ipfs
);
}
function geVotedVoterList()public view returns(address[] memory){
return votedVoters;
}
function geVoterList()public view returns(address [] memory){
    return votedAddress;
}
}