

/*
For a Guild
*/

const config = require('../../config');

module.exports = () => {
    return {
        _id: undefined,
        data_type: "global_data",
        prefix: `${config.bot.prefix}`,
        debug: false,
        maitenance: false,
        maintenance_beta_testers: false,
        bot: {
            status:{
                autostatus: {
                    toggle: true,
                    delay: 6000,
                    statusesList: [
                        {
                            id: "0",
                            status: "online",
                            activity: {
                                name: `la micronation`,
                                type: "WATCHING"
                            }
                        },
                        {
                            id: "1",
                            status: "idle",
                            activity: {
                                name: `la maintenance`,
                                type: "LISTENING"
                            }
                        }
                    ]
                },
                
            },
            disabledCommands: []
        },
        warns: { // ces warns sont stockés globalement
            /*
            "774003919625519134": [
                {timestamp: 2308562308563, reason: "No reason specified", authorID: "3086354363646"},
                {timestamp: 2308599843732, reason: "No reason specified", authorID: "2098623900396"}
            ]
            */
        },
        bans: { // bot banned
            /*
            "id": {
                author: {
                    id: "",
                    username: "Sylicium",
                    tag: "2487"
                }
                reason: "Membre impérium",
                timestamp: Date.now()
            }
            */
        },
        blacklist: { // blacklist d'utilisateurs
            /*
            "id": {
                reason: "No reason"
                disabledCommands: []
            }
            */
        }
    }
}