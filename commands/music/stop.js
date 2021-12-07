const voice = require('@discordjs/voice')

module.exports = {
  name: 'stop',
  aliases: ['st'],
  permissions: ['SPEAK'],
  cooldown: null,
  argsreq: null,
  usage: '',
  description: 'Leave the current voice channel.',
  category: 'music',
  dev: false,

  execute : async(Discord, client, message, args, InvalidUsage, MsgError) => {
    if(!message.guild.me.voice.channel){
      return new MsgError('I am not in a voice channel')
    }
    if(message.member.voice.channel !== message.guild.me.voice.channel){
      return new MsgError('You arent in my voice channel')
    }

    try {
      let connection = message.guild.me.voice;
      connection.disconnect()

      let embed = new Discord.MessageEmbed()
      .setTitle('Left!')
      .setDescription('Left the current voice channel! :wave:')
      .setColor('RED')
      .setFooter(`Requested By ${message.author.username}!`)

      message.channel.send({ embeds: [embed] })
    } catch(err){
      new MsgError('There was an error')
      console.log(err)
      return;
    }
  }
}