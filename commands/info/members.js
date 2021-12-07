module.exports = {
  name: 'members',
  aliases: [],
  permissions: [],
  cooldown: null,
  argsreq: null,
  usage: '',
  description: 'Get the number of members the bot is helping!',
  category: 'info',
  dev: false,

  execute : async(Discord, client, message, args, InvalidUsage, MsgError) => {
    const members = client.users.cache.size - 1

    let embed = new Discord.MessageEmbed()
    .setTitle('Members!')
    .setTitle(`I am currently helping ${members} members, hopefully that number will increase though!`)
    .setColor('RANDOM')
    .setFooter(`Requested By ${message.author.username}!`)
    message.channel.send({ embeds: [embed] })
  }
}