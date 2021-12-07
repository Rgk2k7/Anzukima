module.exports = {
  name: 'eval',
  aliases: [],
  permissions: [],
  cooldown: 5,
  argsreq: 1,
  usage: '<code>',
  description: 'Evaluate code.',
  category: 'dev',
  dev: true,

  execute : async(Discord, client, message, args, InvalidUsage, MsgError) => {
    const code = args.join(" ");
    
    if (!code) return message.reply("Please provide some code to evaluate");

      if (message.content.includes('client.token') || message.content.includes('client.token()') || message.content.includes('client.login()') || message.content.includes('process.env.token') ) return message.channel.send('Yeah nice try.')
      

    try{
      const result = await eval(code);
      let output = result;
      if(typeof result !== "string") {
        output = inspect(result);
      }


      message.channel.send(`\`\`\`${output}\`\`\``)
    } catch (error) {
      message.channel.send('`ERROR`');
    }
  //} //else {
    //message.channel.send(':x: **INVALID USER CREDENTIALS**')
  //}
    
  }
}