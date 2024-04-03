const router = require('express').Router();
const userRoutes = require('./userRoutes');
const billsRoutes = require('./billsRoutes');
const incomeRoutes = require('./incomeRoutes');

router.use('/users', userRoutes);
router.use('/bills', billsRoutes);
router.use('./income', incomeRoutes);

module.exports = router;
