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


sequelize.sync({force:false})


module.exports = db

