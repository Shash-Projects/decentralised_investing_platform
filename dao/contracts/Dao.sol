// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

contract Dao{
    address public owner;
    uint256 public noOfExperts;
    uint256 public minStake;
    uint256 public minAcceptanceToPassProposal;

    address[] public panelOfExperts;
    mapping(address => uint256) public stakes;

    // Event Declarations
    event expertAddedToPanel(uint, address);
    event expertAlreadyInPanel(uint, address);
    event expertPanelFull();
    event proposalCreated(uint);
    event votedSuccessfully(bool, address);
    event proposalExpired(uint);

    constructor(uint256 _noOfExperts, uint256 _minAcceptanceToPassProposal, uint256 _stakeAmount){

        owner = msg.sender;
        panelOfExperts.push(owner);
        noOfExperts = _noOfExperts;
        minAcceptanceToPassProposal = _minAcceptanceToPassProposal;
        minStake = _stakeAmount;

    }

    struct Proposal{
        address target;
        uint256 yesCount;
        uint256 noCount;
        uint256 amountToInvest;
        uint256 marginForStakers;
        uint256 marginForPublic;
        uint256 expiry;
        bool executed;
        bytes data;
        // mapping(address => bool) hasVoted;  not use mapping inside structs
        

    }

    // modifiers
    modifier onlyOwner{
        require(msg.sender == owner, "Not authorised to perform this action");
        _;
    }

    // Only experts can propose for an investment
    modifier checkAccess{
        bool access= false;
        for(uint i=0; i<panelOfExperts.length; i++){
            if(panelOfExperts[i]== msg.sender){
                access= true;
            }
        }
        require(access, " Only an expert can make a proposal. ");
        _;
    }

    Proposal[] public proposals;
    mapping(uint256 => mapping(address => bool)) public proposalVotes; // marks whether voted already or not

    // does not force the user to stake the entire amount at one go
    function stake() public payable{
        require(panelOfExperts.length <= noOfExperts, " Expert positions filled ");
        require(msg.value > 0, " Amount ransferred must not be 0");
        stakes[msg.sender] += msg.value;

        if(stakes[msg.sender] >= minStake){
            addExpert();
        }
    }

    function addExpert() private{

        for(uint i=0; i< panelOfExperts.length; i++){
            if(panelOfExperts[i] == msg.sender){
                emit expertAlreadyInPanel(i, msg.sender);
                return;
            }
        }

        if(panelOfExperts.length == noOfExperts ){
            emit expertPanelFull();
            return;
        }

        panelOfExperts.push(msg.sender);
        emit expertAddedToPanel(panelOfExperts.length-1, msg.sender);
    }

    function makeProposal(address payable _target, bytes calldata _data, uint _amountToInvest, uint _marginForStakers, uint _marginForPublic, uint _expiryHr) public checkAccess{
        Proposal storage prop = proposals.push(); //returns a reference to the newly added struct. 
        prop.target = _target;
        prop.data = _data;
        prop.amountToInvest = _amountToInvest;
        prop.marginForPublic = _marginForPublic;
        prop.marginForStakers = _marginForStakers;
        prop.expiry =  block.timestamp + (_expiryHr*1 hours);

        emit proposalCreated(proposals.length -1);
    }
    
    function voteForProposal(bool vote, uint index) public checkAccess{
        // checking whether it has expired or not 
        if(block.timestamp > proposals[index].expiry){ 
            emit proposalExpired(index);
            return; }

        // Whether already voted on the proposal    
        if(proposalVotes[index][msg.sender] == true){
            return;
        }

        // fresh vote
        if(vote){
            proposals[index].yesCount++;
            proposalVotes[index][msg.sender] = true;
        }else{
            proposals[index].noCount++;
            proposalVotes[index][msg.sender] = true;
        }

        emit votedSuccessfully(vote, msg.sender);

        if(proposals[index].yesCount >= minAcceptanceToPassProposal && !proposals[index].executed){
            // (bool s,) = proposals[index].target.call(proposals[index].data);
            // require(s, " Proposal did not execute ");
            // proposals[index].executed = true;
        }
    }


    
}