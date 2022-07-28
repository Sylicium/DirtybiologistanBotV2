

/*
For a Guild
*/

const config = require('../../config');

module.exports = (guild_object) => {
    return {
        _id: undefined,
        guild: {
            id: guild_object.id, // guild id
            name: guild_object.name // guild name
        },
        prefix: `${config.bot.prefix}`,
        debug: false,
        warns: {
            /*
            "774003919625519134": [
                {timestamp: 2308562308563, reason: "No reason specified", authorID: "3086354363646"},
                {timestamp: 2308599843732, reason: "No reason specified", authorID: "2098623900396"}
            ]
            */
        },
        channels: {},
        messages: {},
        giveaways: {},
        lol_commands: {
            enabled: false
        },
        settings: {
            commands: [
                // { name: "ping", disabled: false}
            ],
            plugins: [
                // { name: "globalchat", disabled: true, options: { channel: "0123456789", }}
            ]
        }
    }
}