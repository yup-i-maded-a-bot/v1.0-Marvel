const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js')


module.exports.run = async(client, message, args, queue, searcher) => {
    let servers = client.guilds.cache.size; 
    const msg = new Discord.MessageEmbed()                       
    .setTitle("Info")                                   
    .addField("Bot's Owner",`<@809626575016165417>`,inline = true)
    .addField('Servers',`\`${servers}\``,inline = true) 
    .addField("Time since last restart",`\`${process.uptime().toFixed(2)}s\``,inline = true)
    .addField("Invite bot",`[add me]( https://discord.com/oauth2/authorize?client_id=810437235786383360&scope=bot&permissions=8)`,inline = true)
    .addField("version",`\`v1.0\``,inline = true)
    .addField("library",`\`discord.js\``,inline = true)
    .addField('Head Server', `[Ji Community]( https://discord.gg/URyMs7bHH8)`,inline = true)
    .addField('website', `[click here for web!]( https://http://bots.jicoders.com/JImusic/index.html)`,inline = true)
                 
    .setFooter("hmm? yah that's all")
                                                                  
    message.channel.send(msg);                
  
    
}


module.exports.config = {
    name: "info",
    aliases: ["if"]
}

