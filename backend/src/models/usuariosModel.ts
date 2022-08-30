import sequelizeDb from "../database";
import { DataTypes, Model } from 'sequelize';
const sequelize = sequelizeDb.getSequelize();
class Usuario extends Model {
  // getFullname() {
  //   return [this.nombre, this.apellidos].join(' ');
  // }
}

const doModelSync = async () =>{
  try {
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
    
    await Usuario.sync();
  } catch (error) {
    console.log(`Error Tabla Usuarios: ${error}`);    
  }
}

doModelSync();

export default Usuario;