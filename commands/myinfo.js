const { MessageEmbed } = require('discord.js')
const Commando = require('discord.js-commando')

module.exports.run = async(client, message, args, queue, searcher) => {
    const { guild, channel } = message

    const user = message.mentions.users.first() || message.member.user
    const member = guild.members.cache.get(user.id)

    let servers = client.guilds.cache.size; 

    const embed = new MessageEmbed()
      .setAuthor(`User info of ${user.username}`, user.displayAvatarURL())
      .addField('User tag',`${user.username}`)
      .addField('is bot?',`${user.bot}`)
      .addField('Nickname',`${member.nickname || 'None'}`)
      .addField('Joined Server',`${new Date(member.joinedTimestamp).toLocaleDateString()}`)
      .addField('Joined Discord',`${new Date(user.createdTimestamp).toLocaleDateString()}`)
      .addField('roles',`${member.roles.cache.size - 1}`)
      .setThumbnail(`${user.avatarURL()}`)
        
      
    channel.send(embed)
   
  }


  
  module.exports.config = {
    name: "myinfo",
    aliases: ["mydetail"]
}
