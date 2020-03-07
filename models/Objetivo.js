const mongoose = require('mongoose')

const schemaObjetivo = new mongoose.Schema({
    emailAssociated: {
        type: String,
        required: true,
    },
    title : {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    typeObjective: {
        type: String,
        enum: ['pequeño', 'mediano', 'grande']  //Con este decimos que solo se puede escribir alguna de estas opciones
    },
    tasks :{
        type: [ {
            taskTitle: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
            importance: {
                type: String,
                required: true,
            },
            frequency: {
                type: String,
                required: true,
            }
        }]
    }
});

//model(comoSeLlamaraModelo, Schema)
const Objetivo = mongoose.model('Objetivo', schemaObjetivo);

module.exports = Objetivo;
