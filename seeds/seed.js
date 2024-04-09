const sequelize = require('../config/connection');
const { User, Income, Bills } = require('../models');

const userData = require('./userData.json');
const incomeData = require('./incomeData.json');
const billData = require('./billData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const amount of incomeData) {
    await Income.create({
      ...amount,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const bill of billData) {
    await Bills.create({
      ...bill,
      // user_id: users[Math.floor(Math.random() * users.length)].id,
    })
  }

  process.exit(0);
};

seedDatabase();
