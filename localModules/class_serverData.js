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
     */
    async setValue(field, value) {
        await Database_.Mongo.db(this.mongoSettings.databaseName).collection(this.mongoSettings.collectionName).updateOne(
            { _id: this.mongoSettings._id },
            {
              $set: {
                field: value
              }
            },
            { upsert: true }
        )
        await this._updateObject()
        return;
    }

    /**
     * f() : Incrémente le field renseigné de la valeur amount
     * @param {string} field - Le field à incrémenter
     * @param {Number} amount - La liste en entrée
     */
    async increaseValue(field, amount) {
        await Database_.Mongo.db(this.mongoSettings.databaseName).collection(this.mongoSettings.collectionName).updateOne(
            { _id: this.mongoSettings._id },
            {
              $inc: {
                field: amount
              }
            },
            { upsert: true }
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


}


module.exports.ServerClass = ServerClass