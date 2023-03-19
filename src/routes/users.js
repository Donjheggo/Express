const {Router} = require('express')

const router = Router()

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

///// CHECK IF USER IS AUTHENTICATED //////
router.use((request, response, next) => { 
    console.log("UserList Auth Check Middleware")
    console.log(request.user)
    if (request.user) next();
    else response.sendStatus(401);
})

router.get(
        '', 
        (request, response, next) => {
            console.log("Middleware test")
            next();
        },
        (request, response, next) => {
            response.cookie('visited', true, {
                maxAge: 10000
            })
            response.send(userList)
        }
        
        )

router.get(
    '/:id',
    (request, response) => {
        const id = parseInt(request.params.id)
        const item = userList.find(data => data.id === id)
        console.log(request.cookies)
        response.send(item)
    }
    )


router.post(
        '', 
        (request, response, next) => { 
        console.log("Middleware test")
        next();
        },
        (request, response, next) => {
            console.log(request.body)
            userList.push(request.body)
            response.sendStatus(201)
        }
    )



module.exports = router;