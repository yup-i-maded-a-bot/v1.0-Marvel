const { MessageEmbed } = require("discord.js");
const { promptMessage } = require("../function");
const Discord = require('discord.js')
const chooseArr = ["🪨", "📄", "✂"];

module.exports.run = async (client, message, args, queue, searcher) => {
        const embed = new Discord.MessageEmbed() 
            .setColor("BLACK")
            .setDescription("React to emoji to choose your move!")
            .setTimestamp()

        const m = await message.channel.send(embed);
        // Wait for a reaction to be added
        const reacted = await promptMessage(m, message.author, 30, chooseArr);

        // Get a random emoji from the array
        const botChoice = chooseArr[Math.floor(Math.random() * chooseArr.length)];

        // Check if it's a win/tie/loss
        const result = await getResult(reacted, botChoice);
        // Clear the reactions
        await m.clearReactions

        embed
        .setDescription("")
        .addField(result, `${reacted} vs ${botChoice}`);
        

        m.edit(embed);

        function getResult(me, clientChosen) {
            if ((me === "🪨" && clientChosen === "✂") ||
                (me === "📄" && clientChosen === "🪨") ||
                (me === "✂" && clientChosen === "📄")) {
                    return "You won!";
            } else if (me === clientChosen) {
                return "It's a tie!";
            } else {
                return "You lost!";
            }
        }
    }


    module.exports.config = {
        name: "rps",
        aliases: ["rps"]
    }
    