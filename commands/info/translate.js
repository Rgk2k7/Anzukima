const translate = require('@iamtraction/google-translate');

module.exports = {
  name: 'translate',
  aliases: ['t'],
  permissions: [],
  cooldown: null,
  argsreq: 2,
  usage: '<language><query>',
  description: 'Translate any string.',
  category: 'info',
  dev: false,

  execute : async(Discord, client, message, args, InvalidUsage, MsgError) => {
    let lang = args[0]
    let query = args.join(" ").replace(args[0], '')

    // if (query.includes('.t')) {
    //   query.replace('.t', '')
    // } else if(query.includes('.translate')) {
    //   query.replace('.translate', '')
    // };

    let translated = await translate(query, { from: "auto", to: `${lang}`} )

    let embed = new Discord.MessageEmbed()
    .setTitle('Translated!')
    .addFields(
      {
        name: "Language:",
        value: `${lang}`
      },
      {
        name: "From:",
        value: `${query}`
      },
      {
        name: "To:",
        value: `${translated.text}`
      }
    )
    .setColor('RANDOM')

    message.channel.send({ embeds: [embed] })
  }
}