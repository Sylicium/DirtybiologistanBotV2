

const Discord = require("discord.js")
const logger = new (require("../../../localModules/logger"))("BotCMD:ping.js")

module.exports = {
    commandInformations: {
        name: "help",
        description: "Affiche la liste des commandes.",
        canBeDisabled: false,
        permisionsNeeded: {
            bot: ["SEND_MESSAGES"],
            user: []
        },
        rolesNeeded: [],
        superAdminOnly: false,
        disabled: false,
        indev: false,
        hideOnHelp: false
    },
    execute: async function(Modules, bot, command, args, data, message,b,c,d,e,f,g,h) {

        function isStaffCmd(infos) {
            if(Modules.somef.any(infos.permisionsNeeded.user, [
                'KICK_MEMBERS',
                'BAN_MEMBERS',
                'ADMINISTRATOR',
                'MANAGE_CHANNELS',
                'MANAGE_GUILD',
                'MANAGE_MESSAGES',
                'MUTE_MEMBERS',
                'DEAFEN_MEMBERS',
                'MOVE_MEMBERS',
                'MANAGE_NICKNAMES',
                'MANAGE_ROLES',
                'MANAGE_WEBHOOKS',
                'MANAGE_EMOJIS_AND_STICKERS',
                'MANAGE_EVENTS',
                'MANAGE_THREADS',
                'MODERATE_MEMBERS'
              ], false)) {
                return {
                    staff: true
                }
            }
            return {
                staff: false
            }
        }

        let all_icons = [
            {
                name: "indev",
                icon: "🍪",
                description: "Commande en cours de développement"
            },
            {
                name: "disabled",
                icon: "🚫",
                description: "Commande désactivée du bot"
            },
            {
                name: "guild_disabled",
                icon: "❌",
                description: "Commande désactivée sur ce serveur"
            }
        ]

        let icon_significations = all_icons.map(m => `${m.icon} ${m.description}`).join("\n")
        
        let map = bot.commands.guildCommands.map(_=>_)
        let commands = []
        let staffCommands = []
        let hiddenCommandsCount = 0
        for(let i in map) {
            let c = map[i]
            if(c.commandInformations.hideOnHelp) {
                hiddenCommandsCount++
                continue;
            }
            let is_staff_cmd = isStaffCmd(c.commandInformations)
            let icons = []
            if(c.commandInformations.disabled) icons.push(all_icons.filter((m) => m.name == "disabled")[0].icon)
            //if(c.commandInformations.guild_disabled) icons.push(all_icons.filter((m) => m.name == "guild_disabled")[0].icon)
            // check dans data.disabledCommands
            if(c.commandInformations.indev) icons.push(all_icons.filter((m) => m.name == "indev")[0].icon)

            if(is_staff_cmd.staff) {
                staffCommands.push(`${icons.join("")}\`${c.commandInformations.name}\`: *${c.commandInformations.description}*`)
            } else {
                commands.push(`${icons.join("")}\`${c.commandInformations.name}\`: *${c.commandInformations.description}*`)
            }
        }

        message.inlineReply(
            new Discord.MessageEmbed()
            .setTitle(`Liste des commandes`)
            .setColor("#FFFFFF")
            .setDescription(`${icon_significations}\n${Modules.somef.isSuperAdmin(message.author.id) ? `**${hiddenCommandsCount}** commandes sont cachées` : ""}`)
            .addFields([
                {
                    name: "Commandes:",
                    value: commands.join("\n")
                },
                {
                    name: "Commandes de staff:",
                    value: staffCommands.join("\n")
                }
            ])
            .setFooter(Modules.config.bot.embedFooter)
        )
        return;

    }
}