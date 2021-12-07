const commaNumber = require('comma-number')
const { RandInt } = require('@acurrz/node-random-int')

const Database = require('@replit/database');
const db = new Database

module.exports = {
  name: 'beg',
  aliases: [],
  permissions: [],
  cooldown: 45,
  argsreq: null,
  usage: '',
  description: 'Beg for money.',
  category: 'economy',
  dev: false,

  execute : async(Discord, client, message, args, InvalidUsage, MsgError) => {
    let wallet = await db.get(`wallet_${message.author.id}`)
    let people = ['Acurrz', 'the cuber', 'A Simp']
    let personNum = people[Math.floor(Math.random() * people.length)];
    let reward = new RandInt(1000)
    let rewDisp = commaNumber(reward.int)
    const begEmbed = new Discord.MessageEmbed()
    .setTitle(`Begged!`)
    .setDescription(`You begged **${personNum}** and gained **$${rewDisp}**!`)
    .setColor('RANDOM')

    db.set(`wallet_${message.author.id}`, wallet + reward.int)

    message.channel.send({ embeds: [begEmbed] })
  }
}