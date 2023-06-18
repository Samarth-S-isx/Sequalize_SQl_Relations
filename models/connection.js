const { Sequelize,DataTypes } = require('sequelize');

const sequelize = new Sequelize('test', 'root', 'r@@t1234', {
    host: 'localhost',
    dialect: 'mysql',
    port:3306,
    logging:false
  });

  sequelize.authenticate()
.then(()=>{
    console.log("connnected")
})
.catch((err)=>{
    console.log("errorr",err)
})

const db={}
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require('./user')(sequelize,DataTypes)
db.contact = require('./contact')(sequelize,DataTypes)
db.order = require('./order')(sequelize,DataTypes)
db.book = require('./book')(sequelize,DataTypes)
db.join_table = require('./join_table')(sequelize,DataTypes,db.user,db.book)

// one to one
db.user.hasOne(db.contact,{foreignKey:'user_id'})
db.contact.belongsTo(db.user)


// one to many
db.user.hasMany(db.order,{foreignKey:'user_id'})
db.order.belongsTo(db.user)

// many to many
db.user.belongsToMany(db.book,{through:db.join_table, foreignKey: 'user_Id',otherKey: 'book_Id'})
db.book.belongsToMany(db.user,{through:db.join_table, foreignKey: 'book_Id',otherKey: 'user_Id'})


sequelize.sync({force:false})


module.exports = db

