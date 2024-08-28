const express = require('express');
const userRoutes = require('./api/routes/authRoutes');
const sessionRoutes = require('./api/routes/sessionRoutes');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send('Video Conferencing API');
});

router.use('/auth', userRoutes);
router.use('/session', sessionRoutes);

module.exports = router;
