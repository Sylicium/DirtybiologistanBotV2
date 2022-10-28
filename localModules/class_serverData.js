const Logger = new (require("./logger"))()

let Database_;

module.exports._setDatabase = (db) => {
    Database_ = db
}


class ServerClass {
    constructor(
        _mongoSettings={
            databaseName: undefined,
            collectionName: undefined,
            _id: undefined
        },
        _const={
            _id: undefined,
            id: undefined,
        }
    ) { // constructor
        this.mongoSettings = {
            databaseName: _mongoSettings.databaseName,
            collectionName: _mongoSettings.collectionName,
            _id: _mongoSettings._id
        }
        this._infos = {
            generatedTimestamp: Date.now(),
            generatedDate: new Date()
        }
        this._id = _const._id
        this._object = _const

    } // end constructor


    /**
     * f() : Update l'objet chargé dans l'instance courante par rapport à la base de donnée
     */
    async _updateObject() {
        this._object = await Database_.Mongo.db(this.mongoSettings.databaseName).collection(this.mongoSettings.collectionName).findOne({_id: this.mongoSettings._id})
    }

    /**
     * f() : Incrémente le field renseigné de la valeur amount
     * @param {string} field - La liste en entrée
     * @param {IntegerType} amount - La liste en entrée
     */
    get get() {
        this._updateObject()
        return JSON.parse(JSON.stringify(this._object))
    }

    /**
     * f() : Définit le field renseigné avec la valeur donnée
     * @param {string} field - Le field à modifier
     * @param {any} value - La valeur à mettre
     * @param {Boolean} forceUpsert - Forcer ou non l'upsert 
     */
     async _setValue(field, value, forceUpsert=true) {
        await Database_.Mongo.db(this.mongoSettings.databaseName).collection(this.mongoSettings.collectionName).updateOne(
            { _id: this.mongoSettings._id },
            {
              $set: {
                [`${field}`]: value
              }
            },
            { upsert: forceUpsert }
        )
        await this._updateObject()
        return;
    }

    /**
     * f() : Ajoute la valeur renseignée à la liste correspondant au field
     * @param {string} field - Le field à modifier
     * @param {any} value - La valeur à ajouter
     * @param {Boolean} forceUpsert - Forcer ou non l'upsert 
     */
     async _pushValue(field, value, forceUpsert=false) {
        await Database_.Mongo.db(this.mongoSettings.databaseName).collection(this.mongoSettings.collectionName).updateOne(
            { _id: this.mongoSettings._id },
            {
              $push: {
                [`${field}`]: value
              }
            },
            { upsert: forceUpsert }
        )
        await this._updateObject()
        return;
    }

    /**
     * f() : Retire l'élément correspondant au field
     * @param {string} field - Le field à modifier
     * @param {Boolean} forceUpsert - Forcer ou non l'upsert 
     */
    async _unsetValue(field, forceUpsert=false) {
        await Database_.Mongo.db(this.mongoSettings.databaseName).collection(this.mongoSettings.collectionName).updateOne(
            { _id: this.mongoSettings._id },
            {
              $unset: {
                [`${field}`]: ""
              }
            },
            { upsert: forceUpsert }
        )
        await this._updateObject()
        return;
    }

    /**
     * f() : Incrémente le field renseigné de la valeur amount
     * @param {string} field - Le field à incrémenter
     * @param {Number} amount - La liste en entrée
     * @param {Boolean} forceUpsert - Forcer ou non l'upsert 
     */
    async _increaseValue(field, amount, forceUpsert=true) {
        await Database_.Mongo.db(this.mongoSettings.databaseName).collection(this.mongoSettings.collectionName).updateOne(
            { _id: this.mongoSettings._id },
            {
              $inc: {
                [`${field}`]: amount
              }
            },
            { upsert: forceUpsert }
        )
        await this._updateObject()
        return;
    }
    

    /**
     * f() : Warn l'utilisateur sur la guilde courante
     * @param {string} member_id - L'id du membre à warn
     * @param {string} reason - La raison du warn (null pour aucune)
     * @param {string} warnAuthor - L'auteur du warn (objet User)
     */
     async warnMember(member_id, reason=undefined, warnAuthor=undefined) {
        Logger.debug("warning user...")
        if(!reason || reason=="") reason = "Aucune"
        if(!warnAuthor || `${warnAuthor}`.length < 15) {
            warnAuthor = {
                id: "",
                username: "Unspecified",
                tag: "Unspecified",
                discriminator: "0000"
            }
        } else {
            warnAuthor = JSON.parse(JSON.stringify(warnAuthor))
        }
        //let field = `warns.${member_id}`

        let valueToPush = {
            timestamp: Date.now(),
            reason: reason,
            warnAuthor: warnAuthor,
        }

        await Database_.Mongo.db(this.mongoSettings.databaseName).collection(this.mongoSettings.collectionName).updateOne(
            { _id: this.mongoSettings._id },
            {
              $push: {
                ["warns."+member_id]: valueToPush
              }
            },
            { upsert: true }
        )
        await this._updateObject()
        return `Warned member ${member_id} for '${reason}' by '${warnAuthor.tag}'.`
    }

    /**
     * f() : Retourne la liste des warns que possède l'utilisateur
     * @param {string} member_id - L'id du membre à warn
     */
     getWarnsOfMember(member_id) {
        return this.get.warns[member_id] != undefined ? this.get.warns[member_id] : []
    }

    /**
     * f() : Incrémente de 1 le nombre de message de la journée
     */
    async newMessageForStats() {

        let dayNum = ((new Date()).getDay()-1+14)%7
        // 0 = lundi
        // 6 = Dimanche

        await Database_.Mongo.db(this.mongoSettings.databaseName).collection(this.mongoSettings.collectionName).updateOne(
            { _id: this.mongoSettings._id },
            {
              $inc: {
                [`stats.messageCount.day${dayNum}.value`]: 1
              }
            },
            { upsert: true }
        )
        await this._updateObject()
        return;
    }

    /**
     * f() : Retourne la moyenne de messages envoyés les 7 derniers jours
    */
    getMessageCountAverageOfWeek() {
        let counts = this.get.stats.messageCount
        let total = 0
        let countedDays = 0
        for(let i in counts) {
            total += counts[i].value; countedDays++
        }
        return (total/7) //(total/countedDays)
    }

    /**
     * f() : 
    */
    editCommand(name) {

    }


    getPlugins() { return this.get.settings.plugins }

    /**
     * f(): Initialise le plugin renseigné en créant l'espace de stockage des settings dans les données de la guilde.
     * @param {String} pluginID - L'identifiant unique du plugin
     * @returns Boolean
     */
    async initPlugin(pluginID) {
        if(this.getPluginSettings(pluginID)) return false
        this._pushValue(`settings.plugins.`, {
            pluginID: pluginID,
            enabled: false
        })
        return true
    }
    /**
     * f()
     * @param {String} pluginID - L'identifiant unique du plugin
     * @returns Boolean
     */
    async resetPluginSettings(pluginID) {
        let pluginSettings = this.getPluginSettings(pluginID)
        if(!pluginSettings) {
            Logger.warn(`Trying to reset a plugin that not exists for the guild '${this.get.id}'.`)
            return false
        }
        let indexOfPluginInList = this.get.settings.plugins.indexOf(pluginSettings)
        this._unsetValue(`settings.plugins.${indexOfPluginInList}`)
        return true
    }

    /**
     * f()
     * @param {String} pluginID - L'identifiant unique du plugin
     * @returns Object or undefined
     */
    getPluginSettings(pluginID) {
        return this.get.settings.plugins.filter((item,index) => { return item.pluginID == pluginID})[0]
    }
    /**
     * isPluginInitialized(): Renvoie true si le plugin a déjà été initialisé et possède de données, false sinon.
     * @param {String} pluginID - L'identifiant unique du plugin
     * @returns Boolean
     */
    isPluginInitialized(pluginID) {
        return !!this.getPluginSettings(pluginID)
    }
    /**
     * f()
     * @param {String} pluginID - L'identifiant unique du plugin
     * @param {String} optionName - Le nom de l'option du plugin à modifier
     * @param {Any} value - La valeur à mettre
     * @returns true or undefined
     */
    async setPluginOption(pluginID, optionName, value) {
        let pluginSettings = this.getPluginSettings(pluginID)
        if(!pluginSettings) {
            Logger.warn(`Trying to set plugin option on an unexisting plugin of the guild '${this.get.id}'.`)
            return undefined
        }
        let indexOfPluginInList = this.get.settings.plugins.indexOf(pluginSettings)
        return this._setValue(`settings.plugins.${indexOfPluginInList}.options.${optionName}`,value)
    }
    /**
     * f()
     * @param {String} pluginID - L'identifiant unique du plugin
     * @param {String} optionName - Le nom de l'option du plugin à modifier
     * @param {Any} value - La valeur à mettre
     * @returns true or undefined
     */
    async setPluginOptionMany(pluginID, listOfOptionsAndValues) {
        /*
        objectOfOptionsAndValues = [
            { optionName: "channel", value: "2598729537" },
            { optionName: "main_user", value: "11111111" },
        ]
        */
        let pluginSettings = this.getPluginSettings(pluginID)
        if(!pluginSettings) {
            Logger.warn(`Trying to set many plugin option on an unexisting plugin of the guild '${this.get.id}'.`)
            return undefined
        }
        for(let i in listOfOptionsAndValues) {
            await this.setPluginOption(pluginID, listOfOptionsAndValues[i].optionName, listOfOptionsAndValues[i].value)
        }
        return true
    }

    /**
     * f()
     * @param {String} pluginID - L'identifiant unique du plugin
     * @param {String} optionName - Le nom de l'option du plugin à récupérer
     * @returns optionValue or undefined
     */
     getPluginOption(pluginID, optionName) {
        let pluginSettings = this.getPluginSettings(pluginID)
        if(!pluginSettings) {
            Logger.warn(`Trying to get plugin option on an unexisting plugin of the guild '${this.get.id}'.`)
            return undefined
        }
        return pluginSettings.options[optionName]
    }

    /**
     * toggleEnablePlugin(): Active ou désactive le plugin sur la guilde
     * @param {String} pluginID - L'identifiant unique du plugin
     * @param {Boolean} boolean - Activer ou désactiver le plugin
     * @returns 
     */
    async toggleEnablePlugin(pluginID, boolean) {
        let pluginSettings = this.getPluginSettings(pluginID)
        if(!pluginSettings) {
            Logger.warn(`Trying to edit enable value of an unexisting plugin for the guild '${this.get.id}'.`)
            return undefined
        }
        let indexOfPluginInList = this.get.settings.plugins.indexOf(pluginSettings)
        return this._setValue(`settings.plugins.${indexOfPluginInList}.enabled`, boolean)
    }


}


module.exports.ServerClass = ServerClass