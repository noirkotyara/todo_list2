const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    sequence:{type: Number, default: 0},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    lists: [{type: Types.ObjectId, ref:'List'}]
})

module.exports = model('User', schema)