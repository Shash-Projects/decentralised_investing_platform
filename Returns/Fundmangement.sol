// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";


contract Returns is Ownable{
    mapping(address => uint) public balances;
    mapping(address => uint) public invested;
    address[] public investors;
    address public Proposer ; 
    uint public ProfitShare ; 
    uint public totalInvested;
    uint public profits;

    constructor(address initialOwner) Ownable(initialOwner) {
        transferOwnership(initialOwner);
            }

    function invest() external payable {
        require(msg.value > 0, "Investment must be greater than zero");
        if (balances[msg.sender] == 0) {
            investors.push(msg.sender);
        }
        balances[msg.sender] += msg.value;
        invested[msg.sender] += msg.value;
        totalInvested += msg.value;
    }

    function distribution() external onlyOwner {
        require(totalInvested > 0, "No investments made");

        uint totalProfit = profits - totalInvested;
        uint proposerShare = (totalProfit * ProfitShare) / 100;

        // Ensure proposer's share does not exceed the limit such that remaining profit is greater than totalInvested
        require(totalProfit - proposerShare > totalInvested, "Proposer's share is too high");

        uint remainingProfit = totalProfit - proposerShare;
        
        payable(Proposer).transfer(proposerShare);

        for (uint i = 0; i < investors.length; i++) {
            address investor = investors[i];
            uint investment = invested[investor];
            uint share = (remainingProfit * investment) / totalInvested;
            payable(investor).transfer(share);
        }
    }

    function addProfits() external payable onlyOwner {
        profits += msg.value;
    }
}
