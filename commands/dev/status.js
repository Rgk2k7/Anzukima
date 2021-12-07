module.exports = {
  name: 'status',
  aliases: [],
  permissions: [],
  cooldown: null,
  argsreq: 1,
  usage: '<new status>',
  description: 'Change the bots status.',
  category: 'dev',
  dev: true,

  execute : async(Discord, client, message, args, InvalidUsage, MsgError) => {

    if(args[0] == 'online' || args[0] == 'idle' || args[0] == 'invisible' || args[0] == 'dnd') {
      if(args[0] != client.user.presence.status) {
        client.user.setStatus(`${args[0]}`);

        console.log(args[0])
        let embed = new Discord.MessageEmbed()
        .setTitle('Status!')
        .setDescription(`You set the bots status to ${args[0]}`)
        .setColor('RANDOM')
        .setFooter(`Requested By ${message.author.username}!`)

        message.channel.send({ embeds: [embed] })
      } else {
        new MsgError(`The bots status is already set to ${args[0]}`)
      }
    } else {
      new MsgError(`This is not a valid client-user status`)
    }
  }
}