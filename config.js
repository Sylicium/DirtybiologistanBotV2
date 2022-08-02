/*
let ENV = {
    "TOKEN": "OTI4MzA3OTYxOTM0Mjc0NTkw.YdW4KQ.zFPsqhCKxl7booNH1BZ0z-qitbg",
    //TOKEN: "OTA1ODI1MDA1MzAzMTE5OTEz.YYPtRg.GnlV9AIWkwDWxLKbiohX-RJW1po",
    "SSDB_security_code": "Yy6Lez7vQaKK14gBaCxk",
    "WEBSITE_CRYPTO_Securitykey": "[196,248,237,21,38,51,53,198,180,193,57,48,182,118,159,220,29,133,16,118,20,236,202,124,39,68,177,229,197,49,143,76]",
    "WEBSITE_CRYPTO_initVector": "[89,17,37,124,151,92,137,98,42,199,109,200,156,29,28,215]",
    "api_test_webhook": "[\"908025877600800808\",\"yY8eHmFzu5cdVSwuPfzOKgnjVVmFQCoj6tr-X2ykf-BVvtuLcitr2CfKXiXHThfHlxvy\"]",
    "application_clientId": "905825005303119913",
    "application_clientSecret": "O_cIOWOYdUjUWKXea6kq6vCcXrRUpMtJ",
    "codati_webhook": "https://discord.com/api/webhooks/908025877600800808/yY8eHmFzu5cdVSwuPfzOKgnjVVmFQCoj6tr-X2ykf-BVvtuLcitr2CfKXiXHThfHlxvy",
    "rickroll_webhook_id": "909943273970348053",
    "rickroll_webhook_token": "Y-9m-Ewl65mn4EliX_6VBdikAejLR_XV3mp_g1pFuc8vhWhs56dtV5XO3hQvgbXXmGrD",
    "webhook_token_bordel_logs": "8zYkTI36Dp_NPUDVBzudaNCwoQhuOmNoHyUm0-AVz9_iq6ESRnUgaPlIsAo7ADQ-KBPS",
    "website_hash_salt": "NJqLmPAkGOjWdIi1l6yoxdAywq0Yx7lc"
}
*/

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