const express = require('express');
const logger = require('morgan');
const log = require("@thnkscj/logger-plus");
const db = require('./database/DomainDatabase');
const config = require("./config.json");

const app = express();
const VALID_DOMAIN = new RegExp("^((?!-)[A-Za-z\\d-]{1,63}(?<!-)\\\\.)+[A-Za-z]{2,6}$")

app.use(logger('dev'));

app.get('/check', async function (req, res) {
    let domain = req.query.validate, startTime = new Date().getTime(), isEmail;

    if (domain === undefined || domain === "" || domain === null)
        return res.json({"status": "error", "reason": "Insufficient parameters", "usage": "?validate={email/domain}"})

    if (domain.includes("@"))
        domain = domain.split("@").pop(); isEmail = true;

    if (VALID_DOMAIN.test(domain))
        return res.json({"status": "error", "reason": "Invalid domain"})

    const b = await db.found(domain);

    res.json({
        "processing": new Date().getTime() - startTime + "ms",
        "provided": isEmail ? "email" : "domain",
        "domain": domain,
        "status": b ? "suspicious" : "unsuspicious"
    })
});

app.get('/*', async function (req, res) {
    res.redirect('/check')
});

app.listen(config.port, async () => {
    log.CLEAR()
    log.INFO(`Webserver listening on :${config.port}`);
    await db.launch()
    log.INFO(`${(await db.getDomains()).length}, suspicious domains loaded`);
});
