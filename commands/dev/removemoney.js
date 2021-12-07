const database = require("@replit/database");
const db = new database;
const commaNumber = require('comma-number')

module.exports = {
  name: 'removemoney',
  aliases: ['rm'],
  permissions: [],
  cooldown: null,
  argsreq: 1,
  usage: '<amount> <@optional user>',
  description: 'Remove money from a user.',
  category: 'dev',
  dev: true,

  execute : async(Discord, client, message, args, InvalidUsage, MsgError) => {
    const amount = parseInt(args[0])
    const user = message.mentions.users.first() || message.guild.members.cache.get(args[1]) || message.author;
    const wallet = await db.get(`wallet_${user.id}`);
    let amountDisp = commaNumber(amount)
    if(args[0] == 'all'){
      await db.set(`wallet_${user.id}`, 0)

      const rmEmbed = new Discord.MessageEmbed()
      .setTitle('Removed Money!')
      .setDescription(`Removed all from ${user.username}!`)
      .setColor('RED')
      .setFooter(`Removed by ${message.author.username}!`)
      message.channel.send({ embeds: [rmEmbed] })
    } else {
      await db.set(`wallet_${user.id}`, wallet - amount)

      const rmEmbed = new Discord.MessageEmbed()
      .setTitle('Removed Money!')
      .setDescription(`Removed $${amountDisp} from ${user.username}!`)
      .setColor('RED')
      .setFooter(`Removed by ${message.author.username}!`)
      message.channel.send({ embeds: [rmEmbed] })
    }
  }
}