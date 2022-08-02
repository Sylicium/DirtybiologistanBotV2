
const Database = require("../../../localModules/database");
const logger = new (require("../../../localModules/logger"))()
const fs = require("fs");
let config = require("../../../config")
let somef = require("../../../localModules/someFunctions")
let botf = require("../../botLocalModules/botFunctions");
const { isNullOrUndefined } = require("util");


function sendErrorMsg(bot, message, err) {
    let logged_err = botf.logErrorOnDiscord(err)
    message.inlineReply(`❌ Une erreur est survenue à l'éxécution du fichier de la commande:\`\`\`js\n${err} \`\`\`Si l'erreur persiste veuillez contacter l'assistance avec le code suivant: \`${logged_err.id || "Une erreur est survenue"}\` `)
}


let alreadyRefreshedSlashCommands = false

let SlashCommandsCollection = []

module.exports.start = (bot) => {

    

}


module.exports.onEvent = async (bot, interaction, a,b,c,d,e,f,g,h) => {

    if(!interaction.guild) return;
    if(interaction.user.bot) return;

    let data = await Database.getGuildDatas(interaction.guild.id)

    logger.debug("Got interaction: "+interaction)

    if(!interaction.isCommand()) return;

    if(!interaction.command) {
        return interaction.reply({
            content: ":x: Commande inconnue. [code#01]",
            ephemeral: true
        })
    }

    /*
    let filtered = SlashCommandsCollection.filter(x => {
        return x.commandInformations.commandDatas.name == interaction.command.name
    })
    */

    let cmd = bot.commands.slashCommands.get(interaction.command.name)

    if(!cmd) {
        return interaction.reply({
            content: `:x: Commande non prise en charge.`,
            ephemeral: true
        })
    }

    cmd.require.execute(bot, interaction, data, a,b,c,d,e,f,g,h)

}