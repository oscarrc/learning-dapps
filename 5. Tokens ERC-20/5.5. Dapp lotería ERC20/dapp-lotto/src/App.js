import './App.css';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { Container } from 'react-bootstrap';
import Footer from './components/Footer';
import Header from './components/Header';
import Lotto from './components/Lotto';
import Tokens from './components/Tokens';
import Web3 from 'web3';
import Winners from './components/Winners';
import lotto from './truffle/build/Lotto.json';

const App = () => {
  const [ account, setAccount ] = useState('');
  const [ contract, setContract ] = useState(null);
  const [ contractAddress, setContractAddress ] = useState(null);

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
    const networkData = await lotto.networks[networkId];

    if(networkData) {
      const abi = lotto.abi;
      const address = networkData.address;
      const instance = new window.web3.eth.Contract(abi, address);
      setContract(instance);
      setContractAddress(instance.options.address);
    }else{
      console.log("Smart contract not deployed to detected network");
      return;
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">      
      <Router>       
        <Header account={account} />
        <Container fluid className="my-5 flex-grow-1"> 
          <main className="row d-flex flex-column justify-content-center align-items-center">
            <Routes>
              <Route path="/" element={<Tokens />} />
              <Route path="lotto" element={<Lotto />} />
              <Route path="winners" element={<Winners />} />
            </Routes>
          </main>
        </Container>
        <Footer contractAddress={contractAddress} />      
      </Router>
    </div>
  );
}

export default App;
