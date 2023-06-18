module.exports = (seq,DataTypes)=>{
    const Book = seq.define('Boook', {
        name: {
          type: DataTypes.STRING,
          allowNull: false
        },
        author: {
          type: DataTypes.STRING
        }
      }, {}
    );
    return Book
}