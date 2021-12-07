const { readdirSync } = require('fs');
module.exports = {
  name: 'help',
  aliases: [],
  permissions: [],
  cooldown: null,
  argsreq: null,
  usage: '<category/command>',
  description: 'Display all of the bots commands.',
  category: 'info',
  dev: false,

  execute : async(Discord, client, message, args, InvalidUsage, MsgError) => {
    const embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setFooter(`Requested by ${message.author.tag}`)
    .setTimestamp()
    if(!args[0]) {
      const emojis = {
        info: '❓',
        economy: '💰',
        config: `:wrench:`,
        management: '👷',
        music: '🎵',
        image: '📷',
        piratesera: '🎮',
      }
      readdirSync('./commands/').forEach(dir => {
        const emoji = emojis[dir] ? emojis[dir] : '';
        if(['dev'].includes(dir)) return;
        embed.setTitle(`Command Categories`)
        embed.setDescription(`Type \`${client.prefix}help [category]\` to get all the commands in that category`)
        embed.addField(`__${emoji} ${dir.toUpperCase()} ${emoji}__`, `\`${client.prefix}help ${dir.toLowerCase()}\``)
      })
    } else {
      let category = args[0].toLowerCase();
      const cmd = client.commands.get(category);
      if(cmd) {
      if([cmd.dev, cmd.hidden].includes(true)) return message.channel.send(`That is not a real command!`);
        embed.setTitle(`__${cmd.name.replace(cmd.name[0], cmd.name[0].toUpperCase())} Info__`)
        embed.addFields({
            name: 'Description', value: cmd.description ? cmd.description : 'No Command Description'
        }, {
            name: 'Aliases', value: cmd.aliases.length ? `\`${cmd.aliases.join('\`, \`')}\`` : 'No Command Aliases'
        }, {
            name: 'Usage', value: cmd.usage ? `\`${client.prefix}${cmd.name} ${cmd.usage}\`` : `\`${client.prefix}${cmd.name}\``
        }, {
            name: 'Cooldown', value: cmd.cooldown ? `\`${cmd.cooldown}s\`` : 'No Command Cooldown'
        }, {
            name: 'Permissions', value: cmd.permissions.length ? `\`${cmd.permissions.join('\`, \`')}\`` : 'No Command Permissions'
        })
      } else {
        let dirs = [];
        readdirSync(`./commands/`).forEach(dir => {
            dirs.push(dir);
        })
        if(!dirs.includes(category)) return new MsgError(`That is not a real category`)

        readdirSync(`./commands/${category}/`).forEach(cmds => {
            if(!cmds) return new MsgError(`This category doesn't have any commands currently`)

            let command = require(`../../commands/${category}/${cmds}`);
            
            if(!command.name || command.hidden && command.hidden == true || command.dev && command.dev == true) return;
            
            embed.setTitle(`__${category} Commands__`)
            embed.setDescription(`Type \`${client.prefix}help [command]\` for more info about that command!`)
            embed.addFields({name: `__${command.name.toUpperCase()}__`, value: `\`${client.prefix}help ${command.name}\``, inline: true})
        })
      }
    }
    message.channel.send({ embeds: [embed] })
  }
}