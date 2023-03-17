const {Router} = require('express');

const router = Router()

const postList = [
    {
        id: 1,
        ownerID: 1,
        post: "Test One",
        comments: 5,
    },
    {
        id: 2,
        ownerID: 2,
        post: "Test Two",
        comments: 7,
    },
    {
        id: 3,
        ownerID: 3,
        post: "Test Three",
        comments: 3,
    },
]

router.get("/", (req, res) => {
    const commentsQuery = req.query.comments
    const comments = parseInt(commentsQuery)
    if(!isNaN(comments)){
        const filteredPost = postList.filter(data => data.comments === comments)
        res.send(filteredPost)
    }else{
        res.send(postList)
    }
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