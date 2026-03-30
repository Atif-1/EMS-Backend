const app = require('./app');
const db = require('./models');
console.log('=== ENVIRONMENT VARIABLES ===');
console.log('MYSQL_URL exists:', !!process.env.MYSQL_URL);
console.log('MYSQL_URL value:', process.env.MYSQL_URL);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('All env keys:', Object.keys(process.env).filter(k => k.includes('MYSQL') || k.includes('DB_')));
console.log('=============================');

const PORT = process.env.PORT;
(async () => {
  try {
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  } catch (err) {
    console.error('DB connection failed', err);
    process.exit(1);
  }
})();
