const database = require(`@replit/database`);
const db = new database;

module.exports = {
  name: 'prefix',
  aliases: [],
  permissions: ['MANAGE_GUILD'],
  cooldown: 15,
  argsreq: 1,
  usage: '<new prefix>',
  description: 'Change the bots prefix for the current server.',
  category: 'config',
  dev: false,

  execute : async(Discord, client, message, args, InvalidUsage, MsgError) => {
    const newPrefix = args.join(' ');

    if(args[0].toLowerCase() == 'reset'|| (newPrefix == process.env.PREFIX && client.prefix !== process.env.PREFIX)) {
      await db.delete(`prefix_${message.guild.id}`).then(message.channel.send({ embeds: [
        new Discord.MessageEmbed()
        .setTitle(`Succesfully Reset!`)
        .setDescription(`The bots prefix has been reset to: \`${process.env.PREFIX}\``)
        .setFooter(`Requested by ${message.author.username}`)
        .setTimestamp()
        .setColor('GREEN')
      ] })).catch(err => {console.log(err); message.channel.send(`There was an error trying to reset the prefix!`)})
      return;
    }
  
    if(newPrefix.length >= 5) return new MsgError(`You must choose a prefix with less than 5 characters`);
    if(newPrefix == client.prefix) return new MsgError(`You must choose a different prefix than the previous prefix`);

    await db.set(`prefix_${message.guild.id}`, newPrefix).then(message.channel.send({ embeds: [
      new Discord.MessageEmbed()
      .setTitle(`Succesfully Changed!`)
      .setDescription(`The bots prefix has been changed to: \`${newPrefix}\``)
      .setFooter(`Requested by ${message.author.username}`)
      .setTimestamp()
      .setColor('GREEN')
    ] })).catch(err => {console.log(err); message.channel.send(`There was an error trying to change the prefix!`)});
  }
}