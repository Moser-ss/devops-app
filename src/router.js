const router = require('express').Router();
const gists = require('./routes/gists');
const health = require('./routes/health');

router.use('/gists', gists)
router.use('/health', health)

module.exports = router;