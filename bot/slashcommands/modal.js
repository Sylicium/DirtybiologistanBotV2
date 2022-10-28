const Discord = require("discord.js")
const logger = new (require("../../localModules/logger"))("BotCMD:ping.js")

module.exports.commandInformations = {
    commandDatas: {
        name: "modal",
        description: "Envoie un modal",
        dmPermission: false,
        type: Discord.ApplicationCommandType.ChatInput,
        options: []
    },
    canBeDisabled: false,
    permisionsNeeded: {
        bot: ["SEND_MESSAGES"],
        user: []
    },
    rolesNeeded: [],
    superAdminOnly: true,
    disabled: false,
    indev: false,
    hideOnHelp: false
}
execute = async (Modules, bot, interaction, data, a,b,c,d,e,f,g,h) => {

    let modal = Modules.botf.createModal({
        customId: "suggest",
        title: "Proposer une suggestion",
        options: [
            {
                customId: "suggestion",
                label: "Quelle est votre suggestion ?",
                style: "paragraph",
                minLength: 10,
                placeholder: "Je propose de ...",
                required: true
            }
        ]
    })

    
    await interaction.showModal(modal);

}

module.exports.execute = execute
