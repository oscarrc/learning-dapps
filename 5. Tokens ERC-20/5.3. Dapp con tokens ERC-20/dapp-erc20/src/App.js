import './App.css';

import { useEffect, useState } from 'react';

import Web3 from 'web3';
import main from './truffle/build/Main.json';
import web3 from './ethereum/web3';

const App = () => {
  const [ account, setAccount ] = useState('');
  const [ contract, setContract ] = useState(null);
  const [ contractAddress, setContractAddress ] = useState(null);  
  const [ contractBalance, setContractBalance ] = useState(null);
  const [ amount, setAmount ] = useState(0);
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(null);
  const [ address, setAddress ] = useState('');
  const [ balance, setBalance ] = useState(null);

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

  const getBalance = async (address) => {
    setLoading(true);

    try{
      const balance = await contract.methods.balance_direccion(address).call();
      setBalance(balance);
      setLoading(false);
    }catch(err){
      setError(err.message);
    }finally{      
      setLoading(false);
    }
  }

  const getSupply = async (address) => {
    setLoading(true);

    try{
      const balance = await contract.methods.balance_total().call();
      setContractBalance(balance);
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
              <span className="badge bg-secondary">{account}</span>
            </li>
          </ul>
        </nav>
        <div className="container-fluid my-5">
          <main className="row d-flex flex-column justify-content-center align-items-center">
            <section className="col-12 col-md-8 col-lg-4 content text-center my-4">
              <h1>Compra de tokens ERC-20</h1>
              <form onSubmit={ (e) => {
                e.preventDefault();
                buyTokens(address, amount);
                setContractBalance(null);
                setBalance(null);
              }}>
                <input className="form-control mb-1" type="text" placeholder="Dirección del destinatario" value={address} onChange={ (e) => setAddress(e.target.value) } />
                <input className="form-control mb-1"  type="text" placeholder="Cantidad de tokens" value={amount} onChange={ (e) => setAmount(e.target.value) } />
                <button className="btn w-100 btn-danger btn-sm" type="submit">Comprar Tokens</button>
              </form>
            </section>
            <section className="col-12 col-md-8 col-lg-4 content text-center my-4">
              <h1>Consulta de balance</h1>
              <form onSubmit={ (e) => {
                e.preventDefault();
                getBalance(address);
              }}>
                <input className="form-control mb-1" type="text" placeholder="Dirección a consultar" value={address} onChange={ (e) => {
                  setAddress(e.target.value)
                  setBalance(null);
                } } />
                {
                  balance ?
                    <div className="alert alert-primary mb-1" role="alert">
                      { balance } tokens
                    </div> :
                    null
                }
                <button className="btn w-100 btn-primary btn-sm" type="submit">Ver balance</button>
              </form>
            </section>
            <section className="col-12 col-md-8 col-lg-4 content text-center my-4">
              <h1>Tokens disponibles</h1>
              <form onSubmit={ (e) => {
                e.preventDefault();
                getSupply();
              }}>
                {
                  contractBalance ?
                    <div className="alert alert-success mb-1" role="alert">
                      { contractBalance } tokens disponibles
                    </div> :
                    null
                }
                <button className="btn w-100 btn-success btn-sm" type="submit">Consultar tokens disponibles</button>
              </form>
            </section>
          </main>
        </div>
        <footer className="d-flex justify-content-center text-center">
          <span className="badge bg-dark">Contract: {contractAddress}</span>
        </footer>
    </div>
  );
}

export default App;
