

const Discord = require("discord.js")
const logger = new (require("../../../localModules/logger"))("BotCMD:ping.js")
let config = require("../../../config")
let botf = require("../../botLocalModules/botFunctions")
let somef = require("../../../localModules/someFunctions")

let configuration = {
    name: "globalchat_v1",
    description: "Affiche la liste des commandes.",
    enabled: false,
    indev: false,
    permisionsNeeded: {
        bot: [],
        user: []
    },
    rolesNeeded: [],
    superAdminOnly: false,
    indev: false,
    hideOnHelp: false,
}
module.exports.configuration = configuration

let Global = {
    PluginData: null
}

module.exports.onStart = async (Modules, bot, ...args) => {
    Global.PluginData = Modules.Database.getPluginDatas(this.configuration.name)
}

module.exports.onEvent = async (Modules, bot, eventName, ...args) => {
    if(Events[eventName] != undefined) { return Events[eventName](Modules, bot, ...args) }
    //logger.warn(`[Plugin.onEvent] No code linked to event ${eventName}`)
}

let Events = {}
Events["messageCreate"] = async (Modules, bot, ...args) => {

}
/*
class Plugin {
    constructor() {
        this.pluginName = "GlobalChat"
        this.type = "guild_plugin" // guild_plugin / global_plugin
        this.settings = [
            {
                "name": "enabled",
                "description": "Activer ou désactiver le plugin",
                "type": Discord.ApplicationCommandOptionType.Boolean,
                "required": false
            }
        ]

    }

}

module.exports.getPlugin = Plugin
*/