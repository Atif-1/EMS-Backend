const app = require('./app');
const db = require('./models');

const PORT = process.env.PORT;
(async () => {
  try {
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  } catch (err) {
    console.error('Server failed to start', err);
    process.exit(1);
  }
})();
