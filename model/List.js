const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
    listId: {type:Types.ObjectId, unique: true},
    title: {type: String, required: true},
    addedData: {type: Date, default: Date.now},
    order: {type: Number, default: 0},
    owner: {type: Types.ObjectId, ref: 'User'},
    tasks: [{type: Types.ObjectId, ref:'Task'}]
})
// $inc: { seq: 1}

module.exports = model('List', schema)
