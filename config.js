module.exports = {
    version: "2.0.0",
    superAdminList: [
        "774003919625519134"
    ],
    bot: {
        prefix: "-",
        force_maintenance: true,
        token: process.env["TOKEN"],
        embedFooter: `DirtyBiologistan`,
        embedFooterDot: `DirtyBiologistan •`,
        embedDot: `•`,
        min_members: 50, // inclu
        max_guilds: 65,
        setApplicationCommandsOnStart: true,
        setApplicationCommandsInLocal: true,
        setApplicationCommandsInLocal_guilds: [
            "909168225936363601"
        ]
    },
    global: {
        logs: {
            coloration: "colored" // normal: erreur tout en rouge, warn tout en orange etc.. | colored couleurs différentes pour la ligne de log pour la date, heure etc..
        }
    },
    website: {
        url: "https://dirtyBiology.captaincommand.repl.c"
    },
    emojis: {
        "loading": {
            id: "867530470438731827",
            tag: "<a:loading:867530470438731827>"
        },
        "check_mark": {
            id: "905859187580485662",
            tag: "<:check:905859187580485662>"
        },
        "no": {
            id: "",
            tag: "❌"
        },
        "semi_verified": {
            id: "",
            tag: "🎗"
        },
        "dbg_valide": {
            id: "937274055281741834",
            tag: "<:valide:937274055281741834>"
        },
        "dbg_refuse": {
            id: "937274054430310400",
            tag: "<:refuse:937274054430310400>"
        },
        "dbg_egal": {
            id: "937274055583731783",
            tag: "<:egal:937274055583731783>"
        }
    },
    static: {
        channels: {
            logs: {
                general: "953652360104771594",
                new_guilds: "953652305989890188",
                important: "953653948181524570",
                errors: "953670098676224050"
            }
        }
    }
}