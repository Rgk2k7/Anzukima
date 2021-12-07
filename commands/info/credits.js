const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'credits',
  aliases: ['cr'],
  permissions: [],
  cooldown: null,
  argsreq: null,
  usage: '',
  description: 'Get the credits of the bot',
  category: 'info',
  dev: false,

  execute : async(Discord, client, message, args, InvalidUsage, MsgError) => {
    const owners = ['Acurrz', 'The Cuber', 'U j a a n'];
    const staff = ['CoolsadW']

    const creditsEmbed = new MessageEmbed()
    .setTitle('Credits:')
    .addFields(
      {
        name: 'Owners',
        value: `${owners[0]}\n${owners[1]}\n${owners[2]}`
      },
      {
        name: 'Staff',
        value: `${staff[0]}`
      }
    )
    .setColor('RANDOM')
    .setImage('https://i.ibb.co/gWY4Dwq/download-1.jpg')

    message.channel.send({ embeds: [creditsEmbed] })
  }
}