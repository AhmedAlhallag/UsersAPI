const express = require("express")
const app = express()
var timeout = require('connect-timeout')
app.use(timeout('400s'))
app.use(haltOnTimedout)

require('dotenv').config();
app.use(express.json()); // to return a json object instead of javascript object 

const usersRouter = require("./api/user/user.router");

app.use(express.static('public'))
app.set('view engine', 'html');


app.get("/api", (req, res) => {
    res.json({
        success: 1,
        message: "This meesage is returned from a rest API endpoint"
    })
})

app.use('/api/users', usersRouter)


// app.get('/edit/:id', function (req, res) {

//     res.render('edit');

// })

function haltOnTimedout(req, res, next) {
    if (!req.timedout) next()
}
app.listen(process.env.APP_PORT, () => {
    console.log("This server is working on port: ", process.env.APP_PORT)
})