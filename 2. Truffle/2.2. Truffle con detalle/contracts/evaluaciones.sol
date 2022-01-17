//SPDX-License-Identifier: MIT

pragma solidity >=0.4.4 <0.9.0;
pragma experimental ABIEncoderV2;

/// @title Evaluaciones
/// @author Oscar R.C.
/// @notice Sistema de evaluaciones universitarias

contract Evaluaciones {
    //Dirección del profesor que publica las notas
    address public profesor;

    //Mapping para relacionar hash de la identidad del alumno con su nota. Así la identidad permanece privada.
    mapping(bytes32 => uint) Notas;

    //Array de strings (ID alumno) que solicitan revisión de examen
    string [] Revisiones;

    //Evento alumno evaluado. Devuelve el hash del alumno
    event alumno_evaluado(bytes32);

    //Evento que notifica la solicitud de revisión. Devuelve el ID del alumno
    event revision_solicitada(string);

    constructor() {
        //Establecemos la dirección del profesor, en este caso el owner (quien despliega) el contrato
        profesor = msg.sender;
    }

    //Modificador para permitir que solo el profesor ejecute una funcion
    modifier SoloProfesor(address _direccion){
        //Requerimos que la dirección pasada por parámetro coincida con el owner del contrato, definido en el constructor
        require(_direccion == profesor, "Solo el profesor puede ejecutar esta funcion");
        _;
    }

    //Función para evaluar a un alumno
    function evaluar(string memory _id, uint _nota) public SoloProfesor(msg.sender){
        //Obtenemos el hash del alumno
        bytes32 hashAlumno = keccak256(abi.encodePacked(_id));

        //Relacionamos el hash con la nota del alumno
        Notas[hashAlumno] = _nota;

        //Emitimos Evento
        emit alumno_evaluado(hashAlumno);
    }

    //Función que permite a un alumno ver su nota
    function verNota(string memory _id) public view returns(uint){
        //Obtenemos el hash del alumno
        bytes32 hashAlumno = keccak256(abi.encodePacked(_id));

        //Devolvemos su nota del mapping Notas
        return Notas[hashAlumno];
    }

    // Función para solicitar revisión de nota
    function solicitarRevision(string memory _id) public{
        //Añadimos el id del alumno al array de revisiones
        Revisiones.push(_id);

        //Lanzamos la notificacion
        emit revision_solicitada(_id);
    }

    //Función que permite al profesor ver las revisiones solicitadas. Devuelve un array de strings
    function verSolicitudesRevision() public view SoloProfesor(msg.sender) returns(string [] memory){
        //Devolvemos el array de revisiones solicitadas
        return Revisiones;
    }
}