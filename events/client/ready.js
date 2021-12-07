const database = require('@replit/database');
const db = new database;
const chalk = require('chalk');

module.exports = async (Discord, client) =>{
  console.log(chalk.magenta(`Anzukima is ready!`))

  client.user.setActivity('.help', { type: 'PLAYING' })

  console.log(client.user.id)

}