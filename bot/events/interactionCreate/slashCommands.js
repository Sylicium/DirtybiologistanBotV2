
const Database = require("../../../localModules/database");
const logger = new (require("../../../localModules/logger"))()
const fs = require("fs");
let config = require("../../../config")
let somef = require("../../../localModules/someFunctions")
let botf = require("../../botLocalModules/botFunctions")


function sendErrorMsg(bot, message, err) {
    let logged_err = botf.logErrorOnDiscord(err)
    message.inlineReply(`❌ Une erreur est survenue à l'éxécution du fichier de la commande:\`\`\`js\n${err} \`\`\`Si l'erreur persiste veuillez contacter l'assistance avec le code suivant: \`${logged_err.id || "Une erreur est survenue"}\` `)
}

let SlashCommandsCollection = []

module.exports.start = () => {

    logger.debug("ok")
    try {
    fs.readdirSync("./bot/slashcommands").forEach(file => {
        logger.debug(`✅ log: file:`,file)
        if(file.endsWith(".js")) {
            let fileName = file.split(".")
            fileName.pop()
            fileName.join(".")

            temp = require(`../../slashcommands/${fileName}`)
            SlashCommandsCollection.push({
                commandInformations: temp.commandInformations,
                require: temp
            });
        }
        logger.debug(`✅ log2: file:`,file)
    });
} catch(e) {
    logger.debug(e)
}

    logger.debug("config.bot",config.bot)

    if(config.bot.setApplicationCommandsOnStart) {
        logger.debug(`✅ 1`)
        let commandDatas_ = SlashCommandsCollection.map(x => { return x.commandInformations.commandDatas })
        logger.debug(`✅ 1.5`)
        if(config.bot.setApplicationCommandsInLocal) {
            logger.debug(`✅ 2`)
            for(let i in config.bot.setApplicationCommandsInLocal_guilds) {
                try {
                    let guild = bot.guilds.cache.get(config.bot.setApplicationCommandsInLocal_guilds[i])
                    guild.commands.set(commandDatas_)
                    logger.info(`✅ Successfully reloaded guild commands for ${guild.name} (${guild.id})`)
                } catch(e) {
                    logger.info(`❌ Failed to reload guild commands for ${guild.name} (${guild.id})`,e)
                }
            }
        } else {
            logger.debug(`✅ 3`)
            try {
                bot.application.commands.set(commandDatas_)
                logger.info(`✅ Successfully reloaded global application commands.`)
            } catch(e) {
                logger.info(`❌ Failed to reload global application commands.`,e)
            }
        }
    }
}


module.exports.onEvent = async (bot, interaction,b,c,d,e,f,g,h) => {

    if(!interaction.guild) return;
    if(interaction.author.bot) return;

    let data = await Database.getGuildDatas(interaction.guild.id)

    logger.debug("Got interaction: "+interaction)




    let filtered = SlashCommandsCollection.filter(x => {
        return x.commandInformations.commandDatas.name == interaction.command.name
    })
    if(filtered.length == 0) {
        return message.reply({
            content: "Commande introuvable [CODE#001]",
            ephemeral: true
        })
    }

    filtered[0].require.execute(bot, interaction, data, a,b,c,d,e,f,g,h)

}