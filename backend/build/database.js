"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
//const {promisify} = require("util");
const keys = require("./keys");
const pool = mysql2_1.default.createPool(keys);
pool.getConnection(function (err, conn) {
    console.log('DB is conected');
    // Connection is automatically released when query resolves
});
/*  pool.getConnection()
    .then(connection => {
        pool.releaseConnection(connection);
        console.log('DB is Connected');
    });
  */
/* pool.getConnection((err, connection) => {
    if (err){
        if (err.code === "PROTOCOL_CONNECTION_LOST"){
            console.error("DATABASE CONNECTION WAS CLOSED");
        }
        if (err.code === "ER_CON_COUNT_ERROR"){
            console.error("DATABASE HAS TO MANY CONNECTION");
        }
        if (err.code === "ECONNREFUSED"){
           console.error("DATABASE CONNECTION WAS REFUSED");
        }
    }

    if(connection) connection.release();
    console.log("DB IS CONNECTED");
    return;
})  */
//pool.query = promisify(pool.query);
exports.default = pool;
