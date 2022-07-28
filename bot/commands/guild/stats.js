

const Discord = require("discord.js")
const logger = new (require("../../../localModules/logger"))("BotCMD:ping.js")
let config = require("../../../config")
let botf = require("../../botLocalModules/botFunctions")
let somef = require("../../../localModules/someFunctions")

module.exports = {
    commandInformations: {
        name: "stats",
        description: "Affiche toute sortes de statistiques",
        permisionsNeeded: {
            bot: ["SEND_MESSAGES"],
            user: []
        },
        rolesNeeded: [],
        superAdminOnly: false,
        disabled: false,
        indev: false,
        hideOnHelp: false
    },
    execute: async function(bot, command, args, data, message,b,c,d,e,f,g,h) {
        
        if(args[0] == "here") {
            message.inlineReply(
                new Discord.MessageEmbed()
                    .setTitle(`Statistiques de ${message.guild.name}`)
                    .setColor(somef.genHex(6))
                    .addFields([
                        {
                            name: "Moyenne de message des 7 derniers jours",
                            value: `**${data.getMessageCountAverageOfWeek().toFixed(0)}** messages/jour`
                        }
                    ])
                    .setFooter(`${config.bot.embedFooterDot} Statistiques générées le`)
                    .setTimestamp()
            )
            return;
        } else {
            return botf.incorrectArgument({
                "here": "Statistiques de ce serveur discord"
            }, message, 0)
        }
    }
}
