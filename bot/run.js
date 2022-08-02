
/**************/
/* Main file for the bot part
/**************/

const logger = new (require("../localModules/logger"))()
let config = require('../config')
const fs = require("fs")
const Discord = require("discord.js")
let somef = require("../localModules/someFunctions")
const Database = require("../localModules/database")
const botf = require("./botLocalModules/botFunctions")
const pluginManager = require("../localModules/pluginManager")

module.exports.run = () => {


    let bot = require('./botLocalModules/singleton_bot')
    
    bot = new Discord.Client({
        //fetchAllMembers: true, // Remove this if the bot is in large guilds.
        presence: {
          status: 'idle',
          activity: {
            name: `le démarrage...`,
            type: 'WATCHING'
          }
        },
        partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
        intents: ['GUILD_MESSAGES']
    })

    /*
    let bot = require('./botLocalModules/singleton_bot').createInstance({
        //fetchAllMembers: true, // Remove this if the bot is in large guilds.
        presence: {
          status: 'idle',
          activity: {
            name: `le démarrage...`,
            type: 'WATCHING'
          }
        },
        partials: ['MESSAGE', 'CHANNEL', 'REACTION']
    })
    */

    Database._setBotInstance_(bot)
    botf._setBotInstance(bot)

    fs.readdirSync("./bot/botLocalModules").forEach(botModule => {
        if(botModule.endsWith("_AutoLoad.js")) {
            require(`./botLocalModules/${botModule}`)
        }
    })
    

    bot.on('ready', async () => {
        logger.info(`Bot démarré. en tant que ${bot.user.tag} (${bot.user.id})`)
        /*
        bot.user.setStatus('available')
        bot.user.setPresence({
            status: "idle",
            activity: {
                name: `${somef.choice([
                    "le DirtyBiologistan",
                    "la maintenance"
                ])}`,
                type: "WATCHING"
            }
        });
        */
        //bot.user.setPresence(config.bot.maintenance.presence)

        let currentIndex = 0

        function nextInList(list) {
            currentIndex++
            if(currentIndex >= list.length) currentIndex = 0
            //console.log("currentIndex:",currentIndex,"list:",list)
            return list[currentIndex]
        }

        let globalData = await Database.getGlobalSettings()

        setInterval(async () => {
            //console.log("acutalizing datas")
            globalData = await Database.getGlobalSettings()
        }, 10*1000)
        function drawStatus() {
            if(!(globalData.get.bot.status.autostatus.toggle)) return;

            let status = nextInList(globalData.get.bot.status.autostatus.statusesList)
            //console.log("new status:",status)
            
            bot.user.setStatus('available')
            bot.user.setPresence({
                status: `${status.status}`,
                activity: {
                    name: `${status.activity.name}`,
                    type: `${status.activity.type}`
                }
            });
            setTimeout(() =>{
                drawStatus()
            }, globalData.get.bot.status.autostatus.delay)
        }

        drawStatus()
    })

    eventCollection = {}

    fs.readdirSync("./bot/events").forEach(eventType => {
        if(!eventCollection[eventType]) eventCollection[eventType] = []
        fs.readdirSync(`./bot/events/${eventType}`).forEach(file => {
            if(file.endsWith(".js")) {
                let fileName = file.split(".")
                fileName.pop()
                fileName.join(".")
                //require(`./events/${eventType}/${fileName}`).start(bot, eventType)
                let the_require = require(`./events/${eventType}/${fileName}`)
                try { the_require.start() } catch(e) {
                    logger.warn(`${e} <- /bot/events/${eventType}/${file}`)
                }
                eventCollection[eventType].push(the_require);
            }
        })
    });
    let allEvents = [...Object.keys(eventCollection)]
    /*
    La liste des events et le code qui y est éxécuté est définit par l'arborescence du fichier ./events/
    -> l'existence du dossier ./events/ready/ fera qu'un bot.on("ready") sera éxécuté, en envoyant éxécutant
    à son event tous les fichiers de ./events/ready/*
    */
    /*for(let a in allEvents) {
        let eventType = allEvents[a]
        bot.on(eventType, (...args) => {
            if(config.bot.force_maintenance || false) { // ou maintenance du data global.

            }
            for(let loop in eventCollection[eventType]) {
                eventCollection[eventType][loop].onEvent(bot, ...args)
            }
        })
    }
    */
    

    let discordEventList = [
        "applicationCommandCreate",
        "applicationCommandDelete",
        "applicationCommandUpdate",
        "channelCreate",
        "channelDelete",
        "channelPinsUpdate",
        "channelUpdate",
        "debug",
        "warn",
        "emojiCreate",
        "emojiDelete",
        "emojiUpdate",
        "error",
        "guildBanAdd",
        "guildBanRemove",
        "guildCreate",
        "guildDelete",
        "guildUnavailable",
        "guildIntegrationsUpdate",
        "guildMemberAdd",
        "guildMemberAvailable",
        "guildMemberRemove",
        "guildMembersChunk",
        "guildMemberUpdate",
        "guildUpdate",
        "inviteCreate",
        "inviteDelete",
        "message",
        "messageCreate",
        "messageDelete",
        "messageReactionRemoveAll",
        "messageReactionRemoveEmoji",
        "messageDeleteBulk",
        "messageReactionAdd",
        "messageReactionRemove",
        "messageUpdate",
        "presenceUpdate",
        "rateLimit",
        "invalidRequestWarning",
        "ready",
        "invalidated",
        "roleCreate",
        "roleDelete",
        "roleUpdate",
        "threadCreate",
        "threadDelete",
        "threadListSync",
        "threadMemberUpdate",
        "threadMembersUpdate",
        "threadUpdate",
        "typingStart",
        "userUpdate",
        "voiceStateUpdate",
        "webhookUpdate",
        "interaction",
        "interactionCreate",
        "shardDisconnect",
        "shardError",
        "shardReady",
        "shardReconnecting",
        "shardResume",
        "stageInstanceCreate",
        "stageInstanceUpdate",
        "stageInstanceDelete",
        "stickerCreate",
        "stickerDelete",
        "stickerUpdate",
    ]
    for(let i in discordEventList) {
        let event = discordEventList[i]
        bot.on(event, (...args) => {
            //logger.debug(`Got event ${event}`)
            if(config.bot.force_maintenance || false) { // ou maintenance du data global.
            }
            for(let loop in eventCollection[event]) {
                eventCollection[event][loop].onEvent(bot, ...args)
            }
            pluginManager.onBotEvent(event, ...args)
            if(allEvents.includes(event)) {
                
            }
        })
    }

    bot.commands = {}
    bot.commands.guildCommands = new Discord.Collection();
    const commandFiles = fs.readdirSync('./bot/commands/guild/').filter(file => file.endsWith('.js'));
    for(const file of commandFiles) {
        //logger.log("file for command: "+file)
        let command = require(`./commands/guild/${file}`);
        bot.commands.guildCommands.set(file, command);
    }


    bot.on("messageCreate", message => {
        logger.debug("got messageCreate:",message.content)
    })
    bot.on("message", message => {
        logger.debug("got message:",message.content)
    })
    
 
    /*
    let commandFiles = fs.readdirSync('./bot/commands/guildMessage').filter(file => file.endsWith('.js'));
    for(const file of commandFiles) {
        const command = require(`./bot/commands/commands/${file}`);
        eventCollection.set(command.name, command);
    }
    */

    /*
    const commandFiles = fs.readdirSync('./bot/commands/guildMessage').filter(file => file.endsWith('.js'));
    for(const file of commandFiles) {
        const command = require(`./commands/${file}`);
        eventCollection.set(command.name, command);
    }
    */
   
    /*
    fs.readdirSync("./bot/events").forEach(eventType => {
        fs.readdirSync(`./bot/events/${eventType}`).forEach(file => {
            if(file.endsWith(".js")) {
                let fileName = file.split(".")
                fileName.pop()
                fileName.join(".")
                require(`./events/${eventType}/${fileName}`).start(bot, eventType)
            }
        })
    });*/

    


    //require("discord-banner")(config.token);
    //const { getUserBanner } = require("discord-banner");
    //require("./localModules/ExtendedMessage");

    bot.login(config.bot.token)
    return bot
}
