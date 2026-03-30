// simple config for development via env vars
module.exports = {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
     pool: {
        max: 20,
        min: 5,
        acquire: 60000,
        idle: 20000
    },
    logging: false,
     dialectOptions: {
    enableKeepAlive: true,
    keepAliveInitialDelayMs: 0
  }
};
