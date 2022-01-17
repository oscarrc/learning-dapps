const Evaluaciones = artifacts.require("Evaluaciones");

contract("Evaluaciones", accounts => {
    const profesor = accounts[0];
    const alumno1 = {
        id: "33333333P",
        nota: 9,
        asignatura: "Matemáticas",
        account: accounts[1]
    }

    const alumno2 = {
        id: "66666666T",
        nota: 8,
        asignatura: "Biología",
        account: accounts[2]
    }

    it("Solo el profesor puede evaluar", async () => {
        //Instancia del contrato
        const instance = await Evaluaciones.deployed();
        //Llamada a la función evaluar cómo alumno
        try{
            await instance.evaluar(alumno1.id, alumno1.asignatura, alumno1.nota, {from: alumno1.account});
            assert.fail();
        }catch(e){
            assert.include(e.message, "Solo el profesor puede ejecutar esta funcion");
        }
    })

    it("Alumnos y profesor pueden ver las notas de un alumno", async () => {
        //Instancia del contrato
        const instance = await Evaluaciones.deployed();
        //Llamada a la función evaluar cómo profesor
        const tx1 = await instance.evaluar(alumno1.id, alumno1.asignatura, alumno1.nota, {from: profesor});
        const tx2 = await instance.evaluar(alumno2.id, alumno2.asignatura, alumno2.nota, {from: profesor});
        // Obtenemos la nota publicada
        const nota1 = await instance.verNota.call(alumno1.id, alumno1.asignatura, { from: alumno1.account });
        const nota2 = await instance.verNota.call(alumno2.id, alumno2.asignatura, { from: alumno2.account });

        //Comprobamos que la nota coincida con la publicada
        assert.equal(nota1, alumno1.nota);
        assert.equal(nota2, alumno2.nota);
    });

    it("Los alumnos pueden solicitar revisiones", async () => {
        const instance = await Evaluaciones.deployed();
        // Solicitamos revisión desde la cuenta alumno
        const tx = await instance.solicitarRevision(alumno1.id, alumno1.asignatura, {from: alumno1.account});
        // Obtenemos el array de revisiones desde la cuenta profesor
        const revisiones = await instance.verSolicitudesRevision.call(alumno1.asignatura, {from: profesor});
        // Comprobamos que la revisión se ha añadido
        assert.isTrue(revisiones.includes(alumno1.id));
    })

    it("Solo el profesor puede ver solicitudes de revision", async () => {        
        const instance = await Evaluaciones.deployed();
        try{
            await instance.verSolicitudesRevision.call(alumno1.asignatura, {from: alumno1.account});
            assert.fail();
        }catch(e){
            assert.include(e.message, "Solo el profesor puede ejecutar esta funcion");
        }
    })
})