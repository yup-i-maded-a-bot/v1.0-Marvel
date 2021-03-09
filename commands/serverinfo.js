const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js')

module.exports.run = (client, message, args, queue, searcher) => {
    function checkDays(date) {
        let now = new Date();
        let diff = now.getTime() - date.getTime();
        let days = Math.floor(diff / 86400000);
        return days + (days == 1 ? " day" : " days") + " ago";
    };
    let verifLevels = ["None", "Low", "Medium", "(╯°□°）╯︵  ┻━┻", "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻"];
    let region = {
        "brazil": ":flag_br: Brazil",
        "eu-central": ":flag_eu: Central Europe",
        "singapore": ":flag_sg: Singapore",
        "us-central": ":flag_us: U.S. Central",
        "sydney": ":flag_au: Sydney",
        "us-east": ":flag_us: U.S. East",
        "us-south": ":flag_us: U.S. South",
        "us-west": ":flag_us: U.S. West",
        "eu-west": ":flag_eu: Western Europe",
        "vip-us-east": ":flag_us: VIP U.S. East",
        "london": ":flag_gb: London",
        "amsterdam": ":flag_nl: Amsterdam",
        "hongkong": ":flag_hk: Hong Kong",
        "russia": ":flag_ru: Russia",
        "southafrica": ":flag_za:  South Africa",
        "india": ":flag_in:  India"
    }
    const embed = new Discord.MessageEmbed()
  .setAuthor(message.guild.name, message.guild.iconURL)
  .addField("Name", message.guild.name, true)
  .addField("ID", message.guild.id, true)
  .addField("Verification Level", message.guild.verificationLevel, true)
  .addField('Member Count', `${message.guild.memberCount}`, true)
  .addField("Channels", message.guild.channels.cache.size, true)
  .addField("Roles", message.guild.roles.cache.size, true)
 
  .addField("Creation Date", `${message.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(message.channel.guild.createdAt)})`, true)
  .addField("Region", region[message.guild.region], true)
  .setThumbnail(message.guild.iconURL())

  message.channel.send({embed});
};









module.exports.config = {
    name: "serverinfo",
    aliases: ["sinfo"]
}
