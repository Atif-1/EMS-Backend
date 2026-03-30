module.exports = (sequelize, DataTypes) => {
    const Event=sequelize.define('event', {
        id: { 
            type: DataTypes.INTEGER, 
            autoIncrement: true, 
            primaryKey: true 
        },
        title: { 
            type: DataTypes.STRING(255), 
            allowNull: false 
        },
        description: { 
            type: DataTypes.TEXT, 
            allowNull: true 
        },
        event_date: { 
            type: DataTypes.DATE,
            allowNull: false 
        },
        total_capacity: { 
            type: DataTypes.INTEGER, 
            allowNull: false 
        },
        remaining_tickets: { 
            type: DataTypes.INTEGER, 
            allowNull: false 
        }
    });
    return Event;
}
