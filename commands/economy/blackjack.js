const commaNumber = require('comma-number')
const { RandInt } = require('@acurrz/node-random-int')
const Database = require('@replit/database');
const db = new Database

module.exports = {
  name: 'blackjack',
  aliases: ['bj'],
  permissions: [],
  cooldown: 30,
  argsreq: null,
  usage: '<amount>',
  description: 'Play blackjack and gamble your money..',
  category: 'economy',
  dev: false,

  execute : async(Discord, client, message, args, InvalidUsage, MsgError) => {
    let folder = require('./emojis.json')
    let emojis = folder.blackjack

    let collector = new Discord.MessageCollector()

    collector.on('collect', async (m) => {
      if(m.author.id == message.author.id) {
        
      }
    })
  }
}