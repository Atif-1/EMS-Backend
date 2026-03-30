const {Sequelize, DataTypes} = require('sequelize');
const Config = require('../config/database');

const sequelize = new Sequelize(Config.database, Config.username, Config.password, {
  host: Config.host,
  dialect: Config.dialect,
   pool: {
            max: Config.pool.max,
            min: Config.pool.min,
            acquire: Config.pool.acquire,
            idle: Config.pool.idle
        },
  logging: Config.logging
});

console.log('DB_USER=', process.env.DB_USER, 'PORT=', process.env.PORT,'DB_HOST',process.env.DB_HOST);
sequelize.authenticate()
.then(() => {
    console.log('connected..')
})
.catch(err => {
    console.log('Error'+ err)
})

const db = {};
db.Sequelize = Sequelize
db.sequelize = sequelize

db.User = require('./user')(sequelize, DataTypes);
db.Event = require('./event')(sequelize, DataTypes);
db.Booking = require('./booking')(sequelize, DataTypes);
db.EventAttendance = require('./event_attendance')(sequelize, DataTypes);

// Associations
db.User.hasMany(db.Booking, { foreignKey: 'user_id' });
db.Booking.belongsTo(db.User, { foreignKey: 'user_id' });

db.Event.hasMany(db.Booking, { foreignKey: 'event_id' });
db.Booking.belongsTo(db.Event, { foreignKey: 'event_id' });

db.Booking.hasMany(db.EventAttendance, { foreignKey: 'booking_id' });
db.EventAttendance.belongsTo(db.Booking, { foreignKey: 'booking_id' });

db.Event.hasMany(db.EventAttendance, { foreignKey: 'event_id' });
db.EventAttendance.belongsTo(db.Event, { foreignKey: 'event_id' });

db.User.hasMany(db.EventAttendance, { foreignKey: 'user_id' });
db.EventAttendance.belongsTo(db.User, { foreignKey: 'user_id' });

db.sequelize.sync({ force: false })
  .then(() => {
        console.log('yes sync done!')     
})

module.exports = db;
