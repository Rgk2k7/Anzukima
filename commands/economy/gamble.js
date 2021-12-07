const commaNumber = require('comma-number')
const { RandInt } = require('@acurrz/node-random-int')
const Database = require('@replit/database');
const db = new Database;
const { sleep } = require('@acurrz/node-sleep');

module.exports = {
  name: 'gamble',
  aliases: ['bet'],
  permissions: [],
  cooldown: 15,
  argsreq: 2,
  usage: '<dice number> <amount>',
  description: 'Gamble for money.',
  category: 'economy',
  dev: false,

  execute : async(Discord, client, message, args, InvalidUsage, MsgError) => {
    const botChoice = Math.floor(Math.random() * 6);
    const userChoice = parseInt(args[0])
    const amount = parseInt(args[1])
    const wallet = await db.get(`wallet_${message.author.id}`)

    if(userChoice > 6 ) return new MsgError('You must pick a number between 1 and 6');

    if(userChoice < 1) return new MsgError('You must pick a number between 1 and 6');

    if(amount < 250 ) return new MsgError('You must gamble atleast $250');

    if(amount > 75000 ) return new MsgError("You can't gamble more than $75,000");

    let rollingEmbed = new Discord.MessageEmbed()
    .setTitle('Rolling')
    .setImage('https://cdn.dribbble.com/users/6059148/screenshots/14425859/media/3f67e0e620f3818a68a03fdb874b7a56.gif')
    .setColor('RANDOM')

    let diceRollEmbed;
    if(userChoice == botChoice){
      diceRollEmbed = new Discord.MessageEmbed()
      .setTitle('You Won!')
      .addFields(
        {
          name: "Bot Choice:",
          value: `${botChoice}`
        },
        {
          name: "Your Choice:",
          value: `${userChoice}`
        },
        {
          name: "Reward:",
          value: `$${amount * 2}`
        }
      )
      .setColor('GREEN')

      await db.set(`wallet_${message.author.id}`, wallet + amount * 2)
    } else {
      diceRollEmbed = new Discord.MessageEmbed()
      .setTitle('You Lost!')
      .addFields(
        {
          name: "Bot Choice:",
          value: `${botChoice}`
        },
        {
          name: "Your Choice:",
          value: `${userChoice}`
        },
        {
          name: "You Lost:",
          value: `$${amount}`
        }
      )
      .setColor('RED')

      await db.set(`wallet_${message.author.id}`, wallet - amount)
    }
    

    message.channel.send({ embeds: [rollingEmbed] }).then(async (msg) => {
      await sleep(3000)
      msg.edit({ embeds: [diceRollEmbed] })
    })
  }
}