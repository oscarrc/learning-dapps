import './App.css';

import { useEffect, useState } from 'react';

import Web3 from 'web3';
import main from './truffle/build/Main.json';
import web3 from './ethereum/web3';

const App = () => {
  const [ account, setAccount ] = useState(null);
  const [ contract, setContract ] = useState(null);

  const init = async () => {
    // Inicialización de web3
    if(window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' })
    }else if(window.web3){
        window.web3 = new Web3(window.web3.currentProvider);
    }else{
        console.log("Non-Ethereum browser detected");
        return;
    }

    // Obtener cuenta
    const accounts = await window.web3.eth.getAccounts();
    setAccount(accounts[0]);

    // Obtener network
    const networkId = await window.web3.eth.net.getId();
    const networkData = await main.networks[networkId];

    if(networkData) {
      const abi = main.abi;
      const address = networkData.address;
      const instance = new window.web3.eth.Contract(abi, address);
      setContract(instance);
    }else{
      console.log("Smart contract not deployed to detected network");
      return;
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow px-4">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="/"
            target="_blank"
            rel="noopener noreferrer"
          >
            DApp ERC-20
          </a>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-block">
              <small className="text-white"></small>
            </li>
          </ul>
        </nav>
    </div>
  );
}

export default App;
