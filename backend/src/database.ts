import mysql from "mysql2";
//const {promisify} = require("util");
const keys = require("./keys");

const pool = mysql.createPool(keys);


pool.getConnection(function(err,conn){
    console.log('DB is conected')
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

export default pool;