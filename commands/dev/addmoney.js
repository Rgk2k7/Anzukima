const database = require("@replit/database");
const db = new database;
const commaNumber = require('comma-number');

module.exports = {
  name: 'addmoney',
  aliases: ['am'],
  permissions: [],
  cooldown: null,
  argsreq: 1,
  usage: '<amount> <@optional user>',
  description: 'Add money to a users balance.',
  category: 'dev',
  dev: true,

  execute : async(Discord, client, message, args, InvalidUsage, MsgError) => {
    const amount = parseInt(args[0])
    const user = message.mentions.users.first() || message.guild.members.cache.get(args[1]) || message.author;
    const wallet = await db.get(`wallet_${user.id}`);
    let amountDisp = commaNumber(amount);
 
    await db.set(`wallet_${user.id}`, wallet + amount)

    const amEmbed = new Discord.MessageEmbed()
    .setTitle('Added Money!')
    .setDescription(`Added $${amountDisp} to ${user.username}'s wallet!`)
    .setColor('RED')
    .setFooter(`Added by ${message.author.username}!`)
    message.channel.send({ embeds: [amEmbed] })
    
  }
}