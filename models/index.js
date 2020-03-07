//Se encargara de realizar una cadena de conexion

const mongose = require('mongoose')

const Objetivo = require('./Objetivo')

//const URL_MONGO = '';

const URL_MONGO = 'mongodb+srv://guajardoedahi:kamatekaora@cluster0-1yslx.mongodb.net/test?retryWrites=true&w=majority';

mongose.connect(URL_MONGO, { useNewUrlParser: true, useUnifiedTopology: true}, (err)=> {
    if(!err) console.log('Conexion exitosa')
    else console.log(err)
});

module.exports = {
    Objetivo
}