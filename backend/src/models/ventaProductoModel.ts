import sequelizeDb from "../database";
import { DataTypes, Model } from 'sequelize';
const sequelize = sequelizeDb.getSequelize();
import Ventas from "./ventasModel";
import Productos from "./productosModel";

class VentaProducto extends Model {
}
  
  const doModelSync = async () =>{
    try {
        VentaProducto.init({
        idVent: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          references: {
            model: Ventas,
            key: 'id'
          }
        },
        idProd: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          references: {
            model: Productos,
            key: 'id'
          }
        }
      }, {
        sequelize, // We need to pass the connection instance
        modelName: 'venta_product' // We need to choose the model name
      });
      
      VentaProducto.belongsTo(Ventas, {
        foreignKey: "idVent"
      })
      VentaProducto.belongsTo(Productos, {
        foreignKey: "idProd"
      })
      Productos.hasMany(VentaProducto, {
        foreignKey: "idProd"
      });
      Ventas.hasMany(VentaProducto, {
        foreignKey: "idVent"
      });
      await VentaProducto.sync();
    } catch (error) {
      console.log(`Error Tabla ventas: ${error}`);    
    }
  }
  
  doModelSync();
  
  export default VentaProducto;