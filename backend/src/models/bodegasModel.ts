import sequelizeDb from "../database";
import { DataTypes, Model } from 'sequelize';
const sequelize = sequelizeDb.getSequelize();

class Bodegas extends Model {
    // getFullname() {
    //   return [this.nombre, this.apellidos].join(' ');
    // }
  }
  
  const doModelSync = async () =>{
    try {
      Bodegas.init({
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true
        },
        nombre: {
          type: DataTypes.STRING,
          allowNull: false
        } 
      }, {
        sequelize, // We need to pass the connection instance
        modelName: 'Bodegas' // We need to choose the model name
      });
      
      await Bodegas.sync();
    } catch (error) {
      console.log(`Error Tabla bodegas: ${error}`);    
    }
  }
  
  doModelSync();
  
  export default Bodegas;