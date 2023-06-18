const express = require ('express')
const app = express();
const port = 3000
require('./models/connection');
const userController = require('./controllers/userController')

app.get("/",(req,res)=>{
    res.send("HomePage")
})

app.get('/create',userController.createAUser);

// one to one
app.get('/onetoone',userController.oneToOne)


// onetomany
app.get('/onetomany',userController.oneToMany)


// manytomany
app.get('/manytomany',userController.manyToMany)

app.listen(port,()=>{
    console.log("listening")
})