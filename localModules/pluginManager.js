
const Discord = require("discord.js")
const logger = new (require("./logger"))("BotCMD:ping.js")
let config = require("../config")
// let botf = require("../bot/botLocalModules/botFunctions")
let somef = require("./someFunctions")

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

    setBotInstance(bot) { this.Bot = bot }
    setModules(modules) { this._module = modules }
    updateModule(moduleName, _module) { this._module[moduleName] = _module }

    async _emitEvent(eventName, ...args) {
        for(let i in this._plugins) {
            let pl = this._plugins[i]
            pl.file.onEvent(eventName, ...args)
        }
    }
    async onBotEvent(eventName, ...args) { this._emitEvent(eventName, ...args) }

    getPlugin(pluginName) {
        let pl = this._plugins.filter(x => { return x.name == pluginName })
        if(pl.length > 0) {return pl[0] } else { return undefined }
    }



}


module.exports = new Manager()