const ytdl = require('ytdl-core')
const ytpl = require('ytpl')
const Discord = require('discord.js')

module.exports.run = async (client, message, args, queue, searcher) => {
    const vc = message.member.voice.channel;
    if(!vc)
    return message.channel.send("pls join voice chat first❗❗")
    if (args.length < 1)
        return message.channel.send("Please enter something to search")

    let url = args.join(" ");
    if(args.join().match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)){
        await ytpl(url).then(async playlist => {
            message.channel.send(`The playlist: "${playlist.title}" has been added`)
            playlist.items.forEach(async item => {
                await videoHandler(await ytdl.getInfo(item.shortUrl), message, vc, true)
            })
        })
    }
   else{
    let result = await searcher.search(args.join(" "), { type: "video" })
    if(result.first == null)
        return message.channel.send("❌ There are no results found")

    let songInfo = await ytdl.getInfo(result.first.url);
    return videoHandler(songInfo, message, vc)
   }

   async function videoHandler(songInfo, message, vc, playlist = false){
       const serverQueue = queue.get(message.guild.id);
       const song = {
           title: songInfo.videoDetails.title,
           url: songInfo.videoDetails.video_url,
           vLength: songInfo.videoDetails.lengthSeconds,
           thumbnail: songInfo.videoDetails.thumbnail.thumbnails[3].url
       }
       if(!serverQueue){
        const queueConstructor = {
            txtChannel: message.channel,
            vChannel: vc,
            connection: null,
            songs: [],
            volume: 10,
            playing: true,
            loopone: false,
            loopall: false,
            skipVotes: []
        };
        queue.set(message.guild.id, queueConstructor);

        queueConstructor.songs.push(song);

        try{
            let connection = await queueConstructor.vChannel.join();
            queueConstructor.connection = connection;
            play(message.guild, queueConstructor.songs[0]);
        }catch (err){
            console.error(err);
            queue.delete(message.guild.id);
            return message.channel.send(`🚫 Unable to join the voice chat `)
        }
    }else{
        serverQueue.songs.push(song);
        if(playlist) return undefined

        let dur = `${parseInt(song.vLength / 60)}:${song.vLength - 60 * parseInt(song.vLength / 60)}`
      }

   }
   function play(guild, song){
    const serverQueue = queue.get(guild.id);
    if(!song){
        serverQueue.vChannel.leave();
        queue.delete(guild.id);
        return;
    }
    const dispatcher = serverQueue.connection
        .play(ytdl(song.url))
        .on('finish', () =>{
            if (serverQueue.loopone) {
                play(guild, serverQueue.songs[0]);
        }
           else if(serverQueue.loopall){
            serverQueue.songs.push(serverQueue.songs[0])
            serverQueue.songs.shift()
           }else{
               serverQueue.songs.shift()
           }
            play(guild, serverQueue.songs[0]);
        })
        let dur = `${parseInt(serverQueue.songs[0].vLength / 60)}:${serverQueue.songs[0].vLength - 60 * parseInt(serverQueue.songs[0].vLength / 60)}`
        

        const msg = new Discord.MessageEmbed()                       
        .setFooter(`${message.author.username} requested this music!`)
        .setTitle("🎙️ Now Playing: ")                                   
        .addField(serverQueue.songs[0].title,"______")               
        .addField("Song Duration: ",dur)                             
                                                
        .setThumbnail(serverQueue.songs[0].thumbnail)                 
                                                                      
        message.channel.send(msg);                                    


}
}


module.exports.config = {
    name: "play",
    aliases: ["p","pl"]
}