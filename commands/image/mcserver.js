let axios = require('axios')

module.exports = {
  name: 'mcserver',
  aliases: [],
  permissions: [],
  cooldown: null,
  argsreq: 1,
  usage: '<server adress>',
  description: 'Get a minecraft server info.',
  category: 'image',
  dev: false,

  execute : async(Discord, client, message, args, InvalidUsage, MsgError) => {
    let url = `https://api.mcsrvstat.us/2/${args[0]}`

    axios(url).then(server => {
      let embed = new Discord.MessageEmbed()
      .setTitle(`${server.data.hostname}`)
      .setColor('RANDOM')
      .addFields(
        {
          name: "Port:",
          value: `${server.data.port}`
        },
        {
          name: "Players Online:",
          value: `${server.data.players.online}`
        },
        {
          name: "Max Players:",
          value: `${server.data.players.max}`
        },
        {
          name: "Version:",
          value: `${server.data.version}`
        }
      )

      console.log(server.data.motd.html)

      message.channel.send({ embeds: [embed] })
    }).catch(function(error) {
      if (error.response) {
        console.log(error.response)
        // Request made and server responded
       return new MsgError(`No server was found`)
      } else if (error.request) {
        console.log(error.request)
        // The request was made but no response was received
        return new MsgError(`No server was found`)
      } else {
        console.log(error)
        // Something happened in setting up the request that triggered an Error
        return new MsgError(`No server was found`)
      }
    })
  }
}
