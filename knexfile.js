  /**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
  
  module.exports = {
    development: {
      client: 'mysql',
      connection: {
        name: 'dbconnection',
        host: 'sql8.freesqldatabase.com',
        user: 'sql8715360',
        port: 3306,
        password: 't4XQzGXUDX',
        database: 'sql8715360',
      },
      migrations: {
        directory: './migrations/dev',
      },
    },
  
    staging: {
      client: 'mysql',
      connection: {
        name: 'db2Connection',
        host: 'sql8.freesqldatabase.com',
        user: 'sql8715360',
        port: 3306,
        password: 't4XQzGXUDX',
        database: 'sql8715360',
      },
      migrations: {
        directory: './migrations/staging',
      },
    },
  };
  