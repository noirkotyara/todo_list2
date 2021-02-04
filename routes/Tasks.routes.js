const {Router} = require('express')
const List = require('../model/List')
const Users = require('../model/Users')
const Task = require('../model/Task')
const route = Router()
const authMiddleware = require('./../middlewares/auth-middleware')


route.get('/:todolistid/tasks', authMiddleware, async (req, res) => {
    try{   
        const todolistId = req.params.todolistid
        const user = req.user //userId
        await Task.find({ listId: todolistId, owner: user.userId }).sort([['order', -1]]).exec((err, docs) => {
            if(err) return res.status(500).json({message: `Error: ${err}`})
            docs.forEach(doc => {
                doc.owner = null
            })
            res.status(200).json(docs)
        })
        
    } catch(e) {
        res.status(400).json({message: `Error: ${e.message}`})
    }
})

route.post('/:todolistid/tasks', authMiddleware, async (req, res) => {
    try {
        const body = req.body
        const user = req.user
        const todolistId = req.params.todolistid
        const thisList = await List.findById({_id: todolistId, owner: user.userId})
        let increment = thisList.sequence + 1
        await List.findByIdAndUpdate(todolistId, {sequence: increment}, {sequence: increment},  (err, todo) => {
            if (err) return res.status(500).json({message: `Error: ${err}`})
        })
        const newTask = new Task({title: body.title, owner: user.userId, listId: todolistId, order: increment})
        await newTask.save()
        const findCreatedTask = await Task.findById({_id: newTask.id, listId: todolistId, owner: user.useId })
        findCreatedTask.owner = null
        return res.status(201).json(findCreatedTask)
    } catch (e) {
        res.status(400).json({message: `Error: ${e.message}`})
    }
})

route.delete('/:todolistid/tasks/:taskid', authMiddleware, async (req, res) => {
    try {
        const todoListId = req.params.todolistid
        const taskId = req.params.taskid
        const user = req.user
        Task.findByIdAndRemove({_id: taskId , listId: todoListId, owner: user.userId}, (err, todo) => { 
            if(err) return res.status(500).json({message: `Error: ${err}`})
            res.status(200).json({message: `Title '${todo.title}' deleted`})
         })
    } catch (e) {
        res.status(400).json({message: `Error: ${e.message}`})
    }
})

route.put('/:todolistid/tasks/:taskid', authMiddleware, async (req, res) => {
    try {
        const todoListId = req.params.todolistid
        const taskId = req.params.taskid
        const user = req.user
        const {title, completed, deadline, description} = req.body
        
        const updatedTask = await Task.findByIdAndUpdate({_id: taskId , listId: todoListId, owner: user.userId}, req.body, {title, completed, deadline, description}, (err, todo) => {
            if (err) return res.status(500).json({message: `Error: ${err}`})
        })
        updatedTask.owner = null
        res.status(200).json({message: `Updated successfully`, updatedTask})
    } catch (e) {
        res.status(400).json({message: `Error: ${e.message}`})
    }
})
//-----------------------
route.put('/:todolistid/tasks/:taskid/reorder', authMiddleware, async (req, res) => {
    try {
        const todoListId = req.params.todolistid
        const taskId = req.params.taskid
        const body = req.body // putAfterItemId
        const user = req.user
        
        const firstTask = await Task.findById({owner: user.userId, listId: todoListId , _id: taskId})
        const secondTask = await Task.findById({owner: user.userId, listId: todoListId, _id: body.putAfterItemId })
        const firstOrder = firstTask.order
        const secondOrder = secondTask.order
        
        await Task.findByIdAndUpdate({owner: user.userId, listId: todoListId , _id: taskId}, {order: secondOrder},  {order: secondOrder}, (err, todo) => {})
        await Task.findByIdAndUpdate({owner: user.userId, listId: todoListId , _id: body.putAfterItemId}, {order: firstOrder},  {order: firstOrder}, (err, todo) => {})

        res.status(200).json({message: `Tasks are changed`})
    } catch (e) {
        res.status(400).json({message: `Error: ${e.message}`})
    }
})

module.exports = route;