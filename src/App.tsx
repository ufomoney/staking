import React, { useEffect, useState } from 'react';
import TokenMintForm from './components/TokenMintForm';
import Web3 from 'web3';
import { Config } from './components/Config';
import './App.css';

export default function App() {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState<any>();

  async function connect() {
    if (+Web3.givenProvider.chainId !== Config.chainId) {
      alert('Not bsc, please change chain id');
      return;
    }

    const web3 = new Web3(Web3.givenProvider);
    const accounts = await web3.eth.requestAccounts();

    setContract(
      new web3.eth.Contract(
        JSON.parse(Config.contractAbi),
        Config.contractAddress
      )
    );

    setAccount(accounts[0]);
  }

  return (
    <div className="main">
      {account === '' ? (
        <button className="main__btn" onClick={connect}>
          Connect Wallet
        </button>
      ) : (
        <TokenMintForm contract={contract} address={account} />
      )}
    </div>
  );
}
