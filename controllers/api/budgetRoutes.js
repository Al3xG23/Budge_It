// controllers/api/descriptionRoutes.js
const express = require('express');
const router = express.Router();

router.get('/budget', (req, res) => {
  // Render the description.handlebars template
  res.render('budget');
});

module.exports = router;
