const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.sendFile("/pages/homepage.html", {root: __dirname})
})

app.get('/login', (req, res) => {
    res.sendFile("/pages/login.html", {root: __dirname})
})

app.get('/signup', (req, res) => {
    res.sendFile("/pages/signup.html", {root: __dirname})
})

app.listen(port, () => {
    console.log(`The note taking web app is listening on port http://localhost:${port}`)
})