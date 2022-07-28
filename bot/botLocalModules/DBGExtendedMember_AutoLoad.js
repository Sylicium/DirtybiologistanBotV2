const { Structures } = require("discord.js");
const Database = require("../../localModules/database")

class GuildMember extends Structures.get("GuildMember") {

    get dbg() {
        return {
            getAccount: async () => {
                return Database.findAccountByID(this.id)
            },
            hasRank: async (name) => {
                let _a = await Database.findAccountByID(this.id)
                _a
            }
        }
    }
    /*
    inlineReply(content, options) {
        return this.channel.send(ExtAPIMessage.create(this, content, options, { replyTo: this }).resolveData());
    }

    edit(content, options) {
        return super.edit(ExtAPIMessage.create(this, content, options).resolveData());
    }
    */
}

class Dbg {
    constructor() {

    }

    whoAmI() {
        console.log("I am", this.user.tag)
    }
}

Structures.extend("GuildMember", () => GuildMember);