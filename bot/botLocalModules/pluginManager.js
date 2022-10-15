
const Discord = require("discord.js")
const logger = new (require("../../localModules/logger"))("BotCMD:ping.js")
let config = require("../../config")
// let botf = require("../bot/botLocalModules/botFunctions")
let somef = require("../../localModules/someFunctions")

class Manager {
    constructor() {
        this._module = {}
        this.Bot = undefined
        this._plugins = [
            /*{
                name: "aaa",
                file: require()
            }*/
        ]
    }

    start() {
        
    }

    _setBotInstance(bot) { this.Bot = bot }
    _setModules(modules) { this._module = modules }
    _updateModule(moduleName, _module) { this._module[moduleName] = _module }

    async _emitEvent(eventName, ...args) {
        for(let i in this._plugins) {
            let pl = this._plugins[i]
            pl.file.onEvent(eventName, ...args)
        }
    }
    async onBotEvent(Modules, eventName, ...args) {
        this._emitEvent(Modules, this.Bot, eventName, ...args)
    }

    getPlugin(pluginName) {
        let pl = this._plugins.filter(x => { return x.name == pluginName })
        if(pl.length > 0) {return pl[0] } else { return undefined }
    }



}


module.exports = new Manager()