import sequelizeDb from "../database";

const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = sequelizeDb.getSequelize;

class Usuario extends Model {}

Usuario.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  apellidos: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }    
}, {
  sequelize, // We need to pass the connection instance
  modelName: 'usuarios' // We need to choose the model name
});

export default Usuario