const {MessageEmbed} = require("discord.js");
const randomPuppy = require("random-puppy");

module.exports = {
    name: "meme",
    category: "fun",
    description: "Sevds epic image",
    run: async (client, message, args)  => {
        const subReddits = ["me_irl","meme"];
        const random = subReddits[Math.floor(Math.random() * subReddits.length)];

        const img = await randomPuppy(random);
        const embed = new MessageEmbed()
            .setColor("YELLOW")
            .setImage(img)
            .setTitle(`From /r/${random} 🤣`)
            .setURL(`https://reddit.com/r/${random}`)

            message.channel.send(embed);
    }
}


module.exports.config = {
    name: "meme",
    aliases: ["bruh","lol"]
}