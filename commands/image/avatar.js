module.exports = {
  name: 'avatar',
  aliases: [],
  permissions: [],
  cooldown: null,
  argsreq: null,
  usage: '@optional user',
  cooldown: null,
  description: 'View a users avatar.',
  category: 'image',
  dev: false,

  execute : async(Discord, client, message, args, InvalidUsage, MsgError) => {
    let user = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author;

    const mcEmbed = new Discord.MessageEmbed()
    .setTitle(`${user.username}'s Avatar!`)
    .setImage(user.displayAvatarURL({ dynamic: true }))
    .setTimestamp(Date.now())
    .setFooter(`Requested By ${message.author.username}!`)
    .setColor('RANDOM')

    message.channel.send({ embeds: [mcEmbed] })
  }
}