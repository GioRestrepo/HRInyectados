import sequelizeDb from "../database";
import { DataTypes, Model } from 'sequelize';
import jwt from "jsonwebtoken";
import moment from "moment";
const sequelize = sequelizeDb.getSequelize();
import keys from "../keys";
class Usuario extends Model {
  public id: any;
  public email: any;
  public nombre: any;
  public apellidos: any;
  public createdAt: any;
  public updatedAt: any;

  public getFullname() {
    return [this.nombre, this.apellidos].join(' ');
  }

  public generateJwt(): any {
    return jwt.sign({
      id: this.id,
      email: this.email,
      fullName: `${this.nombre} ${this.apellidos}`,
      iat: moment().unix(),
    },
    keys.secretsWords.SECRET_KEY_JWT
    )
  }
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
        allowNull: false,
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