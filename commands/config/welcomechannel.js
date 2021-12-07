const database = require(`@replit/database`);
const db = new database;

module.exports = {
  name: 'welcomechannel',
  aliases: ['wc'],
  permissions: ['MANAGE_GUILD'],
  cooldown: null,
  argsreq: 1,
  usage: '<channel>',
  description: 'Change the welcome channel for the current server.',
  category: 'config',
  dev: false,

  execute : async(Discord, client, message, args, InvalidUsage, MsgError) => {
    const channel = args[0] || message.channel.id
    const m = `\\${channel}`
    const m2 = m.replace('<', '')
    const m3 = m2.replace('>', '')
    const m4 = m3.replace('#', '')//
    const finalm = m4.replace('\\', '')

    await db.set(`welcome_channel_${message.guild.id}`, finalm)

    let embed = new Discord.MessageEmbed()
    .setTitle('Welcome Channel!')
    .setDescription(`Welcome channel set to <#${finalm}> !`)
    .setColor('RANDOM')

    message.channel.send({ embeds: [embed] })
  }
}