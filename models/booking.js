module.exports = (sequelize, DataTypes) => {
    const Booking=sequelize.define('booking', {
        id: { 
            type: DataTypes.INTEGER, 
            autoIncrement: true, 
            primaryKey: true 
        },
        user_id: { 
            type: DataTypes.INTEGER, 
            allowNull: false 
        },
        event_id: { 
            type: DataTypes.INTEGER, 
            allowNull: false 
        },
        booking_date: { 
            type: DataTypes.DATE, 
            allowNull: false, 
            defaultValue: DataTypes.NOW 
        },
        ticket_count: { 
            type: DataTypes.INTEGER, 
            allowNull: false, 
            defaultValue: 1 
        },
        booking_code: { 
            type: DataTypes.STRING(64), 
            allowNull: false, 
            unique: true 
        }
    });
return Booking;
}
