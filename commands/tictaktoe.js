const { tictactoe } = require('reconlx')

module.exports.run = async (client, message, args, queue, searcher) => {
        const member = message.mentions.members.first() 
            if(!member)  return  message.channel.send('Please specify a member')
        
        new tictactoe({
            player_two: member, 
            message: message
        })
    }

    module.exports.config = {
        name: "ttt",
        aliases: ["ttt"]
    }
    