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
    },

    obstacles:{
        type:String,
    },
    typeObjective: {
        type: String,
        enum: ['academic', 'professional', 'fitness', "mind", "social", "cultural", "relationship"] 
                                                          
    },

    lenght: {
        type:String,
        enum: ["short", "medium", "long"]
    },
    isCompleted:{
        type:Boolean,
        required: true,
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
                type:Number,
                min:1,
                max:3,
                required: true,
            },
            frequency: {
                type: String,
                enum:['once', 'everyday', 'everyWeek', 'monday', 'tuesday', 
                'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
                required: true,
            },

            isAcomplished:{
                type:Boolean,
                required: true,
            }

        }]
    }
});

//model(comoSeLlamaraModelo, Schema)
const Objetivo = mongoose.model('Objetivo', schemaObjetivo);

module.exports = Objetivo;
