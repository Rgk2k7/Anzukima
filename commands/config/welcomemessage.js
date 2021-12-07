const database = require(`@replit/database`);
const db = new database;

module.exports = {
  name: 'welcomemessage',
  aliases: ['wm'],
  permissions: ['MANAGE_GUILD'],
  cooldown: null,
  argsreq: 1,
  usage: '<message>',
  description: 'Change the welcome message for the current server.',
  category: 'config',
  dev: false,

  execute : async(Discord, client, message, args, InvalidUsage, MsgError) => {
    

    // await db.set(`welcome_message_${message.guild.id}`, )

    const m = message.content
    const finalm = m.replace('.wm', '')

    const embed = new Discord.MessageEmbed()
    .setTitle('Welcome Message!')
    .setDescription(`Welcome message set to: ${finalm}`)
    .setColor('RANDOM')
    .setFooter(`Requested By ${message.author.username}`)

    message.channel.send({ embeds: [embed] })

    await db.set(`welcome_message_${message.guild.id}`, finalm)
  }
}