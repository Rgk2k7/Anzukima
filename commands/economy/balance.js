const commaNumber = require('comma-number')

const database = require("@replit/database");
const db = new database;

module.exports = {
  name: 'balance',
  aliases: ['bal'],
  permissions: [],
  cooldown: null,
  argsreq: null,
  usage: '<@optional user>',
  description: 'Check a users economy balance.',
  category: 'economy',
  dev: false,

  execute : async(Discord, client, message, args, InvalidUsage, MsgError) => {
    const user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;
    let wallet = await db.get(`wallet_${user.id}`)
    let bank = await db.get(`bank_${user.id}`);
    if(wallet == null) wallet = 0;
    if(bank == null) bank = 0;

    let walletDisp = commaNumber(wallet)
    let bankDisp = commaNumber(bank)

    const balEmbed = new Discord.MessageEmbed()
    .setTitle(`${user.username}'s Balance`)
    .addFields(
      {
        name: "Wallet",
        value: `$${walletDisp}`
      },
      {
        name: "Bank",
        value: `$${bankDisp}`
      }
    )
    .setColor('RANDOM')
    .setThumbnail(user.displayAvatarURL({ dynamic: false }))

    message.channel.send({ embeds: [balEmbed] })
    
  }
}