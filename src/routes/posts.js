const {Router} = require('express');

const router = Router()

const postList = [
    {
        id: 1,
        ownerID: 1,
        post: "Test One",
        likes: 5,
    },
    {
        id: 2,
        ownerID: 2,
        post: "Test Two",
        likes: 7,
    },
    {
        id: 3,
        ownerID: 3,
        post: "Test Three",
        likes: 3,
    },
]

router.get("/", (req, res) => {
    const likesQuery = req.query.likes
    const likes = parseInt(likesQuery)
    if(!isNaN(likes)){
        const filteredPost = postList.filter(data => data.likes === likes)
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