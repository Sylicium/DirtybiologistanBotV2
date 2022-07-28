const { config } = require("process");

let Database_;

module.exports._setDatabase = (db) => {
    Database_ = db
}

/*

{
  _id: { '$oid': '62055f185a5fe2cd5385b945' },
  card: {},
  id: '370576698481180674',
  coordinates: [ { '$numberInt': '45' }, { '$numberInt': '203' } ],
  verified: false,
  private_account: false,
  infos: {
    accountCreatedTimestamp: { '$numberDouble': '1.6366516091880E+12' },
    accountVerifiedTimestamp: { '$numberInt': '0' }
  },
  user: {
    id: '370576698481180674',
    tag: 'Shaqalito#0001',
    username: 'Shaqalito',
    discriminator: '0001',
    avatarURL: 'https://cdn.discordapp.com/avatars/370576698481180674/a_c4a46324e8f6be9275c0798202f84e7f.png?size=4096'
  },
  flag: {
    coordinates: { x: [Object], y: [Object] },
    indexInFlag: { '$numberInt': '-1' },
    index: { '$numberInt': '-1' },
    hexColor: 'none',
    author: 'none',
    pseudo: 'none',
    region: 'Wilderness',
    department: 'Wilderness'
  },
  accreditation: { '$numberInt': '1' },
  permissions: [],
  roles: [],
  stuff: [],
  money: {},
  temp: {},
  other: { notifyOnPixelChange: true },
  messageCount: { '$numberInt': '167' }
}

*/

class DBGAccount {
    constructor(_const={
        _id: undefined,
        id: undefined,
    }) {
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
        if(!_const.patternVersion || _const.patternVersion < config.patterns.patternVersion) {

        }
        /*
        this._object = {
            ...JSON.parse(JSON.stringify(account_pattern)),
            ..._const
        }
        */

        this._object = JSON.parse(JSON.stringify(account_pattern))
        this._object.discord.id = _const.discord.id
        this._object.discord.discriminator = _const.discord.discriminator
        this._object.discord.tag = _const.discord.tag
        this._object.discord.id = _const.discord.id
        this._object.discord.locale = _const.discord.locale
        this._object.discord.avatar = _const.discord.avatar
        this._object.discord.avatarURL = _const.discord.avatarURL
        this._object.discord.email = _const.discord.email
        
        this._object.discord.id = _const.discord.id
        this._object.discord.id = _const.discord.id
        this._object.discord.id = _const.discord.id
        this._object.discord.id = _const.discord.id
        this._object.discord.id = _const.discord.id
        this._object.discord.id = _const.discord.id

        this._object.bot.roles = _const.bot.roles

        this._object.identity.person.aaaaaaa = _const.identity.person.aaaaaaa
        this._object.identity.person.aaaaaaa = _const.identity.person.aaaaaaa
        this._object.identity.person.aaaaaaa = _const.identity.person.aaaaaaa
        this._object.identity.person.aaaaaaa = _const.identity.person.aaaaaaa
        this._object.identity.person.aaaaaaa = _const.identity.person.aaaaaaa
        this._object.identity.person.aaaaaaa = _const.identity.person.aaaaaaa
        this._object.identity.person.aaaaaaa = _const.identity.person.aaaaaaa
        this._object.identity.person.aaaaaaa = _const.identity.person.aaaaaaa
        this._object.identity.person.aaaaaaa = _const.identity.person.aaaaaaa
        this._object.identity.person.aaaaaaa = _const.identity.person.aaaaaaa
        this._object.identity.person.aaaaaaa = _const.identity.person.aaaaaaa
        this._object.identity.person.aaaaaaa = _const.identity.person.aaaaaaa
        this._object.identity.person.aaaaaaa = _const.identity.person.aaaaaaa
        this._object.identity.person.aaaaaaa = _const.identity.person.aaaaaaa
        this._object.identity.person.aaaaaaa = _const.identity.person.aaaaaaa


        // roles etc... (peut etre pas dans this.discord car aussi effectif sur le site car propre au compte DBG de la personne.)



    }

}


let account_pattern = {
	discord: {
 		user: {
			username: "a",
			discriminator: "a",
			tag: "a",
			id: "a",
			locale: "a",
			avatar: "a",
			avatarURL: "a",
			email: "a"
		},
        bot: {
            roles: []
        }
	},
	identity: {
		person: {
			name: {
				value: "",
				private: true
			},
			familyName: {
				value: "",
				private: true
			},
			pseudonyme: {
				value: "",
				private: false // si true, afficher Anonyme à la place du nom
			},
			birth: {
				value: {
					day: 0,
					month: 0,
					year: 0
				},
				private: true // le code pourra toujours y acceder pour confirmer l’utilisation de certain services.
			},
			//function getBirthDate() => return (new Date(day, month-1, year),
			//function getBirthString(format) => return formatDate(this.birth.value, format),
		},
	},
	citizen: {
		nationalOrder: {
			rank: {
				name: "", //"Templier"
				symbol: ""
			}
		},
	},
    flag: {
        official: {

        },
        new: {

        }
    }
}


module.exports.DBGAccount = DBGAccount