const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    title: {type: String, required: true},
    addedDate: {type: Date, default: Date.now},
    order: {type: Number, default: 0},
    sequence:{type: Number, default: 0},
    owner: {type: Types.ObjectId, ref: 'User'},
    tasks: [{type: Types.ObjectId, ref:'Task'}]
})


module.exports = model('List', schema)
