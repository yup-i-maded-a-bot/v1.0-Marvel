module.exports.run = (client, message, args, queue, searcher) => {
    const serverQueue = queue.get(message.guild.id)
    if (!serverQueue.connection) 
    return message.channel.send("There is no music currently playing!!")
            if (!message.member.voice.channel) 
        return message.channel.send("you are not in the voice channel!!")
    if(serverQueue.connection.dispatcher.resumed)
        return message.channel.send("⏸️ The song is already playing!!")
    serverQueue.connection.dispatcher.resume()
    message.channel.send("⏸️ The song has been resumed!!")     
}

module.exports.config = {
    name: "resume",
    aliases: ["r","rs"]
}
