

/*
For a Guild
*/

const config = require('../../config');


/*

module.exports = (user_id) => {
    return {
        _id: undefined,
        guild: {
            id: guild_object.id, // guild id
            name: guild_object.name // guild name
        },
        prefix: `${config.bot.prefix}`,
        debug: false,
        warns: {
            // "774003919625519134": [
            //     {timestamp: 2308562308563, reason: "No reason specified", authorID: "3086354363646"},
            //     {timestamp: 2308599843732, reason: "No reason specified", authorID: "2098623900396"}
            //]
            
        },
        channels: {},
        messages: {},
        giveaways: {},
        lol_commands: {
            enabled: false
        }
    }
}



let account_pattern = {
	discord: {
 		user: {
			username: "",
			discriminator: "",
			tag: "",
			id: "",
			locale: "",
			avatar: "",
			avatarURL: "",
			email: ""
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
					day: 30,
					month: 9,
					year: 2004
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

*/


module.exports = (user_id) => {
    return {
		discord: {
			user: {
				username: "",
				discriminator: "",
				tag: "",
				id: "",
				locale: "",
				avatar: "",
				avatarURL: "",
				email: ""
			},
			bot: {
				roles: []
			}
		},
		citizen: {
		},
		flag: {
			official: {
				havePixel: false,
				verified: false
			},
			new: {
				havePixel: false,
				verified: false // ne changera surement pas
			}
		},
        statistics: {
            messageCount: 0
        }
	}
}


