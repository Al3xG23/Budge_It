const router = require('express').Router();
const { Bills } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newBills = await Bills.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newBills);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/', withAuth, async (req, res) => {

  try {      
    // Get all bills and JOIN with user data
    const billData = await Bills.findAll({
      where: {
        user_id: req.session.user_id
      },
  })
  res.status(200).json(billData);
  console.log(billData);  
    
    // Pass serialized data and session flag into template
    // res.send(events);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const billsData = await Bills.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!billsData) {
      res.status(404).json({ message: 'No bills found with this id!' });
      return;
    }

    res.status(200).json(billsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/calendar', withAuth, async (req, res) => {

  try {
    
    
    // Get all bills and JOIN with user data
    const billData = await Bills.findAll({
      where: {
        user_id: req.session.user_id
      },
  })
  

    // Serialize data so the template can read it
    const events = billData.map(bill => ({
      title: `${bill.billName} - ${bill.amount}`,
      start: bill.dueDate,
      allDay: true
    }));
    
    // Pass serialized data and session flag into template
    res.send(events);

  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;