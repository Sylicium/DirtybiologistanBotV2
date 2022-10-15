

const { Iterator } = require("cli-color/throbber")
const Discord = require("discord.js")
const logger = new (require("../../localModules/logger"))("BotCMD:ping.js")

module.exports = {
    commandInformations: {
        commandDatas: {
            name: "test",
            description: "Commande de test",
            dmPermission: false,
            type: Discord.ApplicationCommandType.ChatInput,
            options: []
        },
        canBeDisabled: false,
        permisionsNeeded: {
            bot: ["VIEW_CHANNEL","SEND_MESSAGES"],
            user: []
        },
        rolesNeeded: [],
        superAdminOnly: false,
        disabled: false,
        indev: false,
        hideOnHelp: false
    },
    execute: async (Modules, bot, interaction, data, a,b,c,d,e,f,g,h) => {

        let the_id = interaction.user.id
        
        await interaction.reply(`beta testeur: ${the_id} = ${Modules.botf.isBetaTester(the_id)}`)

    }
}
