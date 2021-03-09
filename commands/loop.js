module.exports.run = (client, message, args, queue, searcher) => {
    const serverQueue = queue.get(message.guild.id)

    if(args.length < 1) return message.channel.send("Please insert what type of loop you want. v!loop <one/all/off>")

    if (!serverQueue.connection) 
        return message.channel.send("There is no music currently playing!!")      
          if (!message.member.voice.channel) 
        return message.channel.send("you are not in the voice channel!!")


    switch(args[0].toLowerCase()){
      
        case 'all':


        serverQueue.loopall = !serverQueue.loopall;
        serverQueue.loopone = false;

        if (serverQueue.loopall === true) 
            message.channel.send("🔁 Loop ALL has been turned on!!")
        else 
         message.channel.send("🔁 Loop ALL has been turned off!!")

        break;
        case 'one':


            serverQueue.loopone = !serverQueue.loopone;
        serverQueue.loopall = false;

        if (serverQueue.loopone === true) 
            message.channel.send("🔁 Loop ONE has been turned on!!")
        else 
         message.channel.send("🔁 Loop ONE has been turned off!!")


        break;
        case 'off':
            serverQueue.loopall = false;
            serverQueue.loopone = false;

            message.channel.send("🔁 Loop has been turned off!!")
        break;
        default:{
                    message.channel.send("Please specify what to loop  you want?? . ex( vloop one/all/off )!!")
            break;
        }
        
    }
}

module.exports.config = {
    name: "loop",
    aliases: ["l","lp"]
}
