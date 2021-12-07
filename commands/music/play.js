const ytSearch = require('yt-search');
const ytdl = require('ytdl-core');

module.exports = {
  name: 'play',
  aliases: ['pl'],
  permissions: ['SPEAK'],
  cooldown: null,
  argsreq: 1,
  usage: '<keywords>',
  description: 'Play music in a guild voice channel.',
  category: 'music',
  dev: false,

  execute : async(Discord, client, message, args, InvalidUsage, MsgError) => {
    const videoFinder = async (query) => {
      const videoResult = await ytSearch(query);

      return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
    }

    if(message.content.includes('https')) {
      return new MsgError('Urls are currently not supported')
    }

    const video = await videoFinder(args.join(' ')); 

    const voiceDiscord = require('@discordjs/voice');

    let stream;
    
    try {
      stream = ytdl(video.url, { filter: 'audioonly' })
    } catch(err) {
      new MsgError('There was an error')
    }

    const channel = message.member.voice.channel;

    if(!channel){
      return new MsgError('You must be in a voice channel to play music!')
    }

    const player = voiceDiscord.createAudioPlayer();
    const resource = voiceDiscord.createAudioResource(stream);

    const connection = voiceDiscord.joinVoiceChannel({
      channelId: channel.id,
      guildId: message.guild.id,
      adapterCreator: message.guild.voiceAdapterCreator,
    });
    
    player.play(resource)
    connection.subscribe(player);

    player.on(voiceDiscord.AudioPlayerStatus.Idle, () => {
      connection.destroy();
    });

    let embed = new Discord.MessageEmbed()
    .setTitle(`Now Playing!`)
    .setDescription(`[${video.title}](${video.url})`)
    .setImage(video.thumbnail)
    .setColor('BLUE')

    message.channel.send({ embeds: [embed] })
  }
};