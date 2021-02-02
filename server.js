const config = require('config')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const route = require('./routes/Auth.routes')
const PORT = config.get('port')

let app = express();

app.use(express.json({ extended: true }))
app.use('/api/auth', route)
app.use(cors())

const start = async () => {
    try {
        await mongoose.connect(config.get('mongoURI'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        console.log('Database connected');
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