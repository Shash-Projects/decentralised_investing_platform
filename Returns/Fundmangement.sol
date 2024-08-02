// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol"; 

contract Returns is Ownable {
    mapping(address => uint) public invested;  // no. of tokens bought by investor
    address[] public investors; // array of addresses of investors
    address public Proposer ; 
    uint public ProfitShare ; // share of the experts 
    uint public experts  ;  // no. of experts
    uint tokenprice    ; 
    uint public totalInvested;  // total investment money
    uint public profits = totalInvested; // money returned after investment 

    constructor(address initialOwner) Ownable(initialOwner) {
        transferOwnership(initialOwner);
            }

// this function generates a random no. b/w 10 to 100 , which will be used as profit rate 
function randomNum() public  {
    uint random = uint(keccak256(abi.encodePacked(block.difficulty , block.timestamp , msg.sender))) ; 
    return (random%91 + 10 ) ;
}


function investment() public returns (uint _profits) {
        require(totalInvested > 0, "No investments made");
        uint profitRate = randomNum() ; 
    profits += totalInvested*(profitRate / 100);
}



    function distribution() external onlyOwner {
require (investors.length > 0 , "No investors "); 
require (experts > 0 , "No experts"); 
        uint totalProfit = profits - totalInvested;
        uint proposerShare = (totalProfit * (ProfitShare / 100)) / experts;



        uint buyers = (totalProfit - proposerShare) / investors.length;
        // uint buyer = buyers*invested[]
        
        payable(Proposer).transfer(proposerShare);

        for (uint i = 0; i < investors.length; i++) {
            address investor = investors[i];
            uint investment = invested[investor]; //  token balance of the investor 
            uint share = (buyers* investment) ;
            payable(investor).transfer(share + (investment*tokenprice));
        }
    }

    function addProfits() external payable onlyOwner {
        profits += msg.value;
    }
}
