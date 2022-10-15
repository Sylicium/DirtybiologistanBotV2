
const logger = new (require("../../../localModules/logger"))()


function sendErrorMsg(bot, message, err) {
    let logged_err = Modules.botf.logErrorOnDiscord(err)
    message.reply(`❌ Une erreur est survenue à l'éxécution du fichier de la commande:\`\`\`js\n${err} \`\`\`Si l'erreur persiste veuillez contacter l'assistance avec le code suivant: \`${logged_err.id || "Une erreur est survenue"}\` `)
}


let alreadyRefreshedSlashCommands = false

let SlashCommandsCollection = []

module.exports.start = (bot) => {

    

}

/*
module.exports.onEvent = async (bot, interaction, a,b,c,d,e,f,g,h) => {

    if(!interaction.guild) return;
    if(interaction.user.bot) return;

    let data = await Modules.Database.getGuildDatas(interaction.guild.id)

    logger.debug("Got interaction: "+interaction)

    if(!interaction.isCommand()) return;

    if(!interaction.command) {
        return interaction.reply({
            content: ":x: Commande inconnue. [code#01]",
            ephemeral: true
        })
    }

    
    // let filtered = SlashCommandsCollection.filter(x => {
    //     return x.commandInformations.commandDatas.name == interaction.command.name
    // })
    

    let cmd = bot.commands.slashCommands.get(interaction.command.name)

    if(!cmd) {
        return interaction.reply({
            content: `:x: Commande non prise en charge.`,
            ephemeral: true
        })
    }

    cmd.require.execute(bot, interaction, data, a,b,c,d,e,f,g,h)

}
*/

module.exports.onEvent = async (Modules, bot, interaction, a,b,c,d,e,f,g,h) => {

    if(!interaction.guild) return;
    if(interaction.user.bot) return;

    interaction.guild.me_ = () => { return interaction.guild.members.cache.get(bot.user.id) }

    logger.debug("interaction [command]",interaction)

    let data = await Modules.Database.getGuildDatas(interaction.guild.id)

    logger.debug("Got interaction: "+interaction)

    if(!interaction.isCommand()) return;

    console.log("interaction.command",interaction.command)

    let cmd = bot.commands.slashCommands.get(interaction.commandName)

    if(!cmd) {
        return interaction.reply({
            content: ":x: Commande inconnue. [code#01]",
            ephemeral: true
        })
    }

    if(!cmd.require) {
        return interaction.reply({
            content: `:x: Commande inconnue. [code#02]`,
            ephemeral: true
        })
    }

    let hasPerm_bot1 = Modules.botf.checkPermissionsInChannel(
        [ "VIEW_CHANNEL", "SEND_MESSAGES" ].concat(cmd.require.commandInformations.permisionsNeeded.bot),
        interaction.guild.me_(),
        interaction.channel,
        true
    )
    
    let hasPerm_bot2 = Modules.botf.checkPermissions(cmd.require.commandInformations.permisionsNeeded.bot, interaction.guild.me_(), true)
    let hasPerm_bot = {
        havePerm: hasPerm_bot1.havePerm && hasPerm_bot2.havePerm,
        missingPermissions: Modules.somef.removeDuplicates(hasPerm_bot1.missingPermissions.concat(hasPerm_bot2.missingPermissions))
    }

    //logger.debug(`BOT checking perms: ${cmd.require.commandInformations.permisionsNeeded.bot} : `,hasPerm_bot)
    let hasPerm_user = Modules.botf.checkPermissions(cmd.require.commandInformations.permisionsNeeded.user, interaction.member)
    //logger.debug(`BOT checking perms: ${cmd.require.commandInformations.permisionsNeeded.user} : `,hasPerm_user)

    if(!hasPerm_bot.havePerm) {
        return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor("FF0000")
                    .setTitle(`🤖 Aie.. Le bot manque de permissions!`)
                    .setDescription(`Il a besoin des permissions suivantes:\n${hasPerm_bot.missingPermissions.map((x) => {
                        return `\`${x}\``
                    }).join(", ")}`)
                    .setFooter({ text: `Essayez de contacter un administrateur.` })
            ],
            ephemeral: false
        }).then(() => { }).catch(e => {
            interaction.reply({
                content: [
                    `**🤖 Aie.. Le bot manque de permissions!**`,
                    `Il a besoin des permissions suivantes:`,
                    `${hasPerm_bot.missingPermissions.map((x) => {
                        return `\`${x}\``
                    }).join(", ")}`,
                    ``,
                    `_Essayez de contacter un administrateur._`
                ].join("\n")
            })
        })
    }
    if(!hasPerm_user.havePerm && !Modules.somef.isSuperAdmin(interaction.user.id)) {
        return interaction.reply({
            content: `⛔ Halte! Tu n'a pas la permission d'utiliser cette commande.\nIl te manque une de ces permissions: ${cmd.require.commandInformations.permisionsNeeded.user.map((x) => {
                return `\`${x}\``
            }).join(", ")}`,
            ephemeral: true
        })
    }

    /*
    let filtered = SlashCommandsCollection.filter(x => {
        return x.commandInformations.commandDatas.name == interaction.command.name
    })
    */

    

    if(cmd.require.commandInformations.superAdminOnly && !Modules.somef.isSuperAdmin(interaction.user.id)) {
        return interaction.reply({
            content: `⛔ Commande SUPER_ADMIN uniquement.`,
            ephemeral: true
        }) 
    }
    if(cmd.require.commandInformations.disabled && !Modules.somef.isSuperAdmin(interaction.user.id)) {
        return interaction.reply({
            content: `⛔ Commande désactivée.`,
            ephemeral: true
        }) 
    }
    if(cmd.require.commandInformations.indev && !Modules.somef.isSuperAdmin(interaction.user.id)) {
        return interaction.reply({
            content: `🛠 Commande en développement`,
            ephemeral: true
        }) 
    }

    
    cmd.require.execute(Modules, bot, interaction, data).catch(async err => {
        logger.warn(`Command crashed`,err)
        let the_error_msg = {
            content: "",
            embeds: [
                new Modules.Discord.EmbedBuilder()
                    .setTitle(`:x: Woops, looks like the command crashed.`)
                    .setColor("FF0000")
                    .setDescription(`\`\`\`js\n${err.stack}\`\`\``)
            ]
        }
        try {
            await interaction.reply(the_error_msg)
        } catch(e) {
            await interaction.editReply(the_error_msg)
        }
    })
}