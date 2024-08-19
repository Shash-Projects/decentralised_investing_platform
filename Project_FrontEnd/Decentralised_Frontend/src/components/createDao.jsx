import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { ethers } from 'ethers';
import { contractABI, contractByteCode } from '../../Constants';
import { daoArray } from '../Storehouse';

const array = [];
const daoAddress = "YOUR_DAO_CONTRACT_ADDRESS";

const CreateDao = () => {

    const { provider, account, isConnected, connectToMetamask } = useAuth();

    const [dao, setDao] = useState({
        noOfExperts: '',
        minAcceptanceToPassProposal: '',
        stakeAmount: ''
    });

    const handleCreateDao = async (event) => {
        event.preventDefault();
        
        if (!isConnected) {
            document.getElementById("abc").innerHTML = "You must be logged in to create a Dao.";
            return;
        }
        // some() only works for array 
        if (Object.values(dao).some(field => field.trim() === '')) {
            console.log("Error: All fields must be filled");
            document.getElementById("abc").innerHTML = "All fields must be filled";
        }

        try {
            const signer = provider.getSigner();

            // initialising contract factory
            // A ContractFactory is an abstraction of a contract's bytecode and facilitates deploying a contract.
            const daoFactory = new ethers.ContractFactory(contractABI, contractByteCode, signer);

            const daoContract = await daoFactory.deploy(
                dao.noOfExperts,
                dao.minAcceptanceToPassProposal,
                dao.stakeAmount,

            );

            await daoContract.deployed();
            console.log("DAO Contract deployed at:", daoContract.address);
            array.push(daoContract.address);
            document.getElementById("abc").innerHTML = `Proposal Created Successfully at ${daoContract.address} \n Please store this address to further interact with dao.`;


        } catch (error) {
            console.log("contract couldn't be deployed", error);
            
        }
       
      
    };

    return (
        <div>
            <form action="">       
            <input type="text" placeholder="No of Experts" onChange={(event) => { setDao((prev) => ({ ...prev, noOfExperts: event.target.value })) }} />
            <input type="text" placeholder="Threshold acceptance" onChange={(event) => { setDao((prev) => ({ ...prev, minAcceptanceToPassProposal: event.target.value })) }} />
            <input type="text" placeholder="Stake Amount" onChange={(event) => { setDao((prev) => ({ ...prev, stakeAmount: event.target.value })) }}/>
            <button onClick={handleCreateDao}>Create Dao</button>
            <p id="abc" className='text-red-600 text-3xl'></p>
            </form>
            
        </div>
    );
};

export default CreateDao;
