
const config = require("../../../config")
const fs = require("fs")
const Discord = require("discord.js")
const logger = new (require("../../../localModules/logger"))()

module.exports.onEvent = (Modules, bot) => {

    logger.info("⬜ Chargement des slash commandes")

    /*
    bot.commands.slashCommands = new Discord.Collection();
    commandFiles = fs.readdirSync('./bot/commands/guild/').filter(file => file.endsWith('.js'));
    for(let file of commandFiles) {
        //logger.log("file for command: "+file)
        let command = require(`./commands/guild/${file}`);
        bot.commands.slashCommands.set(file, command);
    }
    */

    bot.commands.slashCommands = new Discord.Collection();

    let SlashCommandsCollection = []
    
    try {
        fs.readdirSync("./bot/slashcommands").forEach(file => {
            if(file.endsWith(".js")) {
                try {
                    let fileName = file.split(".")
                    fileName.pop()
                    fileName.join(".")
    
                    temp = require(`../../slashcommands/${fileName}`)
                    SlashCommandsCollection.push({
                        commandInformations: temp.commandInformations,
                        require: temp
                    });
                    bot.commands.slashCommands.set(temp.commandInformations.commandDatas.name, {
                        commandInformations: temp.commandInformations,
                        require: temp
                    });
                    logger.info(`✔ Successfully loaded command ${temp.commandInformations.commandDatas.name}`)
                } catch(e) {
                    logger.warn(`❌ Failed loading command of file /slashcommands/${file}`,e)
                }
            }
        });

        if(config.bot.setApplicationCommandsOnStart) {
            logger.warn("❕ Penser à désactiver le config.bot.setApplicationCommandsOnStart pour ne pas recharger les commandes à chaque démarrage.")
            let commandDatas_ = SlashCommandsCollection.map(x => { return x.commandInformations.commandDatas })
            if(config.bot.setApplicationCommandsInLocal) {
                for(let i in config.bot.setApplicationCommandsInLocal_guilds) {
                    let guild = bot.guilds.cache.get(config.bot.setApplicationCommandsInLocal_guilds[i])
                    try {
                        guild.commands.set(commandDatas_)
                        logger.info(`✔ Successfully reloaded guild commands for ${guild.name} (${guild.id})`)
                    } catch(e) {
                        try {
                            logger.warn(`❌ Failed to reload guild commands for ${guild.name} (${guild.id})`,e)
                        } catch(err) {
                            logger.warn(`❌❌ Failed to reload guild commands for UNKNOW guild`,e)
                        }
                    }
                }
            } else {
                try {
                    bot.application.commands.set(commandDatas_)
                    logger.info(`✔ Successfully reloaded global application commands.`)
                } catch(e) {
                    logger.warn(`❌ Failed to reload global application commands.`,e)
                }
            }
        }
        logger.info("✅ Chargement des slash commandes terminé")

    } catch(e) {
        logger.debug(e)
    }



}