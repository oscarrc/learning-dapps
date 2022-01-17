const Hello = artifacts.require("Hello");

contract("Hello", accounts => {
    it("Obtiene el mensaje", async () => {
        // Despliegue del contrato
        const instance = await Hello.deployed();

        // Obtenemos el mensaje llamando a la función getMessage desde la cuenta 0
        const message = await instance.getMessage.call({from: accounts[0]}); 

        // Comprobamos que el mensaje sea el esperado
        assert.equal(message, "Hello world");
    });

    it("Cambia el mensaje", async () => {
        // Nuevo mensaje
        const newMessage = "Hi world";

        // Despliegue del contrato
        const instance = await Hello.deployed();

        // Cambiamos el mensaje, creando una transacción utilizando el método setMessage del contrato
        const tx = await instance.setMessage(newMessage, {from: accounts[0]});

        // Obtenemos el mensaje llamando a la función getMessage desde la cuenta 0
        const message = await instance.getMessage.call({from: accounts[0]}); 
        
        // Comprobamos que el mensaje sea igual a new message
        assert.equal(message, newMessage);
    });
});