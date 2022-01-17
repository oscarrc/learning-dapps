const Evaluaciones = artifacts.require("Evaluaciones");

contract("Evaluaciones", accounts => {
    const profesor = accounts[0];
    const alumno = {
        id: "33333333P",
        nota: 9,
        account: accounts[1]
    }

    it("Solo el profesor puede evaluar", async () => {
        //Instancia del contrato
        const instance = await Evaluaciones.deployed();
        //Llamada a la función evaluar cómo alumno
        try{
            await instance.evaluar(alumno.id, alumno.nota, {from: alumno.account});
            assert.fail();
        }catch(e){
            assert.include(e.message, "Solo el profesor puede ejecutar esta funcion");
        }
    })

    it("Alumnos y profesor pueden ver las notas de un alumno", async () => {
        //Instancia del contrato
        const instance = await Evaluaciones.deployed();
        //Llamada a la función evaluar cómo profesor
        const tx = await instance.evaluar(alumno.id, alumno.nota, {from: profesor});
        // Obtenemos la nota publicada
        const nota = await instance.verNota.call(alumno.id, { from: alumno.account });
        //Comprobamos que la nota coincida con la publicada
        assert.equal(nota, alumno.nota);
    });

    it("Los alumnos pueden solicitar revisiones", async () => {
        const instance = await Evaluaciones.deployed();
        // Solicitamos revisión desde la cuenta alumno
        const tx = await instance.solicitarRevision(alumno.id, {from: alumno.account});
        // Obtenemos el array de revisiones desde la cuenta profesor
        const revisiones = await instance.verSolicitudesRevision.call({from: profesor});
        // Comprobamos que la revisión se ha añadido
        assert.isTrue(revisiones.includes(alumno.id));
    })

    it("Solo el profesor puede ver solicitudes de revision", async () => {        
        const instance = await Evaluaciones.deployed();
        try{
            await instance.verSolicitudesRevision.call({from: alumno.account});
            assert.fail();
        }catch(e){
            assert.include(e.message, "Solo el profesor puede ejecutar esta funcion");
        }
    })
})