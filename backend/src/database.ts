const { Sequelize } = require('sequelize');
const keys = require("./keys");

const dbConnection = async () => {
  const sequelize = new Sequelize('ventas_inyectados', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    logging: false,                        // Disables logging
  });
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

class Database {
    
  public sequelize: any;

  constructor(){
    this.sequelize = new Sequelize('ventas_inyectados', 'root', '', {
      host: 'localhost',
      dialect: 'mariadb',
      logging: false,                        // Disables logging
    });
  }

  public async dbConnection(): Promise<void>{
    try {
      await this.sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }

  public getSequelize(): any{
    return this.sequelize;
  }
}

export default new Database;