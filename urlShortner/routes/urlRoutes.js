const express = require('express')
const { handleGenerateNewShortURL, handleGetNewShortURL } = require('../controllers/urlCtlrs')

const router = express.Router();

router.route('/')
  .get(handleGetNewShortURL)
  .post(handleGenerateNewShortURL)

module.exports = router