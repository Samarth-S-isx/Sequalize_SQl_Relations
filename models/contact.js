module.exports = (seq,DataTypes)=>{
    const Contact = seq.define('Contact', {
        address1: {
          type: DataTypes.STRING,
          allowNull: false
        },
        address2: {
          type: DataTypes.STRING
        },
        user_id:{
          type: DataTypes.INTEGER
        }
      }, {}
    );
    return Contact
}