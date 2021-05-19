const express = require('express')
const app = express()

const mongoose = require('mongoose')

app.set('view engine', 'ejs')
app.use(express.static('public'))

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

const fileUpload = require('express-fileupload')
app.use(fileUpload())

mongoose.connect('mongodb://localhost/users_database', {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true});

// Users Schema

const usersSchema = {
    firstname: String,
    lastname: String,
    username: String,
    email: String,
    DOB: String,
    image: String,
    tel: String,
    datePosted: {
        type: Date,
        default: new Date()
    }
}

const User = mongoose.model('User', usersSchema)

app.get('/', function (req, res) {
    User.find({}, function (err, users) {
        res.render('index', {
            usersList: users
        })
    })
})

app.get('/users', function (req, res) {
    res.render('users')
})

app.post('/users', function (req, res) {
    let newUser = new User ({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        DOB: req.body.DOB,
        image: req.body.image,
        tel: req.body.tel
    });
    newUser.save();
    res.redirect('/')
})

app.listen(5000, ()=>{
    console.log("Server listening on port 5000");
})
