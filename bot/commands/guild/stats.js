

const Discord = require("discord.js")
const logger = new (require("../../../localModules/logger"))("BotCMD:ping.js")

module.exports = {
    commandInformations: {
        name: "stats",
        description: "Affiche toute sortes de statistiques",
        canBeDisabled: true,
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
    execute: async function(Modules, bot, command, args, data, message,b,c,d,e,f,g,h) {
        
        if(args[0] == "here") {
            message.inlineReply(
                new Discord.MessageEmbed()
                    .setTitle(`Statistiques de ${message.guild.name}`)
                    .setColor(Modules.somef.genHex(6))
                    .addFields([
                        {
                            name: "Moyenne de message des 7 derniers jours",
                            value: `**${data.getMessageCountAverageOfWeek().toFixed(0)}** messages/jour`
                        }
                    ])
                    .setFooter(`${Modules.config.bot.embedFooterDot} Statistiques générées le`)
                    .setTimestamp()
            )
            return;
        } else {
            return Modules.botf.incorrectArgument({
                "here": "Statistiques de ce serveur discord"
            }, message, 0)
        }
    }
}
