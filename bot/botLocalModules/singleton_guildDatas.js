
const fs = require("fs")
const config = require("../../config")

/*
v1.0.1
*/

let Bot;
let bot_singleton = require('./singleton_bot')
function getBotInstance() {
    setTimeout(() => {
        if(bot_singleton.isInstance()) {
            Bot = require('./singleton_bot').getInstance() // updatedata changer tous les bot du fichier en Bot + remove les arguments de fonction qui demande bot, Members ou Global_datas + l'édit dans les fichiers de commandes qui utilisent ces fonctions
        } else {
            console.log(`[singleton_json] getting Bot instance > retrying...`)
            getBotInstance()
        }
    }, 100)
}
getBotInstance()

class CreateJsonReader {

    constructor(name, file_path) {
        class JsonReaderInClass {
            constructor(name, file_path) {
                if (JsonReaderInClass._instance) {
                    return JsonReaderInClass._instance
                }
                JsonReaderInClass._instance = this;

                if(fs.existsSync(`${file_path}`)) {
                    
                } else {
                    let guild = Bot.guilds.cache.get(`${name}`)
                    if(guild) {
                        let data = config.basic_data
                        data.guild.name = guild.name
                        data.guild.id = guild.id

                        fs.writeFileSync(`${file_path}`, JSON.stringify(data))
                    } else {
                        fs.writeFileSync(`${file_path}`, "{}")
                    }
                }

                this.json = JSON.parse(fs.readFileSync(`${file_path}`, "utf-8"))
                this.name = name
                this.file_path = file_path
            } /* Constructor*/


            save() {
                //logger.info("Saving guild data:",this.file_path)
                fs.writeFileSync(this.file_path, JSON.stringify(this.json))
            }
            



            


        }


        this.new_class = new JsonReaderInClass(name, file_path)
    }


}


let AllInstances = {
    //"name": "instance"
}


module.exports.getInstance = (name) => {
    if(AllInstances[name] == undefined) return undefined
    return AllInstances[name].value
}

module.exports.createInstance = (name, file_path) => {
    if(this.getInstance(name) != undefined) {
        throw new Error(`[Singleton] > Instance name already in use: '${name}' `);
    }
    let pre_new_instance = new CreateJsonReader(name, file_path)
    let new_instance = pre_new_instance.new_class
    AllInstances[`${name}`] = {
        "file_path": file_path,
        "value": new_instance
    }
    return AllInstances[`${name}`].value
}

module.exports.isInstance = (name) => {
    if(AllInstances[name] == undefined) return false
    return true
}

module.exports.getAllInstances = () => {
    return AllInstances
}


module.exports.useInstance = (name, file_path) => {
    if(AllInstances[name] != undefined) return AllInstances[name].value
    let pre_new_instance = new CreateJsonReader(name, file_path)
    let new_instance = pre_new_instance.new_class
    AllInstances[`${name}`] = {
        "file_path": file_path,
        "value": new_instance
    }
    return AllInstances[`${name}`].value
}