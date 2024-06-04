const express = require('express')
const mongoose = require('mongoose')
const mongoURI ="mongodb://localhost:27017/"
const app = express()
// Use middleware for body parser
app.use(express.json({extended: true}))
app.use(express.urlencoded())
const port = 3000

const connectToMongo = async() => {
    try{
        mongoose.set("strictQuery", false)
        mongoose.connect('mongodb+srv://Keith:WEB601-Assessment-Two@note-taking-web-applica.51gui5q.mongodb.net/')
        console.log("Connected to MongoDB Successfully!")
    } catch (error){
        console.log(error)
    }
}

// Endpoints to serve user interface
app.get('/', (req, res) => {
    res.sendFile("/pages/homepage.html", {root: __dirname})
})

app.get('/login', (req, res) => {
    res.sendFile("/pages/login.html", {root: __dirname})
})

app.get('/signup', (req, res) => {
    res.sendFile("/pages/signup.html", {root: __dirname})
})

// Endpoints for APIs
app.post('/getnotes', (req, res) => {
    // Using json webtoken for user authentication
    const {userToken} = req.body
    res.sendFile("/pages/signup.html", {root: __dirname})
})

app.post('/login', (req, res) => {
    const {userToken} = req.body
    res.sendFile("/pages/signup.html", {root: __dirname})
})

app.post('/signup', (req, res) => {
    const {userToken} = req.body
    res.sendFile("/pages/signup.html", {root: __dirname})
})

app.post('/addnote', (req, res) => {
    const {userToken} = req.body
    res.sendFile("/pages/signup.html", {root: __dirname})
})

app.post('/deletenote', (req, res) => {
    const {userToken} = req.body
    res.sendFile("/pages/signup.html", {root: __dirname})
})

app.listen(port, () => {
    console.log(`The note taking web app is listening on port http://localhost:${port}`)
})

module.exports = connectToMongo;