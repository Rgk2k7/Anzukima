const Canvas = require('canvas');

module.exports = {
  name: 'canvas',
  aliases: ['c'],
  permissions: [],
  cooldown: null,
  argsreq: null,
  usage: '',
  cooldown: null,
  description: 'Test canvas.',
  category: 'image',
  dev: false,

  execute : async(Discord, client, message, args, InvalidUsage, MsgError) => {
    const canvas = Canvas.createCanvas(700, 250)

    const ctx = canvas.getContext('2d');

    const background = Canvas.loadImage('Anzukima.png')

    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

    const att = new Discord.MessageAttachment(canvas.toBuffer(), 'example.png')

    message.channel.send({ attachments: [att] })
  }
}