// src/components/CreateProposal.js
import React, { useState } from 'react';
// import { getContract } from '../utils/ethereum';
// import DaoABI from '../abis/Dao.json';

const daoAddress = "YOUR_DAO_CONTRACT_ADDRESS";

const CreateProposal = () => {
    const [target, setTarget] = useState('');
    const [amount, setAmount] = useState('');
    const [marginStakers, setMarginStakers] = useState('');
    const [marginPublic, setMarginPublic] = useState('');
    const [expiryHr, setExpiryHr] = useState('');
    const [initialSupply, setInitialSupply] = useState('');
    const [tokenPrice, setTokenPrice] = useState('');

    const handleCreateProposal = async () => {
alert("Proposal Created!!")
    };

    return (
        <div>
            <input type="text" placeholder="Target Address" onChange={e => setTarget(e.target.value)} />
            <input type="text" placeholder="Amount to Invest" onChange={e => setAmount(e.target.value)} />
            <input type="text" placeholder="Margin for Stakers" onChange={e => setMarginStakers(e.target.value)} />
            <input type="text" placeholder="Margin for Public" onChange={e => setMarginPublic(e.target.value)} />
            <input type="text" placeholder="Expiry (Hours)" onChange={e => setExpiryHr(e.target.value)} />
            <input type="text" placeholder="Initial Supply" onChange={e => setInitialSupply(e.target.value)} />
            <input type="text" placeholder="Token Price (in wei)" onChange={e => setTokenPrice(e.target.value)} />
            <button onClick={handleCreateProposal}>Create Proposal</button>
        </div>
    );
};

export default CreateProposal;
