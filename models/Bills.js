const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Bills extends Model { }

Bills.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        billName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // -------------- Type of Bill -------------------
        billType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        //  ----------------- ---------------------------
        dueDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        amount: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'bill',
    }
);

module.exports = Bills;