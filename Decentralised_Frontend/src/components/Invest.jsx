// src/components/BuyTokens.js
import React, { useState } from 'react';
// import { getContract } from '../utils/ethereum';
// import DaoABI from '../abis/Dao.json';

const daoAddress = "YOUR_DAO_CONTRACT_ADDRESS";

const BuyTokens = () => {
    const [numberOfTokens, setNumberOfTokens] = useState('');

    const handleBuyTokens = async () => {
        const daoContract = getContract(daoAddress, DaoABI);
        try {
            const tx = await daoContract.buyTokens(ethers.utils.parseUnits(numberOfTokens, 18));
            await tx.wait();
            alert("Tokens purchased");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <input type="text" placeholder="Number of Tokens" onChange={e => setNumberOfTokens(e.target.value)} />
            <button onClick={handleBuyTokens}>Buy Tokens</button>
        </div>
    );
};

export default BuyTokens;
