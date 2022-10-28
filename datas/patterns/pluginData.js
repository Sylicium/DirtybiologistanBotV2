

/*
For a Guild
*/

const config = require('../../config');

module.exports = (pluginID) => {
    return {
        _id: undefined,
        pluginID: pluginID,
        debug: false,
        usedGuilds: [
            /*{
                id: "guild id",
                name: "guild name",
            }*/
        ],
        enabled: false,
        maintenance: false,
        defaultPermissions: [ // the default permissions required to use the plugin

        ],
        miniDB: { }
    }
}



