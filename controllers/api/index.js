const router = require('express').Router();
const userRoutes = require('./userRoutes');
const billsRoutes = require('./billsRoutes');
const incomeRoutes = require('./incomeRoutes');
const descriptionRoutes = require('./descriptionRoutes'); 
const budgetRoutes = require('./budgetRoutes'); 


router.use('/users', userRoutes);
router.use('/bills', billsRoutes);
router.use('/income', incomeRoutes);
router.use('/', descriptionRoutes);
router.use('/', budgetRoutes);

module.exports = router;
