const jwt = require('jsonwebtoken')
module.exports = (seq,DataTypes)=>{
    const User = seq.define('User', {
        mobile_number: {
            type: DataTypes.INTEGER,
            unique:true,
            validate: {
                isInt: true,
                len: [10, 10]
            }
        },
        name: {
          type: DataTypes.STRING
        },
        otp:{
            type:DataTypes.STRING
        }
      }, {}
      );
      User.prototype.getJwtToken  = function () {
        return jwt.sign({id:this.mobile_number},'DEDEJIDSDSFEFDSC84511812CDC',{
            expiresIn:'7d'
        });
    };
    return User;
}