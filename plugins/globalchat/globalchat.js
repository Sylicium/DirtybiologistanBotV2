

const Discord = require("discord.js")
const logger = new (require("../../../localModules/logger"))("BotCMD:ping.js")
let config = require("../../../config")
let botf = require("../../botLocalModules/botFunctions")
let somef = require("../../../localModules/someFunctions")
const { timingSafeEqual } = require("crypto")

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
    hideOnHelp: false
    execute: async function(bot, command, args, data, message,b,c,d,e,f,g,h) {

    }
}
