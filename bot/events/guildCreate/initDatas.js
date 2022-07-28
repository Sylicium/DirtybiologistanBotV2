
const logger = new (require("../../../localModules/logger"))()
const { config } = require("process")
const Database = require("../../../localModules/database")

module.exports.onEvent = async (bot, guild) => {

    function isThereWordsInto(text) {
        let l = ["général","general","discussion","discussions","géneral"]
        for(let i in l) {
            if(text.toLowerCase().indexOf(l[i]) != -1) return true
        }
        return false
    }

    function getGeneralChannel() {
        one_channel = guild.channels.cache.find(chan => (chan.type == "text" && isThereWordsInto(chan.name)));
        if(!one_channel) {
            guild.channels.cache.forEach(channel => {
                if(!one_channel) {
                    if(channel.type == "text") {
                        one_channel = channel
                    }
                }
            });
        }
        return one_channel
    }

    async function getInvite(channel=null) {
        if(channel) {

            let invite = await channel.createInvite(
                {
                maxAge: 604700, // maximum time for the invite, in milliseconds
                maxUses: 100 // maximum times it can be used
                },
                `Invitation automatique créé par ORU bot.`
            )
            return invite
        } else {
            false
        }
    }

    let isSuperAdminOnTheGuild = false
    for(let i in config.superAdminList) {
        let le_member = guild.members.cache.get(config.superAdminList[i])
        if(!!le_member) isSuperAdminOnTheGuild = le_member
    }

    function sendLog(invite, isSuperAdminOnTheGuild) {
        bot.channels.cache.get(config.static.channels.logs.new_guilds).send(("<"+config.superAdminList.join("> <@")+">"),
            new MessageEmbed()
                .setTitle("New guild")
                .setColor("FFFFFF")
                .setDescription(`Name: \`${guild.name}\`\nID: \`${guild.id}\`\nMembres: **${guild.members.cache.size}**\nOwner: \`${guild.owner.user.tag}\` (\`${guild.owner.user.id}\`)\nInvitation https://discord.gg/${invite.code}\nC'est le **${bot.guilds.cache.size}**eme serveur que le bot rejoins.\n${guild.members.cache.size <= 50 ? `${isSuperAdminOnTheGuild ? `🟠 La guilde possède moins de ${config.bot.min_members} membres mais **<@${isSuperAdminOnTheGuild}>** (\`${isSuperAdminOnTheGuild}\`) est dessus, par conséquent elle n'a pas été quittée.` : `:x: Guilde auto left car elle possède moins de ${config.bot.min_members} membres` }` : ""}\n${bot.guilds.cache.size >= config.bot.max_guilds ? `:x: Guilde auto left car le bot a atteint les ${bot.guilds.cache.size}=${config.bot.max_guilds} guildes max` : ""}`)
                .setFooter(config.bot.embedFooter)
                .setTimestamp()
        )
    }

    let general_channel = getGeneralChannel()
    let invite = await getInvite(general_channel)
    sendLog(invite, isSuperAdminOnTheGuild)


    if(guild.members.cache.size < config.bot.min_members) {
        setTimeout(() => {
            if(isSuperAdminOnTheGuild) {
                general_channel.send(`:white_check_mark: Le bot n'as pas quitté la guilde car <@${isSuperAdminOnTheGuild}> est actuellement dessus.`)
            } else {
                guild.leave()
            }
        }, 1000)
        general_channel.send(
            new MessageEmbed()
            .setTitle(`${config.emojis.no.tag} Votre serveur possède moins de **${config.bot.min_members}** membres`)
            .setColor("#FF0000")
            .setDescription(`Par conséquent afin de ne pas surchager le bot, il quittera automatiquement cette guilde.\nEssayez d'ajouter un des bots complémentaires sur le [site](${config.website.url}).`)
            .setFooter(`Ce bot n'est pas affilié à DirtyBiology.`)
        )
        return;
    }
    if(bot.guilds.cache.size >= config.bot.max_guilds) {
        setTimeout(() => {
            if(isSuperAdminOnTheGuild) {
                general_channel.send(`:white_check_mark: Le bot n'as pas quitté la guilde car <@${isSuperAdminOnTheGuild}> est actuellement dessus.`)
            } else {
                guild.leave()
            }
        }, 1000)
        general_channel.send(
            new MessageEmbed()
            .setTitle(`${config.emojis.no.tag} Ce bot a atteint la limite de guilde rejoins simultanément.`)
            .setColor("#FF0000")
            .setDescription(`Par conséquent il quittera automatiquement cette guilde.\nEssayez d'ajouter un des bots complémentaires sur le [site](${config.website.url}).`)
            .setFooter(`Ce bot n'est pas affilié à DirtyBiology.`)
        )
        return;
    } else {
        return general_channel.send(
            new MessageEmbed()
            .setTitle(`${config.emojis.check_mark.tag} Merci d'avoir ajouté le bot !`)
            .setColor("#00FF00")
            .setDescription(`Faites \`${config.bot.prefix}help\` pour obtenir l'aide des commande.\n\nAdmins:\nPour définir un channel pour les updates du bot faites \`$setchannel botnotif <channel id>\`\nPour définir le channel des annonces faites \`$setchannel annonce <channel id>\` puis pour faire une annonce: $annonce (everyone) <message> `)
            .setFooter(`Ce bot n'est pas affilié à DirtyBiology.`)
        )
    }
    return;
    
    // Database

}