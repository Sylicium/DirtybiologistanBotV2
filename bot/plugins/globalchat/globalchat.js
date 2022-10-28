

const Discord = require("discord.js")
const logger = new (require("../../../localModules/logger"))("BotCMD:ping.js")
let config = require("../../../config")
let botf = require("../../botLocalModules/botFunctions")
let somef = require("../../../localModules/someFunctions")

let configuration = {
    pluginID: "globalchat_v1",
    description: "Tchat interserveur entre tous les discords du dibistan",
}
module.exports.configuration = configuration

let Global = {
    PluginData: null,
    Modules: {}
}

module.exports.onStart = async (Modules, bot, ...args) => {
    Global.PluginData = Modules.Database.getPluginDatas(this.configuration.pluginID)
    Global.Modules = Modules
}

module.exports.onEvent = async (Modules, bot, eventName, ...args) => {
    if(Events[eventName] != undefined) { return Events[eventName](Modules, bot, ...args) }
    //logger.warn(`[Plugin.onEvent] No code linked to event ${eventName}`)
}

let Events = {}
Events["messageCreate"] = async (Modules, bot, ...args) => {

}




class PluginPanel {
    constructor(userID, guildID) {
        this.panelFor = {
            userID: userID,
            guildID: guildID
        }
        this.pluginID = configuration.pluginID
        this.description = configuration.description
        this.DBPluginDatas = Global.Database.getPluginDatas(configuration.pluginID)
        this.DBServerDatas = Global.Database.getGuildDatas(guildID)

        this.defaultOptions = [
            { optionName: "channel", value: "2598729537" },
            { optionName: "main_user", value: "11111111" },
        ]
    }

    async _initPlugin() {
        await this.DBServerDatas.initPlugin(this.pluginID)
        await this.DBServerDatas.setPluginOptionMany(this.pluginID, this.defaultOptions)
        return true
    }
    _isInitialized() {
        return this.DBPluginDatas.isPluginInitialized(this.pluginID)
    }
    
    /**
     * f(): Activer ou désactiver le plugin sur la guilde
     * @param {Boolean} boolean Activer ou désactiver le plugin sur la guilde
     */
    async _togglePlugin(boolean) {
        if(!this._isInitialized()) await this._initPlugin()
        this.DBServerDatas.toggleEnablePlugin(this.pluginID,boolean)
    }




}

module.exports.PluginPanel = PluginPanel








/*
class Plugin {
    constructor() {
        this.pluginID = "GlobalChat"
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