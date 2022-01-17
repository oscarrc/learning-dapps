const Evaluaciones = artifacts.require("Evaluaciones");

contract("Evaluaciones", accounts => {
    const profesor = accounts[0];
    const alumnos = [
        {
            id: "33333333P",
            nota: 9,
            asignatura: "Matemáticas",
            account: accounts[1]
        },
        {
            id: "66666666T",
            nota: 8,
            asignatura: "Biología",
            account: accounts[2]
        }
    ]

    it("Solo el profesor puede evaluar", async () => {
        //Instancia del contrato
        const instance = await Evaluaciones.deployed();
        //Llamada a la función evaluar cómo alumno
        try{
            await instance.evaluar(alumnos[0].id, alumnos[0].asignatura, alumnos[0].nota, {from: alumnos[0].account});
            assert.fail();
        }catch(e){
            assert.include(e.message, "Solo el profesor puede ejecutar esta funcion");
        }
    })

    it("Alumnos y profesor pueden ver las notas de un alumno", async () => {
        //Instancia del contrato
        const instance = await Evaluaciones.deployed();
        //Llamada a la función evaluar cómo profesor
        const tx1 = await instance.evaluar(alumnos[0].id, alumnos[0].asignatura, alumnos[0].nota, {from: profesor});
        const tx2 = await instance.evaluar(alumnos[1].id, alumnos[1].asignatura, alumnos[1].nota, {from: profesor});
        // Obtenemos la nota publicada
        const nota1 = await instance.verNota.call(alumnos[0].id, alumnos[0].asignatura, { from: alumnos[0].account });
        const nota2 = await instance.verNota.call(alumnos[1].id, alumnos[1].asignatura, { from: alumnos[1].account });

        //Comprobamos que la nota coincida con la publicada
        assert.equal(nota1, alumnos[0].nota);
        assert.equal(nota2, alumnos[1].nota);
    });

    it("Los alumnos pueden solicitar revisiones", async () => {
        const instance = await Evaluaciones.deployed();
        // Solicitamos revisión desde la cuenta alumno
        const tx = await instance.solicitarRevision(alumnos[0].id, alumnos[0].asignatura, {from: alumnos[0].account});
        // Obtenemos el array de revisiones desde la cuenta profesor
        const revisiones = await instance.verSolicitudesRevision.call(alumnos[0].asignatura, {from: profesor});
        // Comprobamos que la revisión se ha añadido
        assert.isTrue(revisiones.includes(alumnos[0].id));
    })

    it("Solo el profesor puede ver solicitudes de revision", async () => {        
        const instance = await Evaluaciones.deployed();
        try{
            await instance.verSolicitudesRevision.call(alumnos[0].asignatura, {from: alumnos[0].account});
            assert.fail();
        }catch(e){
            assert.include(e.message, "Solo el profesor puede ejecutar esta funcion");
        }
    })
})