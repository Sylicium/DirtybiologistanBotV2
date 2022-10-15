

const { MessageEmbed } = require("discord.js")
const logger = new (require("../../../localModules/logger"))("BotCMD:ping.js")

module.exports = {
    commandInformations: {
        name: "mywarn",
        description: "Permet de voir la liste des warns que vous avez reçus.",
        canBeDisabled: true,
        permisionsNeeded: {
            bot: [],
            user: []
        },
        rolesNeeded: [],
        superAdminOnly: false,
        disabled: false,
        indev: false,
        hideOnHelp: false
    },
    execute: async function(Modules, bot, command, args, data, message,b,c,d,e,f,g,h) {

        let msg = await message.inlineReply(`${Modules.config.emojis.loading.tag} Récupération de vos warns...`)

        let allWarns = data.getWarnsOfMember(message.author.id)
        if(allWarns.length == 0) {
            msg.edit(`Vous n'avez aucun warns.`)
        } else {
            let warnList = []
            for(let i in allWarns) {
                let w = allWarns[i]
                warnList.push(`${parseInt(i)+1}: \`${Modules.somef.formatDate(w.timestamp, "DD/MM/YYYY à hh:mm:ss")}\` | Auteur: \`${w.warnAuthor.tag}\` | Raison: \`${w.reason}\` `)
            }
            msg.edit("",
                new MessageEmbed()
                    .setTitle(`De ${message.member.nickname || message.author.tag}`)
                    .setDescription(`${warnList.join("\n")}`)
                    .setFooter(`${Modules.config.bot.embedFooterDot} Vous avez ${allWarns.length} warns sur le serveur`)
            )
            //message.channel.send(`**Warns de ${message.member.nickname || message.author.tag}**\n${warnList.join("\n")}\n\n -> ${allWarns.length} warns`)
        }
        return;

    }
}