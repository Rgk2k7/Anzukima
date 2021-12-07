const commaNumber = require('comma-number')
const { RandInt } = require('@acurrz/node-random-int')

const Database = require('@replit/database');
const db = new Database

module.exports = {
  name: 'daily',
  aliases: [],
  permissions: [],
  cooldown: 36000,
  argsreq: null,
  usage: '',
  description: 'Claim your daily reward.',
  category: 'economy',
  dev: false,

  execute : async(Discord, client, message, args, InvalidUsage, MsgError) => {
    
    let wallet = await db.get(`wallet_${message.author.id}`)
    let reward = 10000

    await db.set(`wallet_${message.author.id}`, wallet + reward)

    const embed = new Discord.MessageEmbed()
    .setTitle('Daily!')
    .setDescription('Congrats! You claimed your daily reward of $10,000.')
    .setColor('RANDOM')
    .setFooter(`Good Day! | ${message.author.username}`)

    message.channel.send({ embeds: [embed] })
  }
}