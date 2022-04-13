import Web3 from "web3";

let web3;

if(window.web3) {
    web3 = new Web3(window.web3.currentProvider);
}

window.addEventListener("load", async () => {
    if(window.ethereum) {
        window.web3 = new Web3(window.ethereum);

        try{
            await window.ethereum.request({ method: 'eth_requestAccounts' })
        }catch(err){
            console.log(err);
        }
    }else if(window.web3){
        window.web3 = new Web3(window.web3.currentProvider);
    }else{
        console.log("Non-Ethereum browser detected");
    }
})

export default web3;