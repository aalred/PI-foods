const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    summary:{
      type:DataTypes.TEXT,
      allowNull:false,
    },
    healthScore:{
      type:DataTypes.INTEGER,
    },
    instructions: {
      type: DataTypes.TEXT,
    },
    virtualID:{
      type: DataTypes.VIRTUAL,
      get(){
        return this.id + 'B';
      }
    },
  },
  {
    createdAt: true,
    updatedAt: false
  });
}
