const Logger = new (require("./logger"))()

let Database_;

module.exports._setDatabase = (db) => {
    Database_ = db
}


class GlobalSettingsClass {
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
    async setValue(field, value) {
        await Database_.Mongo.db(this.mongoSettings.databaseName).collection(this.mongoSettings.collectionName).updateOne(
            { _id: this.mongoSettings._id },
            {
              $set: {
                [`${field}`]: value
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
    
}


module.exports.GlobalSettingsClass = GlobalSettingsClass