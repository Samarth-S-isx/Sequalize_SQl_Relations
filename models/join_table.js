const db = require('./connection')

module.exports = (seq,DataTypes,book,user)=>{
    const joinTable = seq.define('joinTable', {
        user_Id: {
          type: DataTypes.INTEGER,
          references: {
            model: user, // 'Movies' would also work
            key: 'id'
          }
        },
        book_Id: {
          type: DataTypes.INTEGER,
          references: {
            model: book, // 'Movies' would also work
            key: 'id'
          }
        }
      }, {}
    );
    return joinTable
}