import sequelizeDb from "../database";
import { DataTypes, Model } from 'sequelize';
const sequelize = sequelizeDb.getSequelize();
import Bodegas from "./bodegasModel";
import Productos from "./productosModel";

class ProductoBodega extends Model {
  stock: any;
}
  
  const doModelSync = async () =>{
    try {
      ProductoBodega.init({
        idProd: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          references: {
            model: Productos,
            key: 'id'
          }
        },
        idBod: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          references: {
            model: Bodegas,
            key: 'id'
          }
        },
        stock: {
          type: DataTypes.FLOAT,
          allowNull: false,
          defaultValue: 0
        }  
      }, {
        sequelize, // We need to pass the connection instance
        modelName: 'detalle_bodega' // We need to choose the model name
      });
      
      await ProductoBodega.sync();
    } catch (error) {
      console.log(`Error Tabla productos: ${error}`);    
    }
  }
  
  doModelSync();
  
  export default ProductoBodega;