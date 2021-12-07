const { Client, Collection, Intents } = require(`discord.js`);
const database = require('@replit/database');
const db = new database;
const Discord = require('discord.js')
const { readdirSync } = require('fs');
const { readFile, writeFile } = require('fs').promises;
const express = require('express')
const port = 3000
const app = express()
let axios = require('axios')

const client = new Client({ intents: 32767 })//ill change it later i just wanna see if it
client.commands = new Collection();
client.aliases = new Collection();
client.author = ['752588020057637035', '737856973218775041', '722302164302692472', '480467224520294411']

app.get('/', (req, res) => {
  res.send('Anzukima Is Online!')
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})

const handlers = ['command_handler', 'event_handler'].forEach(handler =>{
  require(`./handlers/${handler}`)(client, Discord);
});

// axios.get('http://www.roblox.com/games/list-json?sortFilter=1&MaxRows=5').then(games => {
//   games.data.forEach(game => {
//     console.log(`${game.Name}\n`)
//   })
// })



client.login(process.env.TOKEN)