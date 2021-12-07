const moment = require('moment');

module.exports = {
  name: 'whois',
  aliases: ['wi'],
  permissions: [],
  cooldown: null,
  argsreq: null,
  usage: '<@optional user>',
  description: 'Get the info of a guild user',
  category: 'info',
  dev: true,

  execute : async(Discord, client, message, args, InvalidUsage, MsgError) => {
    const sender = message.author
    const target = message.mentions.members.first() ||message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === args.slice(0).join(" ") || x.user.username === args[0]) || message.member;
    const member = message.guild.members.cache.get(target.id) || client.users.cache.get(u => u.id === args[0]);

    const whoisEmbed = new Discord.MessageEmbed()
    .setAuthor(`${target.user.tag}`)
    .setThumbnail(target.user.displayAvatarURL({dynamic: true}))
    .setColor('#33FF82')
    .setTimestamp(`**${Date.now()}**`)
    .addField("**User ID:**", `${target.id}`, false)
    .addField("**Discriminator:**", `#${member.user.discriminator}`)
    .addField("**Server Nickname:**", `${member ? member.displayName : null}`)
    .addField("**Roles:**", `${member.roles.cache.map(r => r).join(' ').replace("@everyone", " ")}`)
    .addField("**Server Member Since**", `${moment(member.joinedAt).format('MMMM Do YYYY, h:mm:ss a')}\n**-** ${moment(member.joinedAt).startOf('day').fromNow()}`)
    .addField("**Discord User Since**", `${moment(target.createdAt).format('MMMM Do YYYY, h:mm:ss a')}\n**-** ${moment(target.createdAt).startOf('day').fromNow()}`)
    .setFooter(`Requested by ${sender.tag}`, sender.displayAvatarURL({dynamic: true}))
    message.channel.send({embeds: [whoisEmbed]});
  }
}