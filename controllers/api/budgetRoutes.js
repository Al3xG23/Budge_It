const express = require('express');
const router = express.Router();

router.get('/budget', (req, res) => {
  res.render('budget');
});

module.exports = router;
