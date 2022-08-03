
let ENV = {
    "TOKEN": "",
    "SSDB_security_code": "",
    "WEBSITE_CRYPTO_Securitykey": "[]",
    "WEBSITE_CRYPTO_initVector": "",
    "api_test_webhook": "",
    "application_clientId": "",
    "application_clientSecret": "",
    "codati_webhook": "",
    "rickroll_webhook_id": "",
    "rickroll_webhook_token": "",
    "webhook_token_bordel_logs": "",
    "website_hash_salt": ""
}


module.exports = {
    token: ENV["TOKEN"],
    version: "2.0.0",
    superAdminList: [
        "774003919625519134"
    ],
    bot: {
        prefix: "-",
        force_maintenance: true,
        token: ENV["TOKEN"],
        embedFooter: `DirtyBiologistan`,
        embedFooterDot: `DirtyBiologistan •`,
        embedDot: `•`,
        min_members: 50, // inclu
        max_guilds: 65
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
