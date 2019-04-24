const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

TaskSchema.pre('save', async function(next){
    const task = this
    console.log('middleware before saving')
})


const Task = mongoose.model('Task', TaskSchema)

module.exports = Task