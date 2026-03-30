require('dotenv').config();

// Check if Railway's DATABASE_URL is available
if (process.env.DATABASE_URL) {
  // Railway production - parse the connection string
  const url = new URL(process.env.DATABASE_URL);
  
  module.exports = {
    username: url.username,
    password: url.password,
    database: url.pathname.substring(1), // Remove leading '/'
    host: url.hostname,
    port: url.port || 3306,
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
} else {
  // Local development - use individual env vars
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
    logging: false
  };
}
