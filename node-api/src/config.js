const defaults = {
    port    : 3000,
    host    : '0.0.0.0'
};
 
const db = {
    client            : process.env.DB_CLIENT || 'mssql',
    name              : process.env.DB_NAME || 'hospital',
    username          : process.env.DB_USERNAME || 'hospital-dbo',
    password          : process.env.DB_PASSWORD || 'hospital-dbo',
    server            : process.env.DB_SERVER || 'localhost',
    port              : process.env.DB_PORT || 1433,
    maxConn           : process.env.DB_MAX_CONNECTIONS || 10,
    minConn           : process.env.DB_MIN_CONNECTIONS || 2,
    timeout           : process.env.DB_TIMEOUT || 5000,
    acquireConnTimeout: process.env.DB_AQUIRE_CONN_TIMEOUT || 20000,
    idleConnTimeout   : process.env.DB_IDLE_CONN_TIMEOUT || 30000,
    encrypt           : !!process.env.DB_ENCRYPT,
};
console.log(db);

module.exports = {
    db
};