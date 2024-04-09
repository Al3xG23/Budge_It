const router = require('express').Router();
const userRoutes = require('./userRoutes');
const billsRoutes = require('./billsRoutes');
const incomeRoutes = require('./incomeRoutes');
const descriptionRoutes = require('./descriptionRoutes'); 

router.use('/users', userRoutes);
router.use('/bills', billsRoutes);
router.use('/income', incomeRoutes);
router.use('/', descriptionRoutes);

module.exports = router;
