module.exports.run = (client, message, args, queue, searcher) => {
    const serverQueue = queue.get(message.guild.id)
    if(!serverQueue)
        return message.channel.send("there is no music Currently playing!")
    if(!message.member.voice.channel)
    return message.channel.send("You need to join the voice chat first!")
    serverQueue.songs = [];

    if(serverQueue.connection.dispatcher.end())
    return message.channel.send("⏹️ Song is now stopped!")
}

module.exports.config = {
    name: "stop",
    aliases: ["s", "st"]
}
