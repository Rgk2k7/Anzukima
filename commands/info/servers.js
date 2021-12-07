module.exports = {
  name: 'servers',
  aliases: [],
  permissions: [],
  cooldown: null,
  argsreq: null,
  usage: '',
  description: 'Get the number of guilds the bot is in!',
  category: 'info',
  dev: false,

  execute : async(Discord, client, message, args, InvalidUsage, MsgError) => {
    const servers = client.guilds.cache.size

    let embed = new Discord.MessageEmbed()
    .setTitle('Servers!')
    .setTitle(`I am currently in ${servers} servers, hopefully that number will increase though!`)
    .setColor('RANDOM')
    .setFooter(`Requested By ${message.author.username}!`)
    message.channel.send({ embeds: [embed] })
  }
}