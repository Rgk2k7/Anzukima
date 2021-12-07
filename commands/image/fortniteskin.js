let axios = require('axios')

module.exports = {
  name: 'fortniteskin',
  aliases: ['fnskin'],
  permissions: [],
  cooldown: null,
  argsreq: 1,
  usage: '<skin name>',
  description: 'Get a fortnite skins info.',
  category: 'image',
  dev: false,

  execute : async(Discord, client, message, args, InvalidUsage, MsgError) => {
    let url = `https://fortnite-api.com/v2/cosmetics/br/search?name=`
    args.forEach(arg => {
      url += `${arg}+`
    })

    url += 'l'

    let url1 = url.replace('+l', '')

    axios.get(url1).then(skin => {
      let embed = new Discord.MessageEmbed()
      .setTitle(`${skin.data.data.name}`)
      .setImage(skin.data.data.images.icon)
      .setColor('RANDOM')

      message.channel.send({ embeds: [embed] })
    }).catch(function(error) {
      if (error.response) {
        // Request made and server responded
       return new MsgError(`No skin was found`)
      } else if (error.request) {
        // The request was made but no response was received
        return new MsgError(`No skin was found`)
      } else {
        // Something happened in setting up the request that triggered an Error
        return new MsgError(`No skin was found`)
      }
    })
  }
}
