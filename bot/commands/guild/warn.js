

const { MessageEmbed } = require("discord.js")
const logger = new (require("../../../localModules/logger"))("BotCMD:ping.js")
let config = require("../../../config")
let botf = require("../../botLocalModules/botFunctions")

module.exports = {
    commandInformations: {
        name: "warn",
        description: "Ajoute un avertissement à un utilisateur",
        permisionsNeeded: {
            bot: ["ADMINISTRATOR"],
            user: ["MANAGE_MESSAGES"]
        },
        rolesNeeded: [],
        superAdminOnly: false,
        disabled: false,
        indev: false,
        hideOnHelp: false
    },
    execute: function(bot, command, args, data, message,b,c,d,e,f,g,h) {
    
        let the_member = message.mentions.members.first()
        let reason = (args.length > 1 ? args.slice(1).join(" ") : null)
    
        
        if(!the_member) return message.inlineReply(`Veuillez mentionner un utilisateur a warn.`)
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.inlineReply(`:x: Il vous manque la permission \`MANAGE_MESSAGES\` `)
    
        data.warnMember(the_member.id,reason,message.author)
        data.getWarnsOfMembner
        if(reason) {
            message.inlineReply(`✔ **${ (the_member.nickname || the_member.user.tag) }** a été warn avec comme raison: \`${reason}\`. `)
        } else {
            message.inlineReply(`✔ **${ (the_member.nickname || the_member.user.tag) }** a été warn.`)
        }
        return;
    }
}