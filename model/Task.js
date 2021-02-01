const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    description: {type: String, required: true},
    title: {type: String, required: true},
    priority: {type: Number, required: true},
    completed: {type: Boolean, required: true},
    startDate: {type: Date, default: Date.now},
    deadline: {type: Date, default: Date.now},
    order: {type: Number, default: 0},
    listId: {type: Types.ObjectId, ref: 'List'}, //todoListId
})

module.exports = model('List', schema)