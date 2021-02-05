const config = require('config')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const authRoutes = require('./routes/Auth.routes')
const todoRoutes = require('./routes/Todo.routes')
const tasksRoutes = require('./routes/Tasks.routes')

let app = express();

const PORT = process.env.PORT || config.get('port')

app.use(express.json({ extended: true }))
app.use('/api/auth', authRoutes)
app.use('/api/todo', todoRoutes)
app.use('/api/tasks', tasksRoutes)
app.use(cors())

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || config.get('mongoURI'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        app.listen(PORT, () => {
            console.log(`App listening at http://localhost:${PORT}`)
        })

    }
    catch (e) {
        console.log(`Ooops it is Server Error ${e.message}`)
        process.exit(1);
    }
}

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

start();