module.exports = (sequelize, DataTypes) => {
  const User= sequelize.define('user', {
        id: { 
            type: DataTypes.INTEGER,
            autoIncrement: true, 
            primaryKey: true 
            },
        name: { 
            type: DataTypes.STRING(100), 
            allowNull: false 
        },
        email: { 
            type: DataTypes.STRING(255), 
            allowNull: false, 
            unique: true 
        }
    });
    return User;
}
