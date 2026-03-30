const app = require('./app');
const db = require('./models');

const PORT = process.env.PORT;
(async () => {
  try {
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  } catch (err) {
    console.error('DB connection failed', err);
    process.exit(1);
  }
})();
