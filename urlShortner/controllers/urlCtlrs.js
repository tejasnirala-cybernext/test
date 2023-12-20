const shortid = require('shortid')
const URL = require('../models/url')

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ "error" : "url is required "})
    const shortID = shortid();
    const redirectURL = body.url;

    await URL.create({
        shortId : shortID,
        redirectUrl: redirectURL,
        visitHistory: []
    })

    return res.json({ "id" : shortID })
}

async function handleGetNewShortURL(req, res) {
    return res.end(`This is in GET method`)
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetNewShortURL
}