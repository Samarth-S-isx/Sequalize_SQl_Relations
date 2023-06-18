const db = require('../models/connection')
const User = db.user
const Contact = db.contact
const Order = db.order
const Book = db.book
const joinTable = db.join_table
const createAUser=async(req,res)=>{
    const newUser = await User.create({ firstName: "Jane",lastName:"Maria" })
    res.json({
        newUser
    })
}

const oneToOne = async(req,res)=>{
    // var data = await User.create({firstName:"X",lastName:"Y"})
    // if(data && data.id){
    //     await Contact.create({address1:"M",address2:"N",user_id:data.id})
    // }
    var data = await User.findAll({
        include:Contact
    })


    res.json({
        data:data
    })
}


const oneToMany = async(req,res)=>{
    // var data = await Order.create({productName:"P2",description:"D2",user_id:1})
    var data = await User.findAll({
        include:Order
    })
    res.json({
        data:data
    })
}

const manyToMany=async(req,res)=>{  
    // var data_user = await User.create({firstName:"U1",lastName:"U2"})
    // var data_book = await Book.create({name:"N1",author:"A1"})
    // var data_user = await User.create({firstName:"U2",lastName:"U4"})
    // var data_book = await Book.create({name:"N2",author:"A2"})
    // var join_table_data = await joinTable.create({user_Id:data_user.id,book_Id:data_book.id})

    // const user = await User.findByPk(2);
    // const book = await Book.findByPk(1);
    // var join_table_data = await joinTable.create({user_Id:user.id,book_Id:book.id})

    // var data = await User.findAll({
    //     include:Book
    // })
    var data = await Book.findAll({
        include:User
    })

    res.json({
        data
    })
}

module.exports = {createAUser,oneToOne,oneToMany,manyToMany}