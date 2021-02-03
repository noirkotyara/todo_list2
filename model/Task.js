const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    description: {type: String, default: 'description of your task is here'},
    title: {type: String, required: true},
    // priority: {type: Number, required: true},
    completed: {type: Boolean, required: true, default: false},
    startDate: {type: Date, default: Date.now},
    deadline: {type: Date, default: Date.now},
    order: {type: Number, default: 0},
    owner: {type: Types.ObjectId, ref: 'User'},
    listId: {type: Types.ObjectId, ref: 'List'}, //todoListId
})

module.exports = model('Task', schema)