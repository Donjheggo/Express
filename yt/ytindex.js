const express = require('express');

const app = express();
const PORT = 3001;

app.listen(PORT, () => console.log(`Server running at PORT ${PORT}`));
app.use(express.json())
app.use(express.urlencoded())


const userList = [
    {
        id: 1,
        name: 'Christian Jhegg'
    },
    {
        id: 2,
        name: 'Winonna Jane'
    },
    {
        id: 3,
        name: 'John Paul'
    }
]

app.get('/users', (req, res) => {
    res.send(userList);
});


app.post('/users', (req, res) => {
    console.log(req.body);
    userList.push(req.body)
    res.send(201);
})