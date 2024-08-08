import React, { useState } from 'react';
import {useForm} from "react-hook-form" ; 
import { useAuth } from '../AuthContext';
import { ethers } from 'ethers';
import { contractABI, contractByteCode } from '../../Constants';


const daoAddress = "YOUR_DAO_CONTRACT_ADDRESS";

const CreateProposal = () => {

    const { provider, account, isConnected, connectToMetamask } = useAuth();

    const [proposal, setProposal] = useState({
        target: '',
        amountToInvest: '',
        marginForStakers: '',
        marginForPublic: '',
        expiryHr: '',
        initialSupply: '',
        tokenPrice: ''
    });

    const handleCreateProposal = async (event) => {
        event.preventDefault();
        // some() only works for array 
        if (!isConnected) {
            document.getElementById("abc").innerHTML = "You must be logged in to create a proposal.";
            return;
        }
        if (Object.values(proposal).some(field => field.trim() === '')) {
            console.log("Error: All fields must be filled");
            document.getElementById("abc").innerHTML = "All fields must be filled";
        }

        try {
            const signer = provider.signer();

            //initialising contract factory
            const daoFactory = new ethers.ContractFactory(contractABI, contractByteCode, signer);

            const daoContract = await daoFactory.deploy(
                proposal.target,
                proposal.amountToInvest,
                proposal.marginForStakers,
                proposal.marginForPublic,
                proposal.expiryHr,
                proposal.initialSupply,
                proposal.tokenPrice,
            );

            await daoContract.deployed();
            console.log("DAO Contract deployed at:", daoContract.address);


        } catch (error) {
            console.log("contract couldn't be deployed", error);
            
        }
        document.getElementById("abc").innerHTML = `Proposal Created Successfully at ${daoContract.address}`;
      
    };

    return (
        <div>
            <form action="">       
            <input type="text" placeholder="Target Address" onChange={(event) => { setProposal((prev) => ({ ...prev, target: event.target.value })) }} />
            <input type="text" placeholder="Amount to Invest" onChange={(event) => { setProposal((prev) => ({ ...prev, amountToInvest: event.target.value })) }} />
            <input type="text" placeholder="Margin for Stakers" onChange={(event) => { setProposal((prev) => ({ ...prev, marginForStakers: event.target.value })) }}/>
            <input type="text" placeholder="Margin for Public" onChange={(event) => { setProposal((prev) => ({ ...prev, marginForPublic: event.target.value })) }} />
            <input type="text" placeholder="Expiry (Hours)" onChange={(event) => { setProposal((prev) => ({ ...prev, expiryHr: event.target.value })) }} />
            <input type="text" placeholder="Initial Supply" onChange={(event) => { setProposal((prev) => ({ ...prev, initialSupply: event.target.value })) }} />
            <input type="text" placeholder="Token Price (in wei)" onChange={(event) => { setProposal((prev) => ({ ...prev, tokenPrice: event.target.value })) }} />
            <button onClick={handleCreateProposal}>Create Proposal</button>
            <p id="abc" className='text-red-600 text-3xl'></p>
            </form>

        </div>
    );
};

export default CreateProposal;
