module.exports = (sequelize, DataTypes) => {
    const EventAttendance =sequelize.define('event_attendance', {
        id: { 
            type: DataTypes.INTEGER, 
            autoIncrement: true, 
            primaryKey: true 
        },
        booking_id: { 
            type: DataTypes.INTEGER, 
            allowNull: false 
        },
        user_id: { 
            type: DataTypes.INTEGER, 
            allowNull: false 
        },
        event_id: { 
            type: DataTypes.INTEGER, 
            allowNull: false 
        },
        entry_time: { 
            type: DataTypes.DATE, 
            allowNull: false, 
            defaultValue: DataTypes.NOW 
        }
    });
    return EventAttendance;
}
