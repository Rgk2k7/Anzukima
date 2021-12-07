const commaNumber = require('comma-number')
const { RandInt } = require('@acurrz/node-random-int')
const Database = require('@replit/database');
const db = new Database;
const { sleep } = require('@acurrz/node-sleep');

module.exports = {
  name: 'coinflip',
  aliases: ['cf'],
  permissions: [],
  cooldown: 15,
  argsreq: 2,
  usage: '<coin side> <amount>',
  description: 'Coin flip for money.',
  category: 'economy',
  dev: false,

  execute : async(Discord, client, message, args, InvalidUsage, MsgError) => {
    let userChoice = args[0].toLowerCase()
    let botChoice;
    const amount = parseInt(args[1])
    const wallet = await db.get(`wallet_${message.author.id}`)
    let coins = ['heads', 'tails']
    let coinNum = Math.floor(Math.random() * 2)
    let coin = coins[coinNum]

    if(!userChoice) return

    if(userChoice == 'heads' || userChoice == 'tails' || userChoice == 'h' || userChoice == 't') {
      if(userChoice == 'h'){
        userChoice = 'heads'
      }
      if(userChoice == 't'){
        userChoice = 'tails'
      }

      if(userChoice == 'heads'){
        botChoice = 'tails'
      }
      if(userChoice == 'tails'){
        botChoice = 'heads'
      }


    
      if(amount < 100 ) return new MsgError('You must bet atleast $100');

      if(amount > 10000 ) return new MsgError("You can't bet more than $10,000");

      let flippingEmbed = new Discord.MessageEmbed()
      .setTitle('Flipping')
      .setImage('https://media0.giphy.com/media/PLJ3gbNlkSVDL3IZlp/giphy.gif')
      .setColor('RANDOM')

      let coinFlipEmbed;
      if(userChoice == coin){
        coinFlipEmbed = new Discord.MessageEmbed()
        .setTitle('You Won!')
        .addFields(
          {
            name: "Bot Choice:",
            value: `${botChoice.toLowerCase().replace(botChoice[0], botChoice[0].toUpperCase())}`
          },
          {
            name: "Your Choice:",
            value: `${userChoice.toLowerCase().replace(userChoice[0], userChoice[0].toUpperCase())}`
          },
          {
            name: "Correct Side:",
            value: `${coin.toLowerCase().replace(coin[0], coin[0].toUpperCase())}`
          },
          {
            name: "Reward:",
            value: `$${commaNumber(amount * 2)}`
          }
        )
        .setColor('GREEN')

        await db.set(`wallet_${message.author.id}`, wallet + amount * 2)
      } else {
        coinFlipEmbed = new Discord.MessageEmbed()
        .setTitle('You Lost!')
        .addFields(
          {
            name: "Bot Choice:",
            value: `${botChoice.toLowerCase().replace(botChoice[0], botChoice[0].toUpperCase())}`
          },
          {
            name: "Your Choice:",
            value: `${userChoice.toLowerCase().replace(userChoice[0], userChoice[0].toUpperCase())}`
          },
          {
            name: "Correct Side:",
            value: `${coin.toLowerCase().replace(coin[0], coin[0].toUpperCase())}`
          },
          {
            name: "You Lost:",
            value: `$${commaNumber(amount)}`
          }
        )
        .setColor('RED')

        await db.set(`wallet_${message.author.id}`, wallet - amount)
      }
    

      message.channel.send({ embeds: [flippingEmbed] }).then(async (msg) => {
        await sleep(3000)
        msg.edit({ embeds: [coinFlipEmbed] })
      })
    } else {
      return new MsgError('Thats not a valid side of the coin')
    }
  }
}