const commaNumber = require('comma-number')
const slotItems = ["🍇", "🍉", "🍌", "🍎", "🍒"];
const Database = require('@replit/database');
const db = new Database;

module.exports = {
  name: 'slots',
  aliases: ['sl'],
  permissions: [],
  cooldown: 15,
  argsreq: 1,
  usage: '<amount>',
  description: 'Slots for amount.',
  category: 'economy',
  dev: false,

  execute : async(Discord, client, message, args, InvalidUsage, MsgError) => {
    
    let wallet = await db.get(`wallet_${message.author.id}`)
    let amount = parseInt(args[0]);
    let win = false;
    
    if (wallet < amount) return new MsgError('You are betting more than you have!');

    let number = []
    for (let i = 0; i < 3; i++) { number[i] = Math.floor(Math.random() * slotItems.length); }

    if (number[0] == number[1] && number[1] == number[2])  { 
        amount *= 9
        win = true;
    } else if (number[0] == number[1] || number[0] == number[2] || number[1] == number[2]) { 
        amount *= 3
        win = true;
    }
    if (win) {
        let slotsEmbed1 = new Discord.MessageEmbed()
            .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nYou won **$${amount * 2}**!`)
            .setColor("GREEN")
        message.channel.send({ embeds: [slotsEmbed1] })
        await db.set(`wallet_${message.author.id}`, wallet + amount)
    } else {
        let slotsEmbed = new Discord.MessageEmbed()
            .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nYou lost **$${amount}**!`)
            .setColor("RED")
        message.channel.send({ embeds: [slotsEmbed] })
        db.set(`wallet_${message.author.id}`, wallet - amount)
    }
  }
}