const mongoose = require('mongoose');

const AlumnoSchema = new mongoose.Schema({

    nombre: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    fechaNac: {
        type: Date,
        // date.toLocaleDateString()     // 5/12/2020
        required: true
    },
    dni: {
        type: String,
        required: true
    },
    email: {
        type: String 
    },
    tel: {
        type: Number,
        min: [9, 'Mínimo son 9 cifras'],
        required: true
    },
    clase: {
        type: String, // soib, robotica o prl
        required: true
    },
});

const Alumno = mongoose.model('alumno', AlumnoSchema);
module.exports = Alumno;