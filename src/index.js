const express = require('express');

const app = express()
const PORT = 3001;
app.use(express.json())
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})

const userList = [
    {
        id: 1,
        name: "Christian"
    },
    {
        id: 2,
        name: "Winonna"
    }
]

app.get('/users', 
    (req, res, next) => {
        console.log("Middleware test")
        next();
    },
    (req, res) => {
        res.send(userList)
    }
)

app.post('/users', (req, res) => {
    console.log(req.body)
    userList.push(req.body)
    res.send(201)
})