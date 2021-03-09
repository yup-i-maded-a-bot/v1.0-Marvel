const Discord = require('discord.js')

module.exports.run = (client, message, args, queue, searcher) => {
    const musiccmd = new Discord.MessageEmbed()                       
    .setFooter(`use => before every command!!`)
    .setTitle("MUSIC COMMANDS")                                   
    .addField("->play song name","this plays the song you want to listen")               
    .addField("->stop","it stops the song and bot leaves the voice channel")
    .addField("->pause","it pauses the song that is curently playing")
    .addField("->resume","it resume the paused song and the song started playing the song")
    .addField("->queue","use it to see the queue maded by you")
    .addField("->skip","it skips the song but if there are more than 1 person in voice channel that it will need vote")
    .addField("->fskip","it is force skip only person having DJ role can use it")
    .addField("->loop all","it loops all songs you added in queue")
    .addField("->loop one","it loops only the song that is currently playing")
    .addField("->loop off","it stops loop all and loop one")            
    .addField("->lyrics <artist name>","after that give the song name of that artist")                       
           
        
    .setTimestamp()                               
                 
                                                                  
    message.channel.send(musiccmd);           
    
    const moderation = new Discord.MessageEmbed()                       
    .setFooter(`use -> before every command!!`)
    .setTitle(`OTHER COMMANDS`)
    .addField("->purge"," amount it deletes the messages given by you!!  it comes in moderation")
    .addField("->meme","it shows a meme its here for fun")    
    .addField("->pokedex <pokemon name>","it shows all information about pokemon!")
    .addField("->rps","use it to play rock-paper-scizor we added it on 15/2/2021 we will add more games also so please be with us")  
    .addField("->ttt than tag your oponent","use it to play tic-tac-toe we added it on 15/2/2021 we will add more games also so please be with us")  
     
            
    .setTimestamp()
    message.channel.send(moderation);  

    const games = new Discord.MessageEmbed()                       
    .setFooter(`use -> before every command!!`)
    .setTitle(`info commands`)
    .addField("->info","it shows all information about bot!")
    .addField("->serverinfo","it gives all infoof the server")
    .addField("->myinfo <you can see other persons info also by taging him>","shows all info about the user!")
    .setTimestamp()
    message.channel.send(games);  


}

module.exports.config = {
    name: "help",
    aliases: ["hp"]
}
