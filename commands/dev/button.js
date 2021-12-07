// module.exports = {
//   name: 'button',
//   aliases: ['btn'],
//   permissions: [],
//   cooldown: null,
//   argsreq: null,
//   usage: '',
//   description: 'Button test.',
//   category: 'dev',
//   dev: true,
//   execute : async(Discord, client, message, args, InvalidUsage, MsgError) => {
//     const row = new Discord.MessageActionRow()
//       .addComponents(
//         new Discord.MessageButton()
//           .setCustomId('ping')
//           .setLabel('Ping!')
//           .setStyle('PRIMARY')
//       )
    
//     message.channel.send({
//        content: 'Ping?', 
//        components: [row],
//        ephemeral: true,
//     })

//     const filter = (btnInt: Discord.ButtonInteraction) => {
//       return message.author.id === btnInt.user.id
//     }

//     const collector = message.channel.createMessageComponentCollector({
//       filter,
//       max: 1,
//       time: 15000
//     })

//     collector.on('collect', () => {
//       message.channel.send({ embeds: [new Discord.MessageEmbed()
//       .setTitle(`${client.user.tag}'s Ping`)
//       .setDescription(`**${client.user.username}'s WS ping: \`${client.ws.ping}\`**`)
//       .setFooter(`${client.user.username}`)
//       .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
//       .setTimestamp()
//       .setColor('RANDOM')]})
//     })
//   }
// }