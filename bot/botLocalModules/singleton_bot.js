

/*

const { Client } = require('discord.js');
const fs = require("fs")


class JsonReaderInClass {
    constructor(datas) {
        if (JsonReaderInClass._instance) {
            return JsonReaderInClass._instance
        }
        JsonReaderInClass._instance = this;

        this.bot = new Client(datas);

    }
    
}

let BotInstance; // bot


module.exports.createInstance = (datas) => {
    if(BotInstance) throw new Error(`[Singleton] > Cannot make more than one instance of Discord.client `);
    BotInstance = (new JsonReaderInClass(datas))
    return BotInstance.bot
}

module.exports.getInstance = () => {
    if(!BotInstance) return undefined
    return BotInstance.bot
}

module.exports.isInstance = () => {
    if(!BotInstance) return false
    return true
}

*/













/***********************************************************************************/






const { Client } = require('discord.js');
const fs = require("fs")
const logger = new (require("../../localModules/logger"))()

class Bot {
    constructor() {
        this._instance = undefined
    }
}

let BotInstance_ = new Bot()

module.exports = BotInstance_._instance