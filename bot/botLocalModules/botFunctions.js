
/**
 * @version 2.1.0 // 13/08/2022
 * @author Sylicium
 * @description Module botFunction qui réunit plein de fonction utiles pour le bot discord
 *
*/


const config = require('../../config');
const Discord = require("discord.js")
const Logger = new (require('../../localModules/logger'))()
const somef = require('../../localModules/someFunctions');

let Bot;

module.exports._setBotInstance = (bot) => {
    Bot = bot
}



/**
 * f() : Vérifie si la commande peut etre exécutée avec les permissions du membre et du bot
 * @param {String} message - L'object message
 * @param {Array} user_id - La liste des permissions à vérifier
*/
function canExecuteCommand(message, cmd) {
    /*

    */
    let PermisionsNeeded = cmd.commandInformations.permisionsNeeded
    
    if(cmd.commandInformations.disabled) {
        message.inlineReply(`${config.emojis.no.tag} Impossible d'éxécuter la commande car elle actuellement désactivée sur le bot.`)
        return {
            canExecute: false
        }
    } else if(cmd.commandInformations.indev) {
        message.inlineReply(`${config.emojis.no.tag} Impossible d'éxécuter la commande car est elle est encore en développement.`)
        return {
            canExecute: false
        }
    } else if(false) { // check commande désactivée dans les datas de la guilde
        message.inlineReply(`${config.emojis.no.tag} Impossible d'éxécuter la commande car elle actuellement désactivée sur ce serveur.`)
        return {
            canExecute: false
        }
    }


    let botMissingPermissions = []
    for(let i in PermisionsNeeded.bot) {
        let p = message.guild.me.hasPermission(PermisionsNeeded.bot[i])
        if(!p) botMissingPermissions.push(PermisionsNeeded.bot[i])
        //Logger.log("PermisionsNeeded.bot[i]: "+PermisionsNeeded.bot[i])
        //Logger.log("p "+p)
    }
    if(botMissingPermissions.length != 0) {
        message.inlineReply(`${config.emojis.no.tag} Impossible d'éxécuter la commande car le bot requiert les permissions suivantes:\n\`${botMissingPermissions.join(", ")}\` `)
        return {
            canExecute: false
        }
    }

    
    let userMissingPermissions = []
    for(let i in PermisionsNeeded.user) {
        let p = message.member.hasPermission(PermisionsNeeded.user[i])
        if(!p) userMissingPermissions.push(PermisionsNeeded.user[i])
        //Logger.log("PermisionsNeeded.user[i]: "+PermisionsNeeded.user[i])
        //Logger.log("p "+p)
    }
    if(userMissingPermissions.length != 0) {
        message.inlineReply(`${config.emojis.no.tag} Vous n'avez pas la permission d'utiliser cette commande. Permissions manquantes: \n\`${userMissingPermissions.join(", ")}\` `)
        return {
            canExecute: false
        }
    }

    return {
        canExecute: true
    }

}
module.exports.canExecuteCommand = canExecuteCommand



/**
 * f() : Génère un message d'erreur log pour les admins avec un identifiant unique
 * @param {String} error - L'erreur a log
*/
function logErrorOnDiscord(err) {
    let chan = Bot.channels.cache.get(config.static.channels.logs.errors)
    let id = somef.genHex(8)

    try {

        
        let callerLine;
        try {
            //let s = (new Error()).stack.split("\n")[3].split("\\")
            let s = err.stack.split("\n")[1]
            //callerLine = "\\" + s[s.length-2] + "\\" + s[s.length-1]
            s = s.split("(")[1]
            callerLine = s.slice(0,s.length-1)
            //callerLine = s.slice(s.length-6,s.length+1).join("\\")
            //if(callerLine.substr(-1) == ")") callerLine = callerLine.substr(0, callerLine.length-1)
        } catch(e) {
            callerLine = `<error>`
        }


        chan.send("@everyone",
            new Discord.MessageEmbed()
            .setTitle(`Error: ${id}`)
            .setDescription(`ID: \`${id}\`\nLine: \`${callerLine}\` \nStack: \`\`\`js\n${err.stack}\`\`\` `)
            .setFooter(`ID: ${id}`)
            .setTimestamp()
        )
        return {
            id: id
        }
    } catch(e) {
        console.log(e)
        return {
            error: e,
            id: id
        }
    }

}
module.exports.logErrorOnDiscord = logErrorOnDiscord


/**
 * f() : Renvoie un texte markdown avec l'endroit où la commande n'est pas bonne
 * @param {any} message - Le message
 * @param {Number} argument_int - Le numéro de l'argument concerné
*/
function CmdArgumentErrorMarkdown (message, argument_int) {
    let msg;
    if(message.content) {
        msg = `${message.content}`
    } else {
        msg = `${message}`
    }
    let args = msg.split(" ")
    let command = args.shift()
    if(args[argument_int] == undefined) {
        spaces = 0
    } else {
        spaces = msg.split(args[argument_int])[0].length
    }
    if(!args[argument_int]) {
        spaces = msg.length + 1
    }
    return `\`\`\`diff\n- ${msg}\n  ${" ".repeat(spaces)}^\`\`\``
}
module.exports.CmdArgumentErrorMarkdown = CmdArgumentErrorMarkdown


/**
 * f() : Renvoie un texte markdown avec l'endroit où la commande n'est pas bonne
 * @param {any} message - Le message
 * @param {Number} argument_int - Le numéro de l'argument concerné
*/
function subcommandListText(commands) {
    /*
    commands = {
        "subcommand": "description",
        "subcommand": "description",
        "subcommand": "description"
    }
    */
    let text = ""
    for(let key in commands) {
        text += `\`${key}\` - ${commands[key]}\n`
    }
    return text
}


/**
 * f() : Renvoie l'embed à envoyer en cas d'argument invalide.
 * @param {Object} subcommand_list - La liste des sous-commandes possibles
 * @param {any} message - Le message
 * @param {Number} argument_int - Le numéro de l'argument concerné
*/
function incorrectArgument(subcommand_list, message, argument_int) {
    isArgument = (argument_int != undefined)
    let r_msg
    if(isArgument && message) {
        r_msg = new Discord.MessageEmbed()
            .setDescription(`Argument incorrect: \`${message.content.split(" ")[argument_int+1]}\` ${CmdArgumentErrorMarkdown(message, argument_int)} ${subcommandListText(subcommand_list)}`)
    } else {
        r_msg = new Discord.MessageEmbed()
            .setTitle("Liste des sous-commandes possibles:")
            .setDescription(`${subcommandListText(subcommand_list)}`)
    }
    //return r_msg
    return message.inlineReply(r_msg)
}
module.exports.incorrectArgument = incorrectArgument

/**
 * createMdodal(modalConfiguration): renvoie l'objet de modal créé avec la liste d'option fournie
 * @param {Object} modalConfiguration - La liste des options du modal
*/
function createModal(modalConfiguration) {
    /*
    {
        customId: "ccc",
        title: "titre",
        options: [
            {
                customId: "test",
                label: "coucou",
                style: "short"
            }
        ]
    }
    */

    function getStyleFrom(styleName) {
        if(styleName == "short") {
            return Discord.TextInputStyle.Short
        } else if(styleName == "paragraph") {
            return Discord.TextInputStyle.Paragraph
        }
    }

    let modal = new Discord.ModalBuilder()
		.setCustomId(modalConfiguration.setCustomId)
		.setTitle(modalConfiguration.title);
    
    let allOptionsComponents = modalConfiguration.map((item, index) => {
        return new Discord.ActionRowBuilder().addComponents(
            new Discord.TextInputBuilder()
			.setCustomId(item.customId)
			.setLabel(item.label)
			.setStyle(getStyleFrom(item.style))
        )
    })

    modal.addComponents(...allOptionsComponents)
    
    return modal

}
module.exports.createModal = createModal