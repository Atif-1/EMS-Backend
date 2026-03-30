require('dotenv').config();

// Debug: Log which config is being used
console.log('=== ENVIRONMENT VARIABLES ===');
console.log('All env keys:', Object.keys(process.env).filter(k => k.includes('MYSQL') || k.includes('DB_')));
console.log('MYSQL_URL:', process.env.MYSQL_URL ? 'Set' : 'Not set');
console.log('NODE_ENV:', process.env.NODE_ENV);

console.log('MYSQL_URL exists:', !!process.env.MYSQL_URL);
console.log('MYSQL_URL value:', process.env.MYSQL_URL);
console.log('NODE_ENV:', process.env.NODE_ENV);

console.log('=============================');

  // Railway production - parse the connection string
  console.log('Using Railway MYSQL_URL');
  
  const url = new URL(process.env.MYSQL_URL);
  
  module.exports = {
    username: url.username,
    password: url.password,
    database: url.pathname.substring(1), // Remove leading '/'
    host: url.hostname,
    port: parseInt(url.port) || 3306,
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
