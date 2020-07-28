const m = require('../db/models');
const { Op } = require('sequelize');

const CronJob = require('cron').CronJob

var upScoreJob = new CronJob('1 * * * * *', async function () {
  console.log('---- run -----')
  await m.Project.findOne({
    where: {
      score: {
        [Op.gte]: 75
      },
      wasFeatured: false
    }
  }).then(record => {
    record.update({score: 100})
  })
}, null, true, 'America/Toronto');

upScoreJob.start();