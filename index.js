const { executionAsyncResource } = require('async_hooks');
const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const mongoose = require('mongoose');
 
const { YTSearcher } = require('ytsearcher');
const fs = require('fs')
const searcher = new YTSearcher({
    key: "AIzaSyAI6NtlLDdDiHYf1lE4OJnkQJDrOF0FZ98",
    revealed: true
});
 
const client = new Discord.Client();
 
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir("./commands/", (e, f) => {
    if(e) return console.error(e);
    f.forEach(file =>{
        if(!file.endsWith(".js")) return
        console.log(`${file} has been loaded!`)
        let cmd = require(`./commands/${file}`);
        let cmdName = cmd.config.name;
        client.commands.set(cmdName, cmd)
        cmd.config.aliases.forEach(alias => {
            client.aliases.set(alias,cmdName);
        })
    })
})

const queue = new Map();

client.on("ready", () => {
    console.log("I am online!");

    let servers = client.guilds.cache.size; 
    client.user.setActivity(`${servers} servers | ->help`, { type: 'LISTENING' }).then(presence => console.log(`Activity set to ${presence.activities[0].name}`)).catch(console.error);
   
})

client.on("message", async(message) => {
    const prefix = '->';

    if(!message.content.startsWith(prefix)) return
    
    const serverQueue = queue.get(message.guild.id);
 
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))

    if(!cmd) return

    try {
        cmd.run(client, message, args, queue, searcher);
    } catch (err) {
        return console.error(err)
    }

    async function execute(message, serverQueue){
        let vc = message.member.voice.channel;
        if(!vc){
            return message.channel.send("Please join a voice chat first");
        }else{
            let result = await searcher.search(args.join(" "), { type: "video" })
            const songInfo = await ytdl.getInfo(result.first.url)
 
            let song = {
                title: songInfo.videoDetails.title,
                url: songInfo.videoDetails.video_url
            };
 
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
                    let connection = await vc.join();
                    queueConstructor.connection = connection;
                    play(message.guild, queueConstructor.songs[0]);
                }catch (err){
                    console.error(err);
                    queue.delete(message.guild.id);
                    return message.channel.send(`Unable to join the voice chat ${err}`)
                }
            }else{
                serverQueue.songs.push(song);
                return message.channel.send(`The song has been added ${song.url}`);
            }
        }
    }
    
    
  })

  

client.login("ODEwNDM3MjM1Nzg2MzgzMzYw.YCjofg.b-EIUeK0G8CMExfCN87Xtt8FwTA");
