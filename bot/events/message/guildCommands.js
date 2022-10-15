
const Database = require("../../../localModules/database");
const logger = new (require("../../../localModules/logger"))()
const fs = require("fs");
const { config } = require("process");
let somef = require("../../../localModules/someFunctions")
let botf = require("../../botLocalModules/botFunctions")


function sendErrorMsg(Modules, bot, message, err) {
    let logged_err = botf.logErrorOnDiscord(err)
    message.inlineReply(`❌ Une erreur est survenue à l'éxécution du fichier de la commande:\`\`\`js\n${err} \`\`\`Si l'erreur persiste veuillez contacter l'assistance avec le code suivant: \`${logged_err.id || "Une erreur est survenue"}\` `)
}

module.exports.onEvent = async (Modules, bot, message,b,c,d,e,f,g,h) => {

    if(!message.guild) return;
    if(message.author.bot) return;

    let data = await Database.getGuildDatas(message.guild.id)

    data.newMessageForStats()

    //console.log("les data: ",data)

    logger.debug("Got message: "+message.content)

    
    let args = message.content.slice(data.get.prefix.length).split(' ');
    let command = args.shift().toLowerCase();

    //logger.debug("got account: "+JSON.stringify(await message.member.dbg.getAccount(),null,4))

    // ==== commands file (begin) ====
    if (message.content.startsWith(`${data.get.prefix}`)) {

        let file_name = `${message.content.split(' ')[0].replace(data.get.prefix, '')}.js`;

        if(fs.existsSync('./bot/commands/guild/' + file_name)) {
            try {
                let cmd = bot.commands.guildCommands.get(file_name)
                
                if(!botf.canExecuteCommand(message, cmd).canExecute) return;
                
                if(!botf.canExecuteCommand(message, cmd).canExecute) return;
                
                
                cmd.execute(Modules, bot, command, args, data, message,b,c,d,e,f,g,h).catch(e => {
                    logger.error(e)
                    return sendErrorMsg(bot, message, e)
                })
                return;
            } catch(err) {


                let addText = ""
                if(`${err}` == "TypeError: Cannot read property 'catch' of undefined") {
                    if(somef.isSuperAdmin(message.author.id)) {
                        addText = "\n❕ > L'erreur provient sûrement du fait que rien n'est précisé dans dans le return de la commande.\n❕ > Cette erreur a été affichée car vous êtes un SuperAdmin." // la fonction de la commande ne retourne rien alors aucun .catch n'est possible
                        logger.error(err)
                        return message.inlineReply(`❌ Une erreur est survenue à l'éxécution du fichier de la commande:\`\`\`js\n${err}${addText}\`\`\``).then(msg => {
                            msg.react("🗑")
                            msg.awaitReactions((reaction, user) => user.id == message.author.id && (["🗑"].indexOf(reaction.emoji.name) != -1), {max: 1, time: 60*1000 })
                                .then(async collected => {
                                    let react = collected.first().emoji.name
                                    if (react == '🗑') {
                                        msg.delete()
                                    }
                                }).catch((e) => {
                                    msg.reactions.removeAll().catch(err => {});
                                    return;
                                })
                        })
                    } else {
                        return;
                        logger.error(err)
                        return sendErrorMsg(bot, message, err)
                    }
                } else {
                    logger.error(err)
                    return sendErrorMsg(bot, message, err)
                }
            }
        }
    }
    // ==== commands file (end) ====
    
    /*
    // ==== commands file (begin) ====
    if (message.content.startsWith(`${data.json.prefix}`)) {

        let file_name = `${message.content.split(' ')[0].replace(data.json.prefix, '')}.js`;

        if(fs.existsSync('./bot/commands/guild/' + file_name)) {
            try {
                bot.commands.guildCommands.get(file_name.replace('.js', '')).execute(bot, message,b,c,d,e,f,g,h)
                return;
            } catch(err) {
                logger.error(err)
                return message.inlineReply(`Une erreur est survenue à l'éxécution du fichier de la commande:\`\`\`js\n${err} \`\`\` `)
            }
        }
    }
    // ==== commands file (end) ====
    */



}