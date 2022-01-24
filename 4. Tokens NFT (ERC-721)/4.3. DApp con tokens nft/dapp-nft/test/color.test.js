const { assert } = require('chai');

const Color = artifacts.require("Color");

// Requerimos chai para el testeo
require('chai').use(require('chai-as-promised')).should();

contract ("Color", (accounts) => {
    let contract;

    // Antes de los tests
    before(async () => {
        // Desplegamos contrato
        contract = await Color.deployed();
    })

    // Testeo del despligue
    describe("Deployment", async () => {
        it("Successfully deploys a contract", async () => {
            const address = contract.address;
            assert.notEqual(address, 0x0);  //Dirección distinta de 0
            assert.notEqual(address, null); // Dirección no nula
            assert.notEqual(address, undefined) // Dirección no indefinida
        })

        it("Has correct name", async () => {
            const name = await contract.name();
            assert.equal(name, "Color");
        })

        it("Has correct symbol", async () => {
            const name = await contract.symbol();
            assert.equal(name, "COLOR");
        })
    })

    // Testeo del minteo
    describe("Minting", async () =>  {
        it("Mints a new token", async () => {
            const result = await contract.mint("#FFFFFF");
            const totalSupply = await contract.totalSupply();
            const event = result.logs[0].args;

            // Exitoso
            assert.equal(totalSupply, 1); // total supply igual a 1
            assert.equal(event.tokenId.toNumber(), 1); // el id del token debe ser 1
            assert.equal(event.from, "0x0000000000000000000000000000000000000000"); // el usuario debe ser el que lo invoco
            assert.equal(event.to, accounts[0]); // el token debe ir a la dirección correspondiente

            // No exitoso
            await contract.mint("#FFFFFF").should.be.rejected; // No se puede mintear un token con un color repetido
        })
    })

    // Testeo del indexing
    describe("Indexing", async () =>  {
        it("Lists colors", async () => {
            await contract.mint("#0000FF");
            await contract.mint("#00FF00");
            await contract.mint("#FF0000");

            const totalSupply = await contract.totalSupply();
            let color;
            let result = [];

            for(let i = 0; i < totalSupply; i++){
                color = await contract.colors(i);
                result.push(color);
            }

            let expected = ["#FFFFFF", "#0000FF", "#00FF00", "#FF0000"];

            assert.equal(result.join(','), expected.join(','));
        })
    })
})