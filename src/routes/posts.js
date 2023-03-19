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

///// CHECK IF USER IS AUTHENTICATED //////
router.use((request, response, next) => { 
    console.log("Posts Auth Check Middleware")
    console.log(request.user)
    if (request.user) next();
    else response.sendStatus(401);
})


router.get("/", (request, response) => {
    const likesQuery = request.query.likes
    const likes = parseInt(likesQuery)
    if(!isNaN(likes)){
        const filteredPost = postList.filter(data => data.likes === likes)
        response.send(filteredPost)
    }else{
        response.send(postList)
    }
})


router.get("/:id", (request, response) => {
    const id = parseInt(request.params.id)
    const item = postList.find(data => data.id === id)
    response.send(item)
})


router.post("/", (request, response) => {
    postList.push(request.body)
    response.send(postList)
    response.sendStatus(201)
})

router.get("/library/saves", (request, response) => {
    const {saves} = request.session;
    if(!saves){
        response.send('You have no save post/s')
    }else{
        response.send(saves)
    }
});

router.post("/library/saves/post", (request, response) => {
    const {id, post} = request.body;
    const postItem = {id, post};
    const { saves } = request.session;
    if(saves){
        request.session.saves.items.push(postItem)
    }else{
        request.session.saves = {
            saves: [postItem]
        };
    }
    response.send(201)
})


module.exports = router