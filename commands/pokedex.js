const Discord = require('discord.js')
const { get } = require("request-promise-native");
const { MessageEmbed } = require("discord.js")

module.exports.run = (client, message, args, queue, searcher) => {
const options = {
    url: `https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/pokedex.php?pokemon=${args.join(" ")}`,
    json: true
    
  }


  message.channel.send("Asking information from pokemon").then(msg => {
    get(options).then(body => {
      
      let embed = new MessageEmbed()
      .setAuthor(body.name, `https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/${body.images.typeIcon}`)
      .setDescription(body.info.description)
      .setThumbnail(`https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/${body.images.photo}`)
    
      .setFooter(`Weakness of pokemon - ${body.info.weakness}`, `https://courses.cs.washington.edu/courses/cse154/webservices/pokedex/${body.images.weaknessIcon}`)
      
      message.channel.send(embed)
      msg.delete()
    })
  })

}


module.exports.config = {
    name: "pokedex",
    aliases: ["pokedex"]
}
