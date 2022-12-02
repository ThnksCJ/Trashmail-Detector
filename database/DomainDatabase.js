const config = require('../config.json');
const axios = require('axios');
const cron = require("cron");

let domains = [];
let urlSources = [];

module.exports = db = {
    launch: async function(){
        await this.scheduledRefresh()
        await this.refresh()
    },
    scheduledRefresh: async function(){
        new cron.CronJob('00 00 9 * * *', async () => {
            await this.refresh()
        }).start();
    },
    refresh: async function() {
        let url = config.sources;
        for (let i in url) {
            urlSources = urlSources.concat(url[i]);

            try {
                const res = await axios.get(url[i]);
                const list = res.data.replace(/\r/g, '').split('\n');
                domains = domains.concat(list);
                domains = [...new Set(domains)]
            } catch (err) {
                console.log(err)
            }
        }
    },
    found: async function(domain){
        return (await this.getDomains()).includes(domain.toLowerCase());
    },
    getDomains: async function(){
        return domains;
    }
};
