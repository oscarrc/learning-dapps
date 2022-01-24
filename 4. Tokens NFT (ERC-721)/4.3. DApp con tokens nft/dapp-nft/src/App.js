import './App.css';

import { useCallback, useEffect, useState } from "react";

import Color from './truffle/build/Color.json';
import Web3 from 'web3';

function App() {
  // Establecer estados
  const [ account, setAccount] = useState(null);
  const [ contract, setContract] = useState(null);
  const [ totalSupply, setTotalSupply] = useState(0);
  const [ colors, setColors] = useState([]);

  const initWeb3 = async () => {
    // Si tenemos ethereum disponible, inicializamos web3
    if(window.ethereum){
      window.web3 = new Web3(window.ethereum);
      // await window.ethereum.enabled(); DEPRECATED
      await window.ethereum.request({ method: 'eth_requestAccounts' })
    // Si ya existe web3, lo inicializamos
    }else if(window.web3){
      window.web3 = new Web3(window.web3.currentProvider);
    }else{
      window.alert('Metamask or compatible client not detected.');
    }
  }

  const loadBlockchainData = useCallback(async () => {
    const web3 = window.web3;
    
    // Obtenemos una cuenta y la añadimos al estado
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);

    // Obtenemos el networkid
    const networkId = await web3.eth.net.getId();

    // Obtenemos los datos de la red
    const networkData = Color.networks[networkId];

    if(networkData){
      // Obtenemos instancia del contrato
      const abi = Color.abi;
      const address = networkData.address;
      const contract = new web3.eth.Contract(abi, address);
      setContract(contract);

      // Obtenemos el totalSupply
      const totalSupply = await contract.methods.totalSupply().call();
      setTotalSupply(totalSupply);

      //Obtenemos los colores
      for(let i = 0; i < totalSupply; i++){
        const color = await contract.methods.colors(i).call();
        setColors(state => [...state, color]);
      }
    }else{
      window.alert("Smart Contract not deployed to detected network.");
    }
  }, []);

  // Realiza el minteo de un nuevo token
  const mint = async (color) => {
    // Llamamos al método mint desde la cuenta
    contract.methods.mint(color)
      .send({ from: account })
      .once('receipt', (receipt) => {
        // Una vez recibido lo añadimos al array de colores
        setColors(state => [...state, color]);
      })
      .catch(err => console.log(err.message));
  }

  const submit = (event) => {
    event.preventDefault();
    let color = event.target.color.value;
    mint(color);
  }

  useEffect(() => {
    initWeb3();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {    
    loadBlockchainData();
  },[loadBlockchainData]);

  return (
    <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow px-4">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="/"
            target="_blank"
            rel="noopener noreferrer"
          >
            DApp Colores
          </a>
          <ul className="navbar-nav px-3">
            <li className="nav-item text-nowrap d-none d-sm-block">
              <small className="text-white">{ account }</small>
            </li>
          </ul>
        </nav>
        <div className="container mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex flex-column text-center justify-content-center">
              <section className="content">
                <h1>COLECCIONA COLORES NFT</h1>
                <form onSubmit={ submit } className="form-inline">
                  <div className="input-group mb-2 mr-sm-2">
                    <input type="text" name="color" placeholder="Ej: #FFFFFF"  className="form-control mb-1" required/>
                    <div className="input-group-append">
                      <button type="submit" className="btn btn-primary rounded-right mint-button">Mint</button>
                    </div>
                  </div>
                </form>
              </section>
              <hr />
              <section className="content">
                <div className="row">
                  <h2>Tus colores</h2>
                  {colors.map((color, key) => (                    
                    <div key={key} className="col-sm-6 col-md-4 col-lg-3 mt-4">
                      <span className="text-secondary token d-flex justify-content-center align-items-center text-uppercase font-weight-bold" style={{ backgroundColor: color }}>
                        { color }
                      </span>
                    </div>
                  ))}                
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
  );
}

export default App;
