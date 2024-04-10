const router = require('express').Router();
const { Income, User, Bills } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    // Get all bills and JOIN with user data
    const billData = await Bills.findAll({
      where: {
        user_id: req.session.user_id
      },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
  });

  
  const userData = await User.findByPk(req.session.user_id,{
    attributes: ['username'],
  });

    // Serialize data so the template can read it
    const bills = billData.map((amount) => amount.get({ plain: true }));

    const user = userData.get({plain:true})

    const amount = bills.map((bill) => {
      let totalBills = 0;
      totalBills += parseFloat(bill.amount);
      
      return totalBills;
    })
    
  
    const initialValue = 0;
    const billsTotal = amount.reduce((amount, current) => amount + current, initialValue,);
    
  

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      bills,
      billsTotal,
      username: user.username,
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/bills/:id', async (req, res) => {
  try {
    const billData = await Bills.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const bill = billData.get({ plain: true });

    res.render('bill', {
      ...bill,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/', async (req, res) => {
  try {
    // Get all income and JOIN with user data
    const incomeData = await Income.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    // Serialize data so the template can read it
    const income = incomeData.map((amount) => amount.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      income, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/income/:id', async (req, res) => {
  try {
    const incomeData = await Income.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const income = incomeData.get({ plain: true });

    res.render('income', {
      ...income,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/budget', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Bills}],
    });

    const user = userData.get({ plain: true });
    

    const billData = await Bills.findAll({
      where: {
        user_id: req.session.user_id        
      },
    });
    
    const data = billData.map((data) => data.get({ plain: true }));
    console.log("user data: ", data);    

    res.render('budget', {
      ...user,
      data,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/description', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Bills}],
    });

    const user = userData.get({ plain: true });

    res.render('description', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/budget');
    return;
  }

  res.render('login');
});









module.exports = router;
