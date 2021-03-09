const Discord = require('discord.js')

module.exports.config = {
    name: "purge",
    aliases: ["clear"]
}


module.exports.run = (client, message, args, queue, searcher) => {
    if (!message.member.hasPermission("MANAGE_MESSAGES")){
        return message.send("You can't delete message.....");
    }

    if(isNaN(args[0]) || parseInt(args[0]) <= 0) {
        return message.send("Yeah.... That's not a number? I also can't delete 0 messages by the way.");
    }

    if (!message.guild.me.hasPermission("MANAGE_MESSAGES","ADMINISTRATOR")){
         return message.send(`Sorryy... I can't delete messages bcz i don't have permisiion to do! give me \`manage messages\` or \`administrator\` role to use this command`);
    }

    let deleteAmount;

    if(parseInt(args[0]) > 100){
        deleteAmount = 100;
    }else{
        deleteAmount = parseInt(args[0]);
    }

    message.channel.bulkDelete(deleteAmount, true)
    .then(deleted => message.channel.send(`I deleted \`${deleted.size}\` messages.`))
    .catch(err => message.reply(`Somethingwent wrong.... ${err}`));

}
