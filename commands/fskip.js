module.exports.run = (client, message, args, queue, searcher) => {
    const serverQueue = queue.get(message.guild.id)
    if(!message.member.voice.channel)
    return message.channel.send("You need to join the voice chat first❗❗");
if(!serverQueue)
    return message.channel.send("There is nothing to skip💤");


    let roleN = message.guild.roles.cache.find(role => role.name === "DJ")

    if(!message.member.roles.cache.get(roleN.id))
    return message.channel.send("🚫 you don't have DJ role!!")

if(serverQueue.connection.dispatcher.end())
    return message.channel.send(`The song is skipped ⏭️ by ${message.author.username}`)

serverQueue.skipVotes = [];
}

                                
      
                           

module.exports.config = {
    name: "fskip",
    aliases: ["fs","fsk"]
}




