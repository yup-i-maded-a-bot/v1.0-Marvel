const Discord = require('discord.js')

module.exports.run = (client, message, args, queue, searcher) => {
    const serverQueue = queue.get(message.guild.id)
    if (!serverQueue.connection) {
    const nomusic = new Discord.MessageEmbed()
    .addField("There is no music currently playing!!")    
    .setColor("BLACK")
    .setFooter("first rock some music boii!!")                   

    return message.channel.send(nomusic)
    }
    if (!message.member.voice.channel) {
    
        const joinvc = new Discord.MessageEmbed()
        .addField("you are not in the voice channel!!")    
        .setColor("BLACK")
        .setFooter("can you listen music without joining vc? maybe you can.")                   
    
        return message.channel.send()
    }
    if(serverQueue.connection.dispatcher.paused)
        return message.channel.send("The song is already paused!!")
    serverQueue.connection.dispatcher.pause()
    message.channel.send("▶️ The song has been paused!!")    
}

module.exports.config = {
    name: "pause",
    aliases: ["p","ps"]
}
