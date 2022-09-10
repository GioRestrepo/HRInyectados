import sequelizeDb from "../database";
import { DataTypes, Model } from 'sequelize';
const sequelize = sequelizeDb.getSequelize();
import Cliente from "./clientesModel";

class Venta extends Model {
  id: any;
}

const doModelSync = async () =>{
  try {
    Venta.init({
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      idCli: {
        type: DataTypes.INTEGER,
        references: {
            model: Cliente,
            key: 'id'
          }
      }
    }, {
      sequelize, // We need to pass the connection instance
      modelName: 'Ventas' // We need to choose the model name
    });
    
    Venta.belongsTo(Cliente, {
      foreignKey: "idCli"
    })
    Cliente.hasMany(Venta, {
      foreignKey: "idCli"
    });
    
    await Venta.sync();
  } catch (error) {
    console.log(`Error Tabla Venta: ${error}`);    
  }
}

doModelSync();

export default Venta;