const express = require ('express')
const app = express();
const port = 3000
require('./models/connection');
const bodyParser = require('body-parser');
const userController = require('./controllers/userController')
const imageController = require('./controllers/imageController')
const auth = require('./middleware/auth')
const path = require('path')
const fileUpload = require('./middleware/file-upload')

app.use('/uploads/images',express.static(path.join('uploads','images')))
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/",(req,res)=>{
    res.send("HomePage")
})

app.post('/login',userController.loginUser);
app.post('/register',userController.registerUser);
app.post('/auth',userController.authUser);
app.get('/user/:id',auth.isAuthentiated, userController.getUserById)

app.post('/upload',fileUpload.single('image'),imageController.uploadImage)
app.get('/show/:id',imageController.showImage)

app.use((req,res,next)=>{
    const error = new Error('Could not find the url');
    error.code= 404
    throw error
})

app.use((error,req,res,next)=>{
    if(res.headerSent){
        return next(error)
    }
    res.status(500||error.code).json({message:error.message||'An unknown error occurred'})
})

app.listen(port,()=>{
    console.log("listening")
})