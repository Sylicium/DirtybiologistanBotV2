

const Discord = require("discord.js")
const logger = new (require("../../../localModules/logger"))("BotCMD:ping.js")

module.exports = {
    commandInformations: {
        name: "ping",
        description: "Permet de voir la latence du bot et de l'API",
        canBeDisabled: false,
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
    execute: function(Modules, bot, command, args, data, message,b,c,d,e,f,g,h) {

        logger.log("ping.js guild extended:",message.guild.dbg)

        let latency = Date.now() - message.createdTimestamp
        
        if(latency < 0) {
            return message.channel.send(`**:ping_pong: Latency is ${latency}ms. API Latency is ${Math.round(bot.ws.ping)}ms. ❔**`)
        } else if(latency < 400) {
            return message.channel.send(`**:ping_pong: Latency is ${latency}ms. API Latency is ${Math.round(bot.ws.ping)}ms. :green_circle:**`)
        } else if(latency < 700) {
            return message.channel.send(`**:ping_pong: Latency is ${latency}ms. API Latency is ${Math.round(bot.ws.ping)}ms. :orange_circle:**`)
        } else if(latency < 1000) {
            return message.channel.send(`**:ping_pong: Latency is ${latency}ms. API Latency is ${Math.round(bot.ws.ping)}ms. :red_circle:**`)
        } else {
            return message.channel.send(`**:ping_pong: Latency is ${latency}ms. API Latency is ${Math.round(bot.ws.ping)}ms. ⚠**`)
        }

        return;

        message.reply(
            new Discord.EmbedBuilder()
                .setDescription(`${Modules.config.emojis.loading.tag} Pinging...`)
        ).then(msg => {
            let latency2 = msg.createdTimestamp - message.createdTimestamp

            let msgPattern = `{{symbol}} La latence est de ${latency}ms\nLatence de l'API: ${Math.round(bot.ws.ping)}ms`

            if(latency < 0) {
                return msg.edit(
                    new Discord.EmbedBuilder()
                        .setColor('00ff00')
                        .setDescription(msgPattern.replace("{{symbol}}","❔"))
                )
            } else if(latency < 400) {
                return msg.edit(
                    new Discord.EmbedBuilder()
                        .setColor('00ff00')
                        .setDescription(msgPattern.replace("{{symbol}}",":green_circle:"))
                )
            } else if(latency < 700) {
                return msg.edit(
                    new Discord.EmbedBuilder()
                        .setColor('ff7f00')
                        .setDescription(msgPattern.replace("{{symbol}}",":orange_circle:"))
                )
            } else if(latency < 1000) {
                return msg.edit(
                    new Discord.EmbedBuilder()
                        .setColor('ff0000')
                        .setDescription(msgPattern.replace("{{symbol}}",":red_circle:"))
                )
            } else {
                return msg.edit(
                    new Discord.EmbedBuilder()
                        .setColor('ff0000')
                        .setDescription(msgPattern.replace("{{symbol}}","⚠"))
                )
            }

        })
    }
}