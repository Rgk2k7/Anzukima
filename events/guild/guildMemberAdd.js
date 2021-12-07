const database = require(`@replit/database`);
const db = new database;
const { MessageEmbed } = require('discord.js')

module.exports = async (Discord, client, member) => {
  const channel = member.guild.channels.cache.get(await db.get(`welcome_channel_${member.guild.id}`))

  if(!channel) return
  
  const welcomeMessage = await db.get(`welcome_message_${member.guild.id}`)

   const welcomeEmbed = new MessageEmbed()
   .setTitle('Welcome!')
   .setDescription(`<@${member.user.id}> ${welcomeMessage}`)
   .setColor('RANDOM')
   .setImage(member.user.displayAvatarURL({ dynamic: true }))

   channel.send({ embeds: [welcomeEmbed] })
}