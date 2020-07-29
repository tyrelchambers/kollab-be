const m = require('../db/models');
const { Op } = require('sequelize');
const faker = require("faker");

const CronJob = require('cron').CronJob

var selectFeatured = new CronJob('1/2 * * * * *', async function () {
  const findProject = async score => {
    await m.Project.findAll({
      where: {
        score: {
          [Op.gt]: score
        },
        wasFeatured: false
      },
      include: [
        'likers',
        'dislikers'
      ]
    }).then(async records => {
      if (records.length > 0) {
        await m.Featured.truncate()
        await m.Featured.create({
          projectId: records[faker.random.number(records.length)].uuid
        })
      } else {
        findProject(score - 0.5)
      }
    })
  }

  findProject(16)

}, null, false, 'America/Toronto');

const updateProjectScores = new CronJob('1/10 * * * * *', async () => {
  m.Project.findAll({}).then(records => {
    for(let i = 0; i < records.length; i++) {
      records[i].update({
        score: (2 * Math.log(records[i].likes) - Math.log(records[i].dislikes)) + Math.log(records[i].views)
      })
    } 
  })
}, null, false, 'America/Toronto')