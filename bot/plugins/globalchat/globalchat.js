

const Discord = require("discord.js")
const logger = new (require("../../../localModules/logger"))("BotCMD:ping.js")
let config = require("../../../config")
let botf = require("../../botLocalModules/botFunctions")
let somef = require("../../../localModules/someFunctions")

module.exports.configuration = {
    name: "help",
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

module.exports.onStart = async (Modules, bot, ...args) => {

}

module.exports.onEvent = async (Modules, bot, eventName, ...args) => {

}