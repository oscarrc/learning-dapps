const { assert } = require('chai');

const Main = artifacts.require("Main");

// Requerimos chai para el testeo
require('chai').use(require('chai-as-promised')).should();

contract ("Main", (accounts) => {
    it("Gets contract owner", async () => {
        const instance = await Main.deployed();
        const owner = await instance.getOwner.call();

        assert.equal(owner, accounts[0]);
    })

    it("Sends tokens", async () => {
        const instance = await Main.deployed();        
        const initialAccountTokens = await instance.balance_direccion.call(accounts[0]);
        const initialContractTokens = await instance.balance_total.call();

        await instance.send_tokens(accounts[0], 2, { from: accounts[0], value: 2000000000000000000 });

        const accountTokens = await instance.balance_direccion.call(accounts[0]);
        const contractTokens = await instance.balance_total.call();

        assert.equal(parseInt(initialAccountTokens) + 2, accountTokens);
        assert.equal(parseInt(initialContractTokens) - 2, contractTokens);
    })

    it("Increases token supply", async () => {
        const instance = await Main.deployed();        
        const initialContractTokens = await instance.balance_total.call();

        await instance.GeneraTokens(100);

        const contractTokens = await instance.balance_total.call();

        assert.equal(parseInt(initialContractTokens) + 100, contractTokens);
    })
});