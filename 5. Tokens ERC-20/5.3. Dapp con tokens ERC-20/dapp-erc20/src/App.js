import './App.css';

import { useEffect, useState } from 'react';

import Web3 from 'web3';
import main from './truffle/build/Main.json';
import web3 from './ethereum/web3';

const App = () => {
  const [ account, setAccount ] = useState('');
  const [ contract, setContract ] = useState(null);
  const [ contractAddress, setContractAddress ] = useState(null);
  const [ amount, setAmount ] = useState(0);
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(null);
  const [ address, setAddress ] = useState('');
  const [ balance, setBalance ] = useState(0);

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
      setContractAddress(instance.options.address);
    }else{
      console.log("Smart contract not deployed to detected network");
      return;
    }
  }

  const buyTokens = async (address, amount) => {
    setLoading(true);

    try{
      await contract.methods.send_tokens(address, amount).send({ 
        from: account,
        value: window.web3.utils.toWei(amount.toString(), 'ether')
      })

      setLoading(false);
    }catch(err){
      setError(err.message);
    }finally{      
      setLoading(false);
    }
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <>
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
              <small className="text-white">{account}</small>
            </li>
          </ul>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
             <main className="col-lg-12 d-flex  justify-content-center">
               <section className="content">
                  <h1>Compra de tokens ERC-20</h1>
                  <form onSubmit={ (e) => {
                    e.preventDefault();
                    buyTokens(address, amount);
                  }}>
                    <input className="form-control mb-1" type="text" placeholder="Dirección del destinatario" value={address} onChange={ (e) => setAddress(e.target.value) } />
                    <input className="form-control mb-1"  type="text" placeholder="Cantidad de tokens" value={amount} onChange={ (e) => setAmount(e.target.value) } />
                    <button className="btn w-100 btn-danger btn-sm" type="submit">Comprar Tokens</button>
                  </form>
               </section>
             </main>
          </div>
        </div>
    </>
  );
}

export default App;
