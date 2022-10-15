

const Discord = require("discord.js")
const logger = new (require("../../localModules/logger"))("BotCMD:ping.js")

module.exports = {
    commandInformations: {
        commandDatas: {
            name: "ping",
            description: "Renvoie la latence du bot et de l'api.",
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
        
        let latency = Date.now() - interaction.createdTimestamp

        let ephemeral = false
        
        if(latency < 0) {
            return interaction.reply({ephemeral:ephemeral, content:`**:ping_pong: Latency is ${latency}ms. API Latency is ${Math.round(bot.ws.ping)}ms. ❔**`})
        } else if(latency < 400) {
            return interaction.reply({ephemeral:ephemeral, content:`**:ping_pong: Latency is ${latency}ms. API Latency is ${Math.round(bot.ws.ping)}ms. :green_circle:**`})
        } else if(latency < 700) {
            return interaction.reply({ephemeral:ephemeral, content:`**:ping_pong: Latency is ${latency}ms. API Latency is ${Math.round(bot.ws.ping)}ms. :orange_circle:**`})
        } else if(latency < 1000) {
            return interaction.reply({ephemeral:ephemeral, content:`**:ping_pong: Latency is ${latency}ms. API Latency is ${Math.round(bot.ws.ping)}ms. :red_circle:**`})
        } else {
            return interaction.reply({ephemeral:ephemeral, content:`**:ping_pong: Latency is ${latency}ms. API Latency is ${Math.round(bot.ws.ping)}ms. ⚠**`})
        }

    }
}
