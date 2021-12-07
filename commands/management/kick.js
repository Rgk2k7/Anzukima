module.exports = {
  name: 'kick',
  aliases: [],
  permissions: ['KICK_MEMBERS'],
  cooldown: null,
  argsreq: 2,
  usage: '<user> <reason>',
  description: 'Kick a member of the current guild.',
  category: 'management',
  dev: false,

  execute : async(Discord, client, message, args, InvalidUsage, MsgError) => {
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    let reason;

    args.forEach(arg => {
      reason += `${arg} `
    })

    let finalReason = reason.replace('kick ', '').replace('undefined', '').replace(`<@${member.id}>`, '')

    member.kick(finalReason)

    let embed = new Discord.MessageEmbed()
    .setTitle('Kicked!')
    .addFields(
      {
        name: "User:",
        value: `${member.user.username}`
      },
      {
        name: "Reason:",
        value: `${finalReason}`
      }
    )
    .setColor('RED')
    .setFooter(`Kicked By ${message.author.username}!`)
    .setTimestamp()

    let embed2 = new Discord.MessageEmbed()
    .setTitle('Kicked!')
    .setDescription(`You have been kicked from ${message.guild.name}!`)
    .addFields(
      {
        name: "Reason:",
        value: `${finalReason}`
      }
    )
    .setColor('RED')
    .setFooter(`Kicked By ${message.author.username}!`)
    .setTimestamp()

    try{
      member.user.send({ embeds: [embed2] })
    } catch(err) {
      return new MsgError("Couldn't Dm Member But The Member Was Kicked!")
    }

    message.channel.send({ embeds: [embed] })
  }
}