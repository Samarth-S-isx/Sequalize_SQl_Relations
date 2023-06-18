module.exports = (seq,DataTypes)=>{
    const User = seq.define('User', {
        firstName: {
          type: DataTypes.STRING,
          allowNull: false
        },
        lastName: {
          type: DataTypes.STRING
        }
      }, {}
    );
    return User
}