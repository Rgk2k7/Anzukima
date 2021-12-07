const commaNumber = require('comma-number')
const { RandInt } = require('@acurrz/node-random-int')
const Database = require('@replit/database');
const db = new Database

module.exports = {
  name: 'search',
  aliases: [],
  permissions: [],
  cooldown: 30,
  argsreq: null,
  usage: '',
  description: 'Search for money.',
  category: 'economy',
  dev: false,

  execute : async(Discord, client, message, args, InvalidUsage, MsgError) => {
    let areas1 = [
      {
        name: "bush",
        desc: "Ouch... Those thorns must hurt."
      },
      {
        name: "bed",
        desc: "You were sleeping on it the entire time..."
      },
      {
        name: "air",
        desc: "Wow... Lemme guess next your going to pull one from behind my ear."
      }
    ]
    let areas2 = [
      {
        name: "discord",
        desc: "Oh right, I searched it for you..."
      },
      {
        name: "freezer",
        desc: "Phew... Thats some pretty cold money."
      },
      {
        name: "trash",
        desc: "Imagine dumpster diving..."
      }
    ]
    let areas3 = [
      {
        name: "dojo",
        desc: "You are lucky your master didn't see you."
      },
      {
        name: "temple",
        desc: "What did you do pray?"
      },
      {
        name: "dm",
        desc: "I knew you could send nitro, but not money?!"
      }
    ]

    let num1 = Math.floor(Math.random() * areas1.length)
    let num2 = Math.floor(Math.random() * areas2.length)
    let num3 = Math.floor(Math.random() * areas3.length)

    let area1 = areas1[num1]
    let area2 = areas2[num2]
    let area3 = areas3[num3]

    let optionsEmbed = new Discord.MessageEmbed()
    .setTitle('Areas')
    .setDescription(`Please choose an area to search:\n\n**${area1.name}** **${area2.name}** **${area3.name}**`)
    .setColor('RANDOM')

    message.channel.send({ embeds: [optionsEmbed] })

    const filter = (m) => m.author.id === message.author.id;

    const collector = new Discord.MessageCollector(message.channel, filter, { time: 10000, max: 1 })

    collector.on('collect', async (m) => {
      if(m.author.id == message.author.id){
        if(m.content.toLowerCase() == area1.name || m.content.toLowerCase() == area2.name || m.content.toLowerCase() == area3.name) {
          const choice = m.content.toLowerCase()
          let reward = new RandInt(1250)
          let rewDisp = commaNumber(reward.int)
          let wallet = await db.get(`wallet_${message.author.id}`)

          if(choice == area1.name) {
            let searchEmbed = new Discord.MessageEmbed()
            .setTitle('Search!')
            .setDescription(`You searched ${area1.name} and gained $${rewDisp}.\n ${area1.desc}`)
            .setColor('RANDOM')

            await db.set(`wallet_${message.author.id}`, wallet + reward.int)

            message.channel.send({ embeds: [searchEmbed] })
          }
          if(choice == area2.name) {
            let searchEmbed = new Discord.MessageEmbed()
            .setTitle('Search!')
            .setDescription(`You searched ${area2.name} and gained $${rewDisp}. ${area2.desc}`)
            .setColor('RANDOM')

            await db.set(`wallet_${message.author.id}`, wallet + reward.int)

            message.channel.send({ embeds: [searchEmbed] })
          }
          if(choice == area3.name) {
            let searchEmbed = new Discord.MessageEmbed()
            .setTitle('Search!')
            .setDescription(`You searched ${area3.name} and gained $${rewDisp}. ${area3.desc}`)
            .setColor('RANDOM')

            await db.set(`wallet_${message.author.id}`, wallet + reward.int)

            message.channel.send({ embeds: [searchEmbed] })
          }
        } else {
          new MsgError('Thats not a valid area!')
        }

        collector.stop()

      }
    })

    
    // 'air', 'discord', 'dm'
    // 'bush', 'bed', 'freezer'
    // 'dojo', 'temple', 'trash'
  }
}