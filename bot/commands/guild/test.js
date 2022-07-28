

const Discord = require("discord.js")
const logger = new (require("../../../localModules/logger"))("BotCMD:ping.js")
let config = require("../../../config")
let botf = require("../../botLocalModules/botFunctions")

module.exports = {
    commandInformations: {
        name: "test",
        description: "Une commande pour faire des tests",
        canBeDisabled: true,
        permisionsNeeded: {
            bot: [],
            user: []
        },
        rolesNeeded: [],
        superAdminOnly: true,
        disabled: false,
        indev: false,
        hideOnHelp: false
    },
    execute: function(bot, command, args, data, message,b,c,d,e,f,g,h) {

        logger.log("user:",message.author)

        message.inlineReply(":white_check_mark:")
        message.inlineReply("Here's your file", new Discord.MessageAttachment(Buffer.from(`Bonjour ceci est un test $^"'-$^"-é$^'"p($"çà$^ù£¨*ù&1~_`), `${Date.now()}.txt`));

    }
}