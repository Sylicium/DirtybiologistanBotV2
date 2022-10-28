
const Database = require("../../../localModules/database");
const logger = new (require("../../../localModules/logger"))()
const fs = require("fs");
const { config } = require("process");


function sendErrorMsg(Modules, bot, message, err) {
    let logged_err = Modules.botf.logErrorOnDiscord(err)
    message.inlineReply(`❌ Une erreur est survenue à l'éxécution du fichier de la commande:\`\`\`js\n${err} \`\`\`Si l'erreur persiste veuillez contacter l'assistance avec le code suivant: \`${logged_err.id || "Une erreur est survenue"}\` `)
}

module.exports.onEvent = async (Modules, bot, message,b,c,d,e,f,g,h) => {

    if(!message.guild) return;
    if(message.author.bot) return;

    let data = await Database.getGuildDatas(message.guild.id)

    data.newMessageForStats()


    console.log("les data: ",data)


    if(message.mentions.has(bot.user) || message.content.includes(bot.user.id) || message.content.includes(bot.user.username)) {
        message.reply({
            content: `Hey, mon préfix est \`${data.get.prefix}\`, utilise </help:000> ou \`${data.get.prefix}help\` pour voir la liste des commandes.`
        })
    }




}