const router = require('express').Router();

const authRoutes = require('./auth');
const userRoutes = require('./user');
const socialRoutes = require('./social');
const postRoutes = require('./posts');
const eventsRoutes = require('./events');

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/social', socialRoutes);
router.use('/posts', postRoutes);
router.use('/events', eventsRoutes);

module.exports = router;