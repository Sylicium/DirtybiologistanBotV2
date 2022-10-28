
const logger = new (require("./logger"))()
const somef = require("./someFunctions")

const MongoClient = require('mongodb').MongoClient;

const patterns = {
    serverData: require("../datas/patterns/serverData"),
    globalData: require("../datas/patterns/globalData"),
    pluginData: require("../datas/patterns/pluginData")
}

// v1.0.0 - 24/04/2022


/*function getdb() {
    db = MongoClient.connect(url, function(err, Mongo) {
        if(err) throw err
        TheMongoInstance = Mongo
        logger.debug("set mongo instance.")
    })
    return new Database(TheMongoInstance);
    
}*/


let Temp_ = {
    guildDatas: {
        editing: {
            // "guild_id": false
        }
    }
}


class Database {
    constructor() {
        this.Mongo = undefined
        this._usedDataBaseName = undefined
        this._botInstance = undefined
    }

    _setMongoClient(the_mongo) {
        this.Mongo = the_mongo
        logger.debug("MongoClient singleton set.")
    }

    _useDb(DbName) {
        return this._usedDataBaseName = DbName
    }

    _setBotInstance_(bot) {
        this._botInstance = bot
    }

    async getGlobalSettings() {
        let object = await this.Mongo.db(this._usedDataBaseName).collection("global_data").findOne({"data_type":"global_data"})
        if(!object) {
            //logger.debug("!object")
            let d = patterns.globalData()
            await this.Mongo.db(this._usedDataBaseName).collection("global_data").insertOne(d)
            object = await this.Mongo.db(this._usedDataBaseName).collection("global_data").findOne({"data_type":"global_data"})
        }

        return new GlobalSettingsClass(
            {
                databaseName: this._usedDataBaseName,
                collectionName: "global_data",
                _id: object._id
            },
            object
        )
    }


    async getAccountByID(identifiant) {
        return this.Mongo.db(this._usedDataBaseName).collection("accounts").findOne({id:identifiant})
    }
    async findAccount(search_params) {
        return this.Mongo.db(this._usedDataBaseName).collection("accounts").findOne(search_params)
    }
    async findAccounts(search_params) {
        return this.Mongo.db(this._usedDataBaseName).collection("accounts").find(search_params).toArray()
    }
    /**
     * f(): Renvoie un object permettant de manipuler les données de la BDD pour la guilde renseignée
     * @param {String} guild_id - L'id de la guilde à récupérer
     * @returns class_guildDatas
     */
    async getGuildDatas(guild_id) {
        try {
            while(Temp_.guildDatas.editing[guild_id]) { await somef.sleep(1)} // Evite de créer plusieur fois l'objet dans la base de donnée si il n'existait pas et que cette fonction est appellée plusieur fois très rapidement
            Temp_.guildDatas.editing[guild_id] = true
            let object = await this.Mongo.db(this._usedDataBaseName).collection("serverDatas").findOne({"guild.id": guild_id})
            //logger.debug("ok getGuildDatas")
            if(!object) {
                logger.debug("!object", (new Error()))
                let g = patterns.serverData(this._botInstance.guilds.cache.get(guild_id))
                await this.Mongo.db(this._usedDataBaseName).collection("serverDatas").insertOne(g)
                object = await this.Mongo.db(this._usedDataBaseName).collection("serverDatas").findOne({"guild.id": guild_id})
                Temp_.guildDatas.editing[guild_id] = false
            }
            return new ServerClass(
                {
                    databaseName: this._usedDataBaseName,
                    collectionName: "serverDatas",
                    _id: object._id
                },
                object
            )
        } catch(e) {
            Temp_.guildDatas.editing[guild_id] = false
        }
    }

    async getPluginDatas(pluginID) {
        let object = await this.Mongo.db(this._usedDataBaseName).collection("pluginDatas").findOne({"pluginID":`${pluginID}`})
        if(!object) {
            //logger.debug("!object")
            let p = patterns.pluginData(pluginID)
            await this.Mongo.db(this._usedDataBaseName).collection("pluginDatas").insertOne(p)
            object = await this.Mongo.db(this._usedDataBaseName).collection("pluginDatas").findOne({"pluginID":`${pluginID}`})
        }

        return new PluginClass(
            {
                databaseName: this._usedDataBaseName,
                collectionName: "pluginDatas",
                _id: object._id
            },
            object
        )
    }



}


let Database_ = new Database()

let ServerData_file = require("./class_serverData.js")
let ServerClass = ServerData_file.ServerClass
ServerData_file._setDatabase(Database_)

let GlobalSettingsClass_file = require("./class_globalSettings.js")
let GlobalSettingsClass = GlobalSettingsClass_file.GlobalSettingsClass
GlobalSettingsClass_file._setDatabase(Database_)

let PluginClass_file = require("./class_pluginData.js")
let PluginClass = PluginClass_file.PluginClass
PluginClass_file._setDatabase(Database_)


module.exports = Database_



//logger.debug("Instance_.findAccount: "+Instance_.findAccount("774003919625519134"))

/*
let Instance_
//module.exports = Instance_

module.exports = async () => {
    let connected_client = await MongoClient.connect(url)
    Instance_ = new Database(connected_client)
    logger.debug("Instance_.findAccount: "+JSON.stringify(await Instance_.findAccount({id:"774003919625519134"})))
}
*/


/*

let url = "mongodb+srv://discordbot:P3xT66OEFmNemdgG@cluster0.wrmyx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
MongoClient.connect(url, function(err, Mongo) {
    if(err) throw err
    this.Mongo = Mongo
    module.exports = Mongo
})

*/

/*

const MongoClient = require('mongodb').MongoClient;
 
let url = "mongodb+srv://discordbot:P3xT66OEFmNemdgG@cluster0.wrmyx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
let Db;


MongoClient.connect(url, function(err, Mongo) {
    if(err) throw err
    console.log("Connected successfully to server");
    Db = Mongo.db("DBGCanary");

    console.log(Db.collection("accounts").find({id:"774003919625519134"}))

});


*/
