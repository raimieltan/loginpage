const express = require('express')
const session = require('express-session')
const path = require('path')


const app = express()

const loginCreds = {

    usermame: "johnsmith",
    password: "1234"

}


app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'))
})

app.post('/auth', (req, res) => {
    let username = req.body.username
    let password = req.body.password

    if (username && password) {

        if (username === loginCreds['usermame'] && password === loginCreds['password']) {
            req.session.loggedin = true;
            req.session.username = username

            res.redirect('/home')
        }

        else {
            console.log(req.body)
            console.log(data)
            res.send('Wrong username and password');

        }

        res.end();

    }
    else {
        res.send('Please enter Username and Password!');
        res.end();
    }
})


app.get('/home', function (request, response) {

    if (request.session.loggedin) {

        response.send('Welcome back, ' + request.session.username + '!');
    } else {

        response.send('Please login to view this page!');
    }
    response.end();
});

app.listen(8000, () =>
    console.log("🚀 Server started on http://localhost:8000 🚀")
);