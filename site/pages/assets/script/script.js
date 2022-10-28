

const GlobalSettings_ = {
    debug: true
}




function resolveDiscordPermissions(integer) {
    let l = []
    let perm_list = [
        ["CREATE_INSTANT_INVITE", 0x0000000000000001],
        ["KICK_MEMBERS", 0x0000000000000002],
        ["BAN_MEMBERS", 0x0000000000000004],
        ["ADMINISTRATOR", 0x0000000000000008],
        ["MANAGE_CHANNELS", 0x0000000000000010],
        ["MANAGE_GUILD", 0x0000000000000020],
        ["ADD_REACTIONS", 0x0000000000000040],
        ["VIEW_AUDIT_LOG", 0x0000000000000080],
        ["PRIORITY_SPEAKER", 0x0000000000000100],
        ["STREAM", 0x0000000000000200],
        ["VIEW_CHANNEL", 0x0000000000000400],
        ["SEND_MESSAGES", 0x0000000000000800],
        ["SEND_TTS_MESSAGES", 0x0000000000001000],
        ["MANAGE_MESSAGES", 0x0000000000002000],
        ["EMBED_LINKS", 0x0000000000004000],
        ["ATTACH_FILES", 0x0000000000008000],
        ["READ_MESSAGE_HISTORY", 0x0000000000010000],
        ["MENTION_EVERYONE", 0x0000000000020000],
        ["USE_EXTERNAL_EMOJIS", 0x0000000000040000],
        ["VIEW_GUILD_INSIGHTS", 0x0000000000080000],
        ["CONNECT", 0x0000000000100000],
        ["SPEAK", 0x0000000000200000],
        ["MUTE_MEMBERS", 0x0000000000400000],
        ["DEAFEN_MEMBERS", 0x0000000000800000],
        ["MOVE_MEMBERS", 0x0000000001000000],
        ["USE_VAD", 0x0000000002000000],
        ["CHANGE_NICKNAME", 0x0000000004000000],
        ["MANAGE_NICKNAMES", 0x0000000008000000],
        ["MANAGE_ROLES", 0x0000000010000000],
        ["MANAGE_WEBHOOKS", 0x0000000020000000],
        ["MANAGE_EMOJIS_AND_STICKERS", 0x0000000040000000],
        ["USE_APPLICATION_COMMANDS", 0x0000000080000000],
        ["REQUEST_TO_SPEAK", 0x0000000100000000],
        ["MANAGE_EVENTS", 0x0000000200000000],
        ["MANAGE_THREADS", 0x400000000],
        ["CREATE_PUBLIC_THREADS", 0x0000000800000000],
        ["CREATE_PRIVATE_THREADS", 0x0000001000000000],
        ["USE_EXTERNAL_STICKERS", 0x0000002000000000],
        ["SEND_MESSAGES_IN_THREADS", 0x0000004000000000],
        ["USE_EMBEDDED_ACTIVITIES", 0x0000008000000000],
        ["MODERATE_MEMBERS", 0x0000010000000000]
    ]

    for(let i in perm_list) {
        if((integer & perm_list[i][1]) == perm_list[i][1]) l.push(perm_list[i][0])
    }
    return l

}

function addBotToGuild(guild_id) {
    document.location.href = `https://discord.com/oauth2/authorize?scope=bot+applications.commands&response_type=code&permissions=8&client_id=905825005303119913&guild_id=${guild_id}`
}


function manageGuild(identifiant) {
    $("#select_guild").fadeOut(600)
    $("#manage_guild div#mg_guild_informations h1.name span.guild_name").text(`${identifiant}`)
    setTimeout(() => {
        $(".manage_guild_content").fadeIn(600)
        // alert(`Managing guild ${identifiant}`)
    }, 600)
    
}



setTimeout(() => {
    if(GlobalSettings_.debug) console.log("%c[DEBUG] Debug mode is active", "font-size:16px;border-radius: 5px;color:orange; font-family:calibri;font-weight:bold;margin-bottom:15px;")
    else console.log("%cVa fourrer ton nez ailleurs que dans MA console TwT", "background: red;font-size:20px;padding:5px 10px 5px 10px;border-radius: 5px;color:white;font-family:calibri-bold")
}, 3000  )
setInterval(() => {
    if(GlobalSettings_.debug) return;
    console.log("%cAttends!", "font-size:60px;border-radius: 5px;color:#6666FF;font-family:calibri;font-weight:bold;margin-bottom:15px;")
    console.log("%cSi quelqu'un t'as dis de copier/coller quelque chose ici, il y a à peu près 11 chances sur 10 que ce soit une arnaque.", "font-size:20px;border-radius: 5px;color:white;font-family:calibri;font-weight:bold;margin-bottom:15px;")
    console.log("%cColler quelque chose ici pourrait donner aux assaillant accès à ton compte discord ou DirtyBiologistanais, comprenant peut être des informations personnelles sensibles.", "font-size:23px;border-radius: 5px;color:red;font-family:calibri;font-weight:bold;margin-bottom:15px;")
    console.log("%cSi tu sais ce que tu fais tu devrais nous rejoindre: https://discord.gg/WUr3N3ZxA6", "font-size:15px;border-radius: 5px;color:white;font-family:calibri;font-weight:bold;margin-bottom:15px;")
    console.log("%cOui j'ai copIé discord mais chut-", "font-size:10px;border-radius: 5px;color:white;font-family:calibri;font-weight:bold;margin-bottom:15px;")
}, 5000)