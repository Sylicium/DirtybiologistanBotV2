const { Structures } = require("discord.js");
const Database = require("../../localModules/database")

class Guild extends Structures.get("Guild") {
    get dbg() {
        return {
            getDatas: () => {
                return "coucou ça marche"
            }
        }
    }
}

Structures.extend("Guild", () => Guild);



// marche pas