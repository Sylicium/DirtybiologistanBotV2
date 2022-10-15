

const Discord = require("discord.js")
const logger = new (require("../../localModules/logger"))("BotCMD:ping.js")
let config = require("../../config")
let botf = require("../botLocalModules/botFunctions")
let somef = require("../../localModules/someFunctions")

module.exports.commandInformations = {
    commandDatas: {
        name: "modal",
        description: "Envoie un modal",
        dmPermission: false,
        type: Discord.ApplicationCommandType.ChatInput,
        options: []
    },
    canBeDisabled: false,
    permisionsNeeded: {
        bot: ["SEND_MESSAGES"],
        user: []
    },
    rolesNeeded: [],
    superAdminOnly: true,
    disabled: false,
    indev: false,
    hideOnHelp: false
}
execute = async (bot, interaction, data, a,b,c,d,e,f,g,h) => {

    // Create the modal
    const modal = new Discord.ModalBuilder()
    	.setCustomId('myModal')
    	.setTitle('My Modal');

    // Add components to modal

    // Create the text input components
    const favoriteColorInput = new Discord.TextInputBuilder()
    	.setCustomId('favoriteColorInput')
        // The label is the prompt the user sees for this input
    	.setLabel("What's your favorite color?")
        // Short means only a single line of text
    	.setStyle(Discord.TextInputStyle.Short);

    const hobbiesInput = new Discord.TextInputBuilder()
    	.setCustomId('hobbiesInput')
    	.setLabel("What's some of your favorite hobbies?")
        // Paragraph means multiple lines of text.
    	.setStyle(Discord.TextInputStyle.Paragraph);

    // An action row only holds one text input,
    // so you need one action row per text input.
    const firstActionRow = new Discord.ActionRowBuilder().addComponents(favoriteColorInput);
    const secondActionRow = new Discord.ActionRowBuilder().addComponents(hobbiesInput);

    // Add inputs to the modal
    modal.addComponents(firstActionRow, secondActionRow);

    // Show the modal to the user
    

    interaction.showModal(modal);

    await interaction.reply({
        content: "Modal chargé",
        ephemeral: true
    })
}

module.exports.execute = execute
