const express = require('express');
const router = express.Router();

router.get('/description', (req, res) => {
  res.render('description');
});

module.exports = router;

