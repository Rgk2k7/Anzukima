let axios = require('axios')

module.exports = {
  name: 'meme',
  aliases: [],
  permissions: [],
  cooldown: null,
  argsreq: null,
  usage: '',
  description: 'Fetch a meme from reddit.',
  category: 'image',
  dev: false,

  execute : async(Discord, client, message, args, InvalidUsage, MsgError) => {
    axios.get('https://meme-api.herokuapp.com/gimme').then(res => {
      let embed = new Discord.MessageEmbed()
      .setTitle('Meme!')
      .setImage(res.data.url)
      .setDescription(`[${res.data.title}](${res.data.postLink})`)
      .setColor('RANDOM')
      .setFooter(`Requested By ${message.author.username}!`)

      message.channel.send({ embeds: [embed] }).then(m => {
        m.react('👍')
        m.react('👎')
        m.react('❤️')
      })
    })
  }
}