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


//Resumen de rutas y operaciones CRUD 
/**
 * ENDPOINTS
 * 
 * POST /objetivos/:email
 * 
 * PATCH /objetivos/usuario/tasks
 * PATCH /objetivos/usuario/objetivo
 * PATCH /objetivos/usuario/tasks/:task
 * 
 * GET  /objetivos
 * GET  /objetivos/usuario
 * GET  /objetivos/usuario/objetivo
 * GET  /objetivos/usuario/tasks    *Pensar en cambiar a /objetivos/usuario/objetivo/tasks
 * GET  /objetivos/usuario/tasks/:task
 */

//CRUD para objetivos

//POST
/**
 * Operaciones a Realizar con POST
 * 1.- Creacion del un objetivo con su primer tarea especifica
 */

//Creacion de un objetivo
//Para la creacion de un objetivo es necesario pasarle la primer tarea definida siempre
app.post('/objetivos/:email', (req, res) => {
    console.log(req.body);
    const email = req.params.email;
    const newObjetivo = Objetivo({
        emailAssociated: email,
        title: req.body.title,
        description: req.body.description,
        obstacles: req.body.obstacles,
        typeObjective: req.body.typeObjective,
        length: req.body.length,
        isCompleted : false,
        tasks : req.body.tasks,
    })

    newObjetivo.save((err, user) => {
        if(err)  res.status(400).send(err)
        else res.send(user)
    });
});



// PATCH

/**
 * Operaciones a realizar con patch (Autenticacion por email)
 * 1.- Añadir una tarea a un objetivo especifico (Actualizacion de objetivo)
 * 2.- Actualizar Info General de un Objetivo especifico
 * 3.- Actualizar una tarea especifica de un objetivo especifico
 * 4.- Marcar una tarea como completada - Con 3.- se puede actualizar
 * 5.- Marcar tarea como no completada- 3. se puede actualizar
 * 6.- Marcar Objetivo como completado*
 */

 // 1.-
app.patch('/objetivos/usuario/tasks', (req, res) => {
    console.log(req.query);
    const  { email, idObj }  = req.query;
    console.log(req.body)
    const task = req.body;
    Objetivo.findOneAndUpdate({ _id: idObj, emailAssociated: email } , {$push: {tasks: task}}, {new : true}).exec() 
        .then( (taskAdded) => {
            res.send(taskAdded)
        })
        .catch( (err) => {
            res.status(409).send(err)
        })

});

 // 2.-
 app.patch('/objetivos/usuario/objetivo', (req, res) => {
    console.log(req.query);
    const  { email, idObj }  = req.query;
    console.log(req.body)
    Objetivo.findOneAndUpdate({ _id: idObj, emailAssociated: email } , req.body, {new : true}).exec() 
        .then( (objetivoUpdated) => {
            res.send(objetivoUpdated)
        })
        .catch( (err) => {
            res.status(409).send(err)
        })

});

 // 3.-
 app.patch('/objetivos/usuario/tasks/:task', (req, res) => {
    console.log(req.query);
    console.log(req.params);
    console.log(req.body)
    const task = req.params.task;
    const  { email, idObj }  = req.query;
    const set =  {};
    Object.entries(req.body).forEach( ([key, value]) =>{
        set['tasks.$.' + key] = value;
    })
    Objetivo.findOneAndUpdate({ _id: idObj, emailAssociated: email, "tasks._id" : task} , { $set : set}, {new : true}).exec() 
        .then( (objetivo) => {
            res.send(objetivo)
            console.log('Exito')
        })
        .catch( (err) => {
            res.status(409).send(err)
        })

});

/*


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
    
});*/


//GET
/**
 * Operaciones con GET
 * 1.- Retornar todos los objetivos existentes
 * 2.- Retorna los objetivos asociados a un usuario especifico via email
 * 3.- Retorna un objetivo especifico segun su id por email como autenticacion
 * 4.- Retorna las tareas asociadas a un objetivo especifico con email como autenticacion
 * 5.- Retrorna una tarea especifica de un objetivo con email como autenticacion
 */



//Retorna todos los objetivos en la BD sin importar el usuario
app.get('/objetivos', (req, res) => {
    const objetivos = Objetivo.find().exec()  
        .then( (objetivos) => {
            res.status(200).send(objetivos)
        })
        .catch( (err) => {
            res.status(409).send(err)
        })
});


//Retorna los objetivos asociados a un usuario especifico por email
app.get('/objetivos/usuario', (req, res) => {
    console.log(req.query)
    const  { email }  = req.query;
    Objetivo.find({ emailAssociated: email }).exec()
        .then( (objetivos) => {
            if(objetivos) res.status(200).send(objetivos)
            else res.status(404).send({ message : 'Not found'})
        })
        .catch( (err) => {
            res.status(400).send(err)
        })
});

//Retorna un objetivo especifico por id y por email como password
app.get('/objetivos/usuario/objetivo', (req, res) => {
    console.log(req.query)
    const  { email, idObj }  = req.query;
    Objetivo.find({ _id: idObj, emailAssociated: email }).exec()
        .then( (objetivo) => {
            if(objetivo) res.status(200).send(objetivo[0])
            else res.status(404).send({ message : 'Not found'})
        })
        .catch( (err) => {
            res.status(400).send(err)
        })
});



//Retorna las tareas asociadas a un objetivo especifico por usuario
//Se debe pasar por Query Params email del usuario y _id del objetivo
app.get('/objetivos/usuario/tasks', (req, res) => {
    console.log(req.query);
    const  { email, idObj }  = req.query;
    Objetivo.find({ emailAssociated: email, _id: idObj }).exec()
        .then( (objetivo) => {
            if(objetivo) res.status(200).send(objetivo[0].tasks)
            else res.status(404).send({ message : 'Not found'})
        })
        .catch( (err) => {
            res.status(400).send(err)
        })
});


//5.- Retorna una tarea especifica de un objetivo con email como autenticacion
app.get('/objetivos/usuario/tasks/:task', (req, res) => {
    console.log(req.query);
    console.log(req.params);
    const  { email, idObj }  = req.query;
    const task = req.params.task;
    Objetivo.findOne({ emailAssociated: email, _id: idObj})
        .exec()
        .then( (objetivo) => {
            if(objetivo) res.status(200).send(objetivo.tasks.id(task))
            else res.status(404).send({ message : 'Not found'})
        })
        .catch( (err) => {
            res.status(400).send(err)
        })
});

//DELETE
/**
 * Operaciones DELETE
 * 1.- Eliminar un objetivo completo con todas sus tareas
 * 2.- Eliminar una tarea especifica de un objetivo
 */

app.delete('/objetivos/usuario/tasks/:task', (req, res) =>{
    const task = req.params.task;
    const  { email, idObj }  = req.query;
    Objetivo.findOneAndUpdate({ emailAssociated: email, _id: idObj}, {
        '$pull': {
            'tasks':{ '_id': task }
        }
    })
    .exec()
    .then(objetivoUpdated => {
        if(objetivoUpdated) res.status(200).send(objetivoUpdated)
        else res.status(404).send({ message : 'Not found'})
    })
    .catch( (err) => {
        res.status(400).send(err)
    })
    
});

app.listen(3000, () => {    
    console.log('Server on')
});