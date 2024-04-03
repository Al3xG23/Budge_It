const User = require('./User');
const Income = require('./Income');
const Bills = require('./Bills');

User.hasMany(Income, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

User.hasMany(Bills, {
  foreignKey: 'bill_id',
  onDelete: 'CASCADE'
});

Income.belongsTo(User, {
  foreignKey: 'user_id'
});

Bills.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Income, Bills };
