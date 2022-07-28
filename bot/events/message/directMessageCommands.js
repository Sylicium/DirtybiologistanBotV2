
const logger = new (require("../../../localModules/logger"))()

module.exports.onEvent = (bot, message) => {

    /*
    bot.commands_directMessage = new Collection();
    const commandFiles = fs.readdirSync('./bot/commands/guildMessage').filter(file => file.endsWith('.js'));
    for(const file of commandFiles) {
        const command = require(`./commands/${file}`);
        bot.commands_directMessage.set(command.name, command);
    }
    */


    if(message.guild) return;
    if(message.author.bot) return;

    if(message.author.id != "774003919625519134") return;

    logger.debug("Got dm message:",message.content)
    message.reply("coucou mdr")


}