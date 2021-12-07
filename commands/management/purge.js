const { readdirSync } = require('fs');
module.exports = {
  name: 'purge',
  aliases: ['clear'],
  permissions: ['MANAGE_MESSAGES'],
  cooldown: 5,
  argsreq: 1,
  usage: '<@optional user> <amount>',
  description: 'Clear a certain amount of messages.',
  category: 'management',
  dev: false,

  execute : async(Discord, client, message, args, InvalidUsage, MsgError) => {
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || false

    if(user && !new RegExp(`<@!?${user.id}>`).test(args[0])) return new InvalidUsage('purge');

    if(user) args.shift();

    let limit = parseInt(args[0]);

    if(isNaN(limit)) return new MsgError(`You must choose a number`);

    if(limit >= 100) return new MsgError(`You must choose a number less than 100`);

    if(limit <= 1) return new MsgError(`You must choose a number more than 1`);

    try {
      let done = false;
      if(!user) {

        await message.channel.bulkDelete(limit + 1);
        done = true
      } else {
      const fetched = await message.channel.messages.fetch();
      let toDelete = 0;

      fetched.forEach(i => {
        if(toDelete >= limit) done = true;
        if(done == true) return;
        if(i.author.id !== user.id) return;
        i.delete();
        toDelete++;
      })
      }
            if(done == true) return message.channel.send({ embeds: [
        new Discord.MessageEmbed()
        .setTitle(`Succesfully Purged`)
        .setDescription(`\`${limit}\` messages have been purged\nUser: \`${message.author.tag}\`${user ? `\nTarget: \`${user.user.tag}\`` : ''}`)
        .setFooter(`Requested by ${message.author.username}`)
        .setTimestamp()
        .setColor('GREEN')
      ] })
    } catch(err) {
      console.log(err);
      message.channel.send(`There was an error trying to purge!`)
    }
  }
}