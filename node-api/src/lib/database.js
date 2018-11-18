const db = require('../config').db;
const sql = require('mssql');


function config() {

  return {
    server   : db.server,
    user     : db.username,
    password : db.password,
    database : db.name,
    encrypt  : db.encrypt,
    pool : {
      min: db.minConn,
      max: db.maxConn,
      idleTimeoutMillis: db.idleConnTimeout
    },
    requestTimeout           : db.timeout,
    acquireConnectionTimeout : db.acquireConnTimeout,
  };

}

let pool = null;

const self = module.exports = {

  sql, 
  
  /**
   * async pool - Retrieves the current connection pool. If no pool has been
   * created one is created first.
   *
   * @param  {boolean} refresh = false Optional - Forces the creation of a connection
   * pool
   * @return {object}                 Connection pool
   */
  async pool(refresh = false) {

    if (refresh || !pool) {
      try {
        const connections = new sql.ConnectionPool(config());
        pool = await connections.connect();
      }
      catch (err) {
        console.error(err);
      }
    }

    return pool;

  },

  /**
   * async transaction - Executes a function passing it a transaction to
   * use. After the function executes the transaction is automatically
   * commited. If an error is thrown the transaction is automically
   * rolled back.
   *
   * @param  {func} scope A function that will be passed a transaction and
   * should return a Promise. If the promise rejects the transaction is rolled
   * back, otherwise it is committed.
   * @return {Promise}    A promise that represents the result of the
   * passed in function.
   */
  async transaction(scope = async (trx) => {}) {

    return self.pool()
      .then(conn => new sql.Transaction(conn))
      .then(trx =>

        scope(trx)
          .then(result =>

            trx.commit()
              .then(() => result)

          )
          .catch(err => {

            trx.rollback();
            return Promise.reject(err);

          })

      )
    ;

  },

  /**
   * async query - Creates a sql request object bound to either a transaction or
   * if ommitted, to the existing connection pool.
   *
   * @param  {object} [connection] optional sql.Connection or sql.Transaction
   * @return {object}            sql.Request
   */
  async request(connection) {

    const conn = (connection || await self.pool());
    return new sql.Request(conn);

  },

  /**
   * close - Closes the existing connection pool
   *
   */
  close() {

    if (pool) {
      pool.close();
      pool = null;
    }

  }

};
