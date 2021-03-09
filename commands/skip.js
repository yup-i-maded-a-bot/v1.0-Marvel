module.exports.run = (client, message, args, queue, searcher) => {
    const serverQueue = queue.get(message.guild.id)
    if(!message.member.voice.channel)
    return message.channel.send("You need to join the voice chat first");
    if(!serverQueue)
    return message.channel.send("No music is currently playing!");


    let usersC = message.member.voice.channel.members.size;
    let required = Math.ceil(usersC/2)

    if(serverQueue.skipVotes.includes(message.member.id))
        return message.channel.send("⏩ You already Voted for skip!")

    serverQueue.skipVotes.push(message.member.id)
        message.channel.send(`⏩ You voted to skip the song ${serverQueue.skipVotes.length}/${required} votes`)

    
    if(serverQueue.skipVotes.length >= required){
        serverQueue.connection.dispatcher.end();
        serverQueue.skipVotes = [];
        message.channel.send("⏩ Song has been skipped")
    }
}

module.exports.config = {
    name: "skip",
    aliases: ["sk"]
}
