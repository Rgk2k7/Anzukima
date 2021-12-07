module.exports = {
  name: 'perms',
  aliases: [],
  permissions: ['ADMINISTRATOR'],
  cooldown: null,
  argsreq: null,
  usage: '',
  description: 'Permissions test',
  category: 'dev',
  dev: true,

  execute : async(Discord, client, message, args, InvalidUsage, MsgError) => {
    message.channel.send(`Success!`)
  }
}