const { bot } = require("../../../config")


const logger = new (require("../../../localModules/logger"))()

module.exports.onEvent = (Modules, bot) => {

    logger.info("Bot started")

}