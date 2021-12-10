const express = require("express")
const cors = require("cors")
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const postRoute = require("./routes/posts")
const verifyJWT = require('./middleware/tokenVerify')

dotenv.config()

var PORT = require('./config.json').PORT

const app = express()

//********** Middleware ************************
app.use(cors())
app.use(express.json())
app.use(helmet())
app.use(morgan("common"))
app.use(cookieParser())


//*********** Development routes ***************
app.get('/api/check', (req, res) => {

    res.status(200).json("Hello from backend")
})

app.get('/api/tokenCheck', verifyJWT, (req, res) => {
    console.log(req.user_id)
    res.status(200).json({ message: "Token checked", user_id: req.user_id })
})

//*************** Routes ***********************
app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)


//*************** MongoDB Connection ***********
try {
    mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log("Connected to mongo"))
        .catch(err => console.log(err))
} catch (e) {
    console.log(e)
}



app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})