

  // module.exports = {
  //   development: {
  //     client: 'mysql',
  //     connection: {
  //       name: 'devdb',
  //       host: '127.0.0.1',
  //       user: 'root',
  //       port: 8000,
  //       password: '',
  //       database: 'test1',
  //     },
  //     migrations: {
  //       directory: './migrations/dev',
  //     },
  //   },

import { debug } from "console";

  //   staging: {
  //     client: 'mysql',
  //     version: '5.7',
  //     connection: {
  //       name: 'db2Connection',
  //       host: '127.0.0.1',
  //       user: 'root',
  //       port: 3307,
  //       password: 'root',
  //       database: 'test2',
  //     },
  //     migrations: {
  //       directory: './migrations/dev',
  //     },
  //   },
  // };

  const knexfile = {
    development: {
      client: 'mysql',
      connection: {
        name: 'devdb',
        host: '127.0.0.1',
        user: 'root',
        port: 8000,
        password: '',
        database: 'test1',
      },
      pool: {
        min: 2,
        max: 10,
      },
      migrations: {
        directory: './migrations/dev',
      },
      debug: true
    },
  
    staging: {
      client: 'mysql',
      version: '5.7',
      connection: {
        name: 'db2Connection',
        host: '127.0.0.1',
        user: 'root',
        port: 3307,
        password: 'root',
        database: 'test2',
      },
      migrations: {
        directory: './migrations/dev',
      },
    },
  };
  
  export default knexfile;
  