const { KSoftClient } = require('ksoft.js');

module.exports = {
  name: 'meme',
  aliases: [],
  permissions: [],
  cooldown: null,
  argsreq: null,
  usage: '',
  cooldown: null,
  description: 'Sends a random meme.',
  category: 'image',
  dev: true,

  execute : async(Discord, client, message, args, InvalidUsage, MsgError) => {
    const ksoft = new KSoftClient(process.env.KSOFT);
    let { url, post: { title, subreddit, link, upvotes, downvotes } } = await ksoft.images.meme({ nsfw: false });

    let embed = new Discord.MessageEmbed()
    .setAuthor(`${title}`, message.author.avatarURL)
    .setDescription(`[${subreddit}](${link}) | 👍 **${upvotes}** | 👎 **${downvotes}**`)
    .setTimestamp()
    .setImage(url)
    .setColor('RANDOM')
    .setFooter(`Requested By ${message.author.username}!`);

    message.channel.send({ embeds: [embed] });
  }
}