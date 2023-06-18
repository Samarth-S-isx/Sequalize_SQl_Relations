module.exports=(seq,DataTypes)=>{
    const Order = seq.define('Orddder', {
        productName: {
          type: DataTypes.STRING,
          allowNull: false
        },
        description: {
          type: DataTypes.STRING
        },
        user_id:{
            type:DataTypes.INTEGER
        }
      }, {}
    );
    return Order
}