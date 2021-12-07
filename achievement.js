module.exports = {
  name: 'achievement',
  aliases: ['achieve'],
  permissions: [],
  cooldown: null,
  argsreq: 1,
  usage: '<achievement>',
  cooldown: null,
  description: 'Achieve anything with a minecraft style achievement.',
  category: 'image',
  dev: false,

  execute : async(Discord, client, message, args, InvalidUsage, MsgError) => {
    let link = 'https://minecraftskinstealer.com/achievement/1/Achievement+Get!%21/';

    args.forEach(arg => {
      link += `${arg}+`
    })
    
    const mcEmbed = new Discord.MessageEmbed()
    .setTitle('Achievement Get!')
    .setImage(`${link}`)
    .setFooter(`Achieved By ${message.author.username}!`)
    .setColor('RANDOM')

    message.channel.send({ embeds: [mcEmbed] })
  }
}