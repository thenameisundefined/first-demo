const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/mongooseUrl').mongooseUrl;
const user = require('./router/api/user');
const passport = require('passport');
const profile = require('./router/api/profile');
mongoose.connect(db,{
    useNewUrlParser: true,
    useUnifiedTopology: true
    }).then(() => {
        console.log('connect db success');
    })
    .catch((err) => {
        console.log(err);
    })
const app = express();
// body-parse 中间件
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use('/api/user',user);
app.use('/api/profile',profile);
app.use(passport.initialize());
require('./config/passport')(passport);
const port = process.env.port || 5000;
app.listen(port, () => {
    console.log('serve run 5000');
})