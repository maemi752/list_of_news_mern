const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const postRouter = require('./routes/post.routes')
const authRouter = require('./routes/auth.routes')
const cors = require("cors")

const app = express()
const PORT = config.get('serverPort')

app.use(express.json())
app.use(cors())
app.use("/auth", authRouter)
app.use("/posts", postRouter)

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

const start = async() => {
    try {
        await mongoose.connect(config.get('dbUrl'))

        app.listen(PORT, () => {
            console.log('Server started on port', PORT)
        } )
    } catch(e) {        
    }
}

start()