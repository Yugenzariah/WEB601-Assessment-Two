const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.sendFile("/pages/homepage.html", {root: __dirname})
})

app.get('/login', (req, res) => {
    res.send('You are now in the login page!')
})

app.get('/signup', (req, res) => {
    res.send('You are now in the signup page!')
})

app.listen(port, () => {
    console.log(`The note taking web app is listening on port http://localhost:${port}`)
})