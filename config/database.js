require('dotenv').config();

// Debug: Log which config is being used
console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Set' : 'Not set');
console.log('NODE_ENV:', process.env.NODE_ENV);

if (process.env.DATABASE_URL) {
  // Railway production - parse the connection string
  console.log('Using Railway DATABASE_URL');
  
  const url = new URL(process.env.DATABASE_URL);
  
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
} else {
  // Local development
  console.log('Using local environment variables');
  
  module.exports = {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    pool: {
      max: 20,
      min: 5,
      acquire: 60000,
      idle: 20000
    },
    logging: false
  };
}
