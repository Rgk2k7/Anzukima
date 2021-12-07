function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

module.exports = {
  name: 'ping',
  aliases: ['p'],
  permissions: [],
  cooldown: null,
  argsreq: null,
  usage: '',
  description: 'Get the latency of the bot',
  category: 'info',
  dev: false,

  execute : async(Discord, client, message, args, InvalidUsage, MsgError) => {
    const m = await message.channel.send(`Getting Latency`)
    await sleep(3000);
    await message.channel.send({ embeds: [new Discord.MessageEmbed()
    .setTitle(`${client.user.tag}'s Ping`)
    .setDescription(`**${client.user.username}'s WS ping: \`${client.ws.ping}\`**`)
    .setFooter(`${client.user.username}`)
    .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
    .setColor('RANDOM')]})
    m.delete();
  }
}