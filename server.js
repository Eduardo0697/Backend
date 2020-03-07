const express = require('express')
//const { User, Perro } = require('./models')
const { Objetivo} = require('./models/index')

const app = express();

//Para poder aceptar body a traves de las peticiones se añade lo siguiente
app.use(express.urlencoded({extended: true}));
app.use(express.json())

app.get('/', (request, response) => {
    response.send('HOLA');
    
});

/*app.get('/users', (req, res) => {
    const users = User.find().exec()  //al agregar exec() se convierte en Promesa entonces podemos usar then y catch
        .then( (users) => {
            res.send(users)
        })
        .catch( (err) => {
            res.status(409).send(err)
        })
    //res.send(users);
});

//Params
app.get('/users/:id', (req, res) => {
    console.log(req.params);
    const id = req.params.id;
    User.findOne({ _id: id }).exec()
        .then( (user) => {
            if(user) res.status(200).send(user)
            else res.status(404).send({ message : 'Not found'})
        })
        .catch( (err) => {
            res.status(400).send(err)
        })
    
});

app.patch('/users/:id', (req, res) => {
    console.log(req.params);
    const id = req.params.id;
    User.findOneAndUpdate({ _id: id }, req.body, {new : true}).exec() // new : true, hace que te devuelva el usuario actualizado, de otra forma te devuelve el anterior
        .then( (userUpdated) => {
            res.send(userUpdated)
        })
        .catch( (err) => {
            res.status(409).send(err)
        })
    
});

//queries

app.get('/search' , (req, res) => {
    console.log(req.query);
    res.send({ message : 'search'});
});

app.post('/user', (req, res) => {
    console.log(req.body);
    const newUser = User({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        telefono: req.body.telefono,
        genero: req.body.genero
    })

    newUser.save((err, user) => {
        if(err)  res.status(400).send(err)
        else res.send(user)
    });

    //res.send(newUser);
});

// CRUD PERROS
app.get('/perros', (req, res) => {
    const perros = Perro.find().exec()  //al agregar exec() se convierte en Promesa entonces podemos usar then y catch
        .then( (perros) => {
            res.send(perros)
        })
        .catch( (err) => {
            res.status(409).send(err)
        })
    //res.send(users);
});

app.post('/perros', (req, res) => {
    console.log(req.body);
    const newPerro = Perro({
        nombre: req.body.nombre,
        raza: req.body.raza,
        owner: req.body.owner,
        size: req.body.size
    })

    newPerro.save((err, perro) => {
        if(err)  res.status(400).send(err)
        else res.send(perro)
    });

    //res.send(newUser);
});

app.patch('/perros/:id', (req, res) => {
    console.log(req.params);
    const id = req.params.id;
    Perro.findOneAndUpdate({ _id: id }, req.body, {new : true}).exec() // new : true, hace que te devuelva el usuario actualizado, de otra forma te devuelve el anterior
        .then( (perroUpdated) => {
            res.send(perroUpdated)
        })
        .catch( (err) => {
            res.status(409).send(err)
        })
    
});

app.get('/perros/:id', (req, res) => {
    console.log(req.params);
    const id = req.params.id;
    Perro.findOne({ _id: id }).exec()
        .then( (perro) => {
            if(perro) res.status(200).send(perro)
            else res.status(404).send({ message : 'Not found'})
        })
        .catch( (err) => {
            res.status(400).send(err)
        })
    
});*/

app.listen(3000, () => {    
    console.log('Server on')
});