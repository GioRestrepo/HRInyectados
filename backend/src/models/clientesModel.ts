import sequelizeDb from "../database";
import { DataTypes, Model } from 'sequelize';
const sequelize = sequelizeDb.getSequelize();
class Cliente extends Model {
  // getFullname() {
  //   return [this.nombre, this.apellidos].join(' ');
  // }
}

const doModelSync = async () =>{
  try {
    Cliente.init({
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
        allowNull: false,
      },
      telefono: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      documento: {
        type: DataTypes.INTEGER,
        allowNull: false
      }     
    }, {
      sequelize, // We need to pass the connection instance
      modelName: 'clientes' // We need to choose the model name
    });
    
    await Cliente.sync();
  } catch (error) {
    console.log(`Error Tabla clientes: ${error}`);    
  }
}

doModelSync();

export default Cliente;