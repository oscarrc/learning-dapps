import './App.css';

import { useEffect, useState } from "react";

import Color from './truffle/build/Color.json';
import Web3 from 'web3';
import logo from './logo.svg';

function App() {
  // Establecer estados
  const [ account, setAccount] = useState(null);
  const [ contract, setContract] = useState(null);
  const [ totalSupply, setTotalSupply] = useState(0);
  const [ colors, setColors] = useState([]);

  useEffect(() => {
    initWeb3();
    loadBlockchainData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      window.alert('No se ha detectado un cliente compatible con web3.');
    }
  }

  const loadBlockchainData = async () => {
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

      getColors();
    }else{
      window.alert("Smart Contract not deployed to detected network.");
    }
  }

  // Obtiene colores de un usuario
  const getColors = async () => {
    for(let i = 0; i < totalSupply; i++){
      const color = await contract.methods.colors(i).call();
      setColors([...colors, color]);
    }
  }

  // Realiza el minteo de un nuevo token
  const mint = async (color) => {
    // Llamamos al método mint desde la cuenta
    contract.methods.mint(color)
      .send({ from: account })
      .once('receipt', (receipt) => {
        // Una vez recibido lo añadimos al array de colores
        setColors([...colors, color]);
      })
  }

  return (
    <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow px-4">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="https://frogames.es/rutas-de-aprendizaje"
            target="_blank"
            rel="noopener noreferrer"
          >
            DApp
          </a>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center justify-content-center">
              <div className="content mr-auto ml-auto">
                <a
                  href="https://frogames.es/rutas-de-aprendizaje"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={logo} className="App-logo" alt="logo" />
                </a>
                <h1>DApp</h1>
                <p>
                  Edita <code>src/components/App.js</code> y guarda para recargar.
                </p>
                <a
                  className="App-link"
                  href="https://frogames.es/rutas-de-aprendizaje"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                   APRENDE BLOCKCHAIN <u><b>AHORA! </b></u>
                </a>
              </div>
            </main>
          </div>
        </div>
      </div>
  );
}

export default App;
