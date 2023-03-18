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

router.get(
        '', 
        (req, res, next) => {
            console.log("Middleware test")
            next();
        },
        (req, res, next) => {
            res.cookie('visited', true, {
                maxAge: 10000
            })
            res.send(userList)
        }
        
        )

router.get(
    '/:id',
    (req, res) => {
        const id = parseInt(req.params.id)
        const item = userList.find(data => data.id === id)
        console.log(req.cookies)
        res.send(item)
    }
    )


router.post(
        '', 
        (req, res, next) => { 
        console.log("Middleware test")
        next();
        },
        (req, res, next) => {
            console.log(req.body)
            userList.push(req.body)
            res.sendStatus(201)
        }
    )



module.exports = router;