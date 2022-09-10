import sequelizeDb from "../database";
import { DataTypes, Model } from 'sequelize';
const sequelize = sequelizeDb.getSequelize();

class Productos extends Model {
  id: any;
  idProd: any;
  nombre: any;
  valor: any;
  }
  
  const doModelSync = async () =>{
    try {
      Productos.init({
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        nombre: {
          type: DataTypes.STRING,
          allowNull: false
        },
        valor: {
          type: DataTypes.FLOAT,
          allowNull: false
        }  
      }, {
        sequelize, // We need to pass the connection instance
        modelName: 'productos' // We need to choose the model name
      });
      
      await Productos.sync();
    } catch (error) {
      console.log(`Error Tabla productos: ${error}`);    
    }
  }
  
  doModelSync();
  
  export default Productos;