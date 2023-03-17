const {Router} = require('express');

const router = Router()

const postList = [
    {
        id: 1,
        ownerID: 1,
        post: "Test One"
    },
    {
        id: 2,
        ownerID: 2,
        post: "Test Two"
    },
]

router.get("/", (req, res) => {
    res.send(postList)

})

router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const item = postList.find(data => data.id === id)
    res.send(item)
})

router.post("", (req, res) => {
    postList.push(req.body)
    res.send(postList)
    res.send(201)
})

module.exports = router