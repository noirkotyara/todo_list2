const {Router} = require('express')
const List = require('../model/List')
const Users = require('../model/Users')
const route = Router()
const authMiddleware = require('./../middlewares/auth-middleware')

route.get('/lists', authMiddleware, async (req, res) => {
    try{
        const user = req.user
        await List.find({ owner: user.userId }).sort([['order', -1]]).exec((err, docs) => {
            if(err) return res.status(500).json({message: `Error: ${err}`})
            docs.forEach(doc => {
                doc.owner = null
            })
            res.status(200).json(docs)
        });
        
    } catch(e) {
        res.status(400).json({message: `Error:  ${e.message}`})
    }
})

route.post('/lists', authMiddleware, async (req, res) => {
    try {
        const body = req.body
        const user = req.user
        const thisUser = await Users.findById(user.userId)
        let increment = thisUser.sequence + 1
        await Users.findByIdAndUpdate(user.userId, {sequence: increment}, {sequence: increment},  (err, todo) => {
            if (err) return res.status(500).json({message: `Error: ${err}`})
        })
        const newList = new List({title: body.title, owner: user.userId, order: increment})
        await newList.save()
        const findCreatedList = await List.findById(newList.id)
        findCreatedList.owner = null
        return res.status(201).json(findCreatedList)
    } catch (e) {
        res.status(400).json({message: `Error: ${e.message}`})
    }
})

route.delete('/lists/:todolistid', authMiddleware, async (req, res) => {
    try {
        const todoListId = req.params.todolistid
        List.findByIdAndRemove(todoListId, (err, todo) => { 
            if(err) return res.status(500).json({message: `Error: ${err}`})
            res.status(200).json({message: `Title '${todo.title}' deleted`})
         })
    } catch (e) {
        res.status(400).json({message: `Error: ${e.message}`})
    }
})

route.put('/lists/:todolistid', authMiddleware, async (req, res) => {
    try {
        const todoListId = req.params.todolistid
        const body = req.body
        
        List.findByIdAndUpdate(todoListId, req.body, {title: body.title}, (err, todo) => {
            if (err) return res.status(500).json({message: `Error: ${err}`})
            res.status(200).json({message: `Title '${todo.title}' updated to '${body.title}'`})
        })
        
    } catch (e) {
        res.status(400).json({message: `Error: ${e.message}`})
    }
})

route.put('/lists/:todolistid/reorder', authMiddleware, async (req, res) => {
    try {
        const todoListId = req.params.todolistid
        
        const body = req.body // putAfterItemId
        
        const firstList = await List.findById({_id: todoListId , owner: body.userId})
        const secondList = await List.findById({_id: body.putAfterItemId , owner: body.userId})
        const firstOrder = firstList.order
        const secondOrder = secondList.order

        await List.findByIdAndUpdate({_id: todoListId , owner: body.userId}, {order: secondOrder},  {order: secondOrder}, (err, todo) => {})
        await List.findByIdAndUpdate({_id: body.putAfterItemId , owner: body.userId}, {order: firstOrder},  {order: firstOrder}, (err, todo) => {})

        res.status(200).json({message: `Lists are changed`})
    } catch (e) {
        res.status(400).json({message: `Error: ${e.message}`})
    }
})

module.exports = route;