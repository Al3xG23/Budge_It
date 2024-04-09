// controllers/api/descriptionRoutes.js
const express = require('express');
const router = express.Router();

router.get('/description', (req, res) => {
  // Render the description.handlebars template
  res.render('description');
});

module.exports = router;
