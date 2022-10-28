const Logger = new (require("./logger"))()

let Database_;

module.exports._setDatabase = (db) => {
    Database_ = db
}


class PluginClass {
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
     * f() : Renvoie le json des données de l'objet
     */
    get get() {
        this._updateObject()
        return JSON.parse(JSON.stringify(this._object))
    }

    /**
     * f() : Définit le field renseigné avec la valeur donnée
     * @param {string} field - Le field à modifier
     * @param {any} value - La valeur à définir
     */
    async setValue(field, value, forceUpsert=true) {
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
     * f() : Incrémente le field renseigné de la valeur amount
     * @param {string} field - Le field à incrémenter
     * @param {Number} amount - La valeur à ajouter
     */
    async increaseValue(field, amount) {
        await Database_.Mongo.db(this.mongoSettings.databaseName).collection(this.mongoSettings.collectionName).updateOne(
            { _id: this.mongoSettings._id },
            {
              $inc: {
                [`${field}`]: amount
              }
            },
            { upsert: true }
        )
        await this._updateObject()
        return;
    }

    /**
     * f() : Décrémente le field renseigné de la valeur amount
     * @param {string} field - Le field à décrémenter
     * @param {Number} amount - La valeur à retirer
     */
     async decreaseValue(field, amount) {
        await Database_.Mongo.db(this.mongoSettings.databaseName).collection(this.mongoSettings.collectionName).updateOne(
            { _id: this.mongoSettings._id },
            {
              $inc: {
                [`${field}`]: -Math.abs(amount)
              }
            },
            { upsert: true }
        )
        await this._updateObject()
        return;
    }

    
    /**
     * setDisabled() : Permet d'activer ou de désactiver le plugin
     * @param {Boolean} boolean - Activer ou désactiver le plugin
     */
     async setDisabled(boolean) {
        await setValue("disabled",boolean)
    }
    /**
     * setMaintenance() : Permet d'activer ou désactiver la maintenance du plugin
     * @param {Boolean} boolean - Activer ou désactiver la maintenance
     */
     async setMaintenance(boolean) {
        await setValue("maintenance",boolean)
    }
    
    /**
     * setDBValue() : Permet de définir une clé de la mini base de donnée
     * @param {String} dbName - Nom de la mini database
     * @param {String} dbDocumentKey - Clé du document
     * @param {Any} value - Valeur à mettres
     */
     async setMiniDBValue(dbName, dbDocumentKey, value) {
        await setValue(`miniDB.${dbName}.${dbDocumentKey}`,boolean)
    }
    /**
     * getDBValue() : Permet de récupérer la valeur d'une clé de la mini base de donnée
     * @param {String} dbName - Nom de la mini database
     * @param {String} dbDocumentKey - Clé du document
     */
     getMiniDBValue(dbName, dbDocumentKey) {
        return (this._object.miniDB[dbName][dbDocumentKey] ?? undefined)
    }




    
}


module.exports.PluginClass = PluginClass