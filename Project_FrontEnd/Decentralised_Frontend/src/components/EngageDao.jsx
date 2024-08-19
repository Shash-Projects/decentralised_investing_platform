import React, { useState } from 'react'
import { useAuth } from '../AuthContext';
import { ethers } from 'ethers';
import { contractABI } from '../../Constants';

const EngageDao = () => {

    const { provider, account, isConnected, connectToMetamask } = useAuth();
    const [daoAddress, setDaoAddress] = useState(null);
    const [daoContract, setDaoContract] = useState(null);
    const [daoFetched, setDaoFetched] = useState(false);
    const [display, setDisplay] = useState('');

    const [proposal, setProposal] = useState({
      target: '',
      amountToInvest: '',
      marginForStakers: '',
      marginForPublic: '',
      expiryHr: '',
      initialSupply: '',
      tokenPrice: ''
  });

    const fetchContract =async()=>{
      try {
        console.log(daoAddress);
        setDaoContract(new ethers.Contract(daoAddress, contractABI, provider.getSigner()));
        setDaoFetched(true);
        console.log("dao fetched succesfully ");
        console.log(daoContract);
        
        

      } catch (error) {
        console.log("Error: ", error);
        
      }
      console.log(daoAddress);
      
    }

    const createProposal = async () => {
      event.preventDefault();
      if (!daoContract) return;

      try {
          const tx = await daoContract.makeProposal(
              proposal.target, // Replace with actual target address
              ethers.utils.parseEther(proposal.amountToInvest), // Example amountToInvest
              ethers.utils.parseEther(proposal.marginForStakers), // Example marginForStakers
              ethers.utils.parseEther(proposal.marginForPublic), // Example marginForPublic
              proposal.expiryHr, // Example expiryHr
              ethers.utils.parseEther(proposal.initialSupply), // Example initialSupply
              ethers.utils.parseEther(proposal.tokenPrice) // Example tokenPrice
          );
          await tx.wait(); // Wait for the transaction to be mined

          daoContract.on('proposalCreated', (proposalId)=>{
            setDisplay(proposalId);
          })

          console.log("Proposal created successfully!");
          document.getElementById('abc').innerHTML= `Created successfully ${display}`;
      } catch (error) {
          console.error("Error creating proposal:", error);
      }
  };


  return (
    <div> 
    {daoFetched? 
    <form action="">       
    <input type="text" placeholder="Target Address" onChange={(event) => { setProposal((prev) => ({ ...prev, target: event.target.value })) }} />
    <input type="text" placeholder="Amount to Invest" onChange={(event) => { setProposal((prev) => ({ ...prev, amountToInvest: event.target.value })) }} />
    <input type="text" placeholder="Margin for Stakers" onChange={(event) => { setProposal((prev) => ({ ...prev, marginForStakers: event.target.value })) }}/>
    <input type="text" placeholder="Margin for Public" onChange={(event) => { setProposal((prev) => ({ ...prev, marginForPublic: event.target.value })) }} />
    <input type="text" placeholder="Expiry (Hours)" onChange={(event) => { setProposal((prev) => ({ ...prev, expiryHr: event.target.value })) }} />
    <input type="text" placeholder="Initial Supply" onChange={(event) => { setProposal((prev) => ({ ...prev, initialSupply: event.target.value })) }} />
    <input type="text" placeholder="Token Price (in wei)" onChange={(event) => { setProposal((prev) => ({ ...prev, tokenPrice: event.target.value })) }} />
    <button onClick={createProposal}>Create Proposal</button>
    <p id="abc" className='text-red-600 text-3xl'></p>
    </form>
    :
    <div>
      <input type="text" required placeholder='Enter Dao Address' onChange={(event)=>{setDaoAddress(event.target.value)}}/>
      <span><button className='' onClick={fetchContract}>Search</button></span>
    </div>
      }
      
    </div>
  )
}

export default EngageDao
