module.exports = (seq,DataTypes)=>{
    const Image = seq.define('Image', {
        url: {
          type: DataTypes.STRING
        }}, {}
      );
    return Image;
}