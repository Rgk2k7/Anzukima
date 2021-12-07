module.exports = {
  name: 'args',
  aliases: [],
  permissions: [],
  cooldown: null,
  argsreq: 1,
  usage: '<text>',
  description: 'Reqargs test',
  category: 'dev',
  dev: true,

  execute : async(Discord, client, message, args, InvalidUsage, MsgError) => {
    message.channel.send(`Success!`)
  }
}