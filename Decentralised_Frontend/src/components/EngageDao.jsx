import React from 'react'
import { useAuth } from '../AuthContext';
import { ethers } from 'ethers';
import { contractABI } from '../../Constants';

const EngageDao = () => {

    const { provider, account, isConnected, connectToMetamask } = useAuth();



  return (
    <div>
      
    </div>
  )
}

export default EngageDao
