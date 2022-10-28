
const Discord = require("discord.js")
const logger = new (require("../../localModules/logger"))("BotCMD:ping.js")
let config = require("../../config")
// let botf = require("../bot/botLocalModules/botFunctions")
let somef = require("../../localModules/someFunctions")

class Manager {
    constructor() {
        this._modules = {}
        this.Bot = undefined
        this._plugins = [
            /*{
                name: "aaa",
                file: require()
            }*/
        ]
    }

    start() {       
        this._getModules().fs.readdirSync("./bot/plugins").forEach(plugin => {
            this._getModules().fs.readdirSync(`./bot/plugins/${plugin}`).forEach(file => {
                if(file == `${plugin}.js`) {
                    let fileName = file.split(".")
                    fileName.pop()
                    fileName.join(".")
                    //require(`./events/${plugin}/${fileName}`).start(bot, plugin)
                    let the_require = require(`../plugins/${plugin}/${fileName}`)
                    try {
                        the_require.onStart(this._getModules(), this.Bot)
                    } catch(e) {
                        if(`${e}`.indexOf(".start is not a function") != -1) {
                            logger.warn(`[ ] ${e} <- /bot/events/${plugin}/${file} .onStart()`)
                        } else {
                            logger.warn(`[w] ${e} <- /bot/events/${plugin}/${file} .onStart()`,e)
                        }
                    }
                    this._addPlugin(the_require.configuration.name, the_require)
                }
            })
        });
    }
    _addPlugin(name, require) {
        this._plugins.push({
            name: name,
            file: require
        })
    }
    _getPlugins() { return this._plugins }
    _setBotInstance(bot) { this.Bot = bot }
    _setModules(modules) { this._modules = modules }
    _updateModule(moduleName, _module) { this._module[moduleName] = _module }
    _getModules() { return this._modules }

    async _emitEvent(eventName, ...args) {
        let plugins = this._getPlugins()
        for(let i in plugins) {
            let pl = plugins[i]
            pl.file.onEvent(eventName, ...args)
        }
    }
    async _emitBotEvent(eventName, bot, ...args) {
        let plugins = this._getPlugins()
        for(let i in plugins) {
            let pl = plugins[i]
            pl.file.onEvent(eventName, bot, ...args)
        }
    }
    async onBotEvent(eventName, ...args) {
        this._emitBotEvent(this._getModules(), this.Bot, eventName, ...args)
    }
    async onEvent(eventName, ...args) {
        this._emitEvent(this._getModules(), this.Bot, eventName, ...args)
    }

    _emitToPlugin(name, eventName, ...args) {
        let plugin = this._getPlugins().filter((x, index) => { return x.name == name})[0]
        if(plugin) {
            plugin.file.onEvent(eventName, bot, ...args)
            return true
        } else {
            return false
        }
    }

    getPlugin(pluginName) {
        let pl = this._plugins.filter(x => { return x.name == pluginName })
        if(pl.length > 0) {return pl[0] } else { return undefined }
    }



}


module.exports = new Manager()