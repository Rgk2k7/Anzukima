module.exports = {
  name: 'cooldowns',
  aliases: ['cool'],
  permissions: [],
  cooldown: 5,
  argsreq: null,
  usage: '',
  description: 'Testing cooldowns!',
  category: 'dev',
  dev: true,

  execute : async(Discord, client, message, args, InvalidUsage, MsgError) => {
    message.channel.send(`Success!`)
  }
}