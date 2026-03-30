
console.log('=== DATABASE CONFIG ===');
console.log('MYSQLHOST:', process.env.MYSQLHOST ? 'Set' : 'Not set');
console.log('MYSQLPORT:', process.env.MYSQLPORT ? 'Set' : 'Not set');
console.log('MYSQLUSER:', process.env.MYSQLUSER ? 'Set' : 'Not set');
console.log('MYSQLPASSWORD:', process.env.MYSQLPASSWORD ? 'Set' : 'Not set');
console.log('MYSQLDATABASE:', process.env.MYSQLDATABASE ? 'Set' : 'Not set');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('======================');

module.exports = {
  username: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  host: process.env.MYSQLHOST,
  port: parseInt(process.env.MYSQLPORT) || 3306,
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
    keepAliveInitialDelayMs: 0,
    connectTimeout: 10000
  }
};
