

/*********************************/
/*      DirtyBiologistan Bot     */
/*             DBGB              */
/*  Développé par Sylicium#2487  */
/*                               */
/*          Version 2.0          */
/*   First update: 19/02/2022    */
/*    Last update: 10/04/2022    */
/*********************************/

try {
    require("dotenv").config()
} catch(e) {}

const Database = require("./localModules/database")
const MongoClient = require('mongodb').MongoClient;
const logger = new (require("./localModules/logger"))()


logger.info("=======================================")
logger.info("========== [Starting script] ==========")
logger.info("=======================================")

let url = process.env.MONGODB_URL

logger.info("Tentative de connection à MongoDB...")
MongoClient.connect(url, function(err, Mongo) {
    if(err) throw err
    Database._setMongoClient(Mongo)
    Database._useDb("DBGCanary")
    logger.info("  Mongo instance connected.")
    _allCode()
})

function _allCode() {

try{

function writeUncaughException(e, title) {
    console.error("[DBG] Uncaught Exception or Rejection",e.stack)
    const fs = require('fs')

    let date = (new Date).toLocaleString("fr-FR")

    if(!title) title = "/!\\ UNCAUGH ERROR /!\\"

    let log_text = `${title} ${e.stack.split("\n").join("\n")}\n`

    //console.log(`[${date} ERROR] (unknown): /!\\ UNCAUGH ERROR /!\\ ${e.stack}`)
    if(!fs.existsSync("./logs/mainUncaugh.log")) {
        fs.writeFileSync("./logs/mainUncaugh.log",`File created on ${date}\n\n`)
    }
    let log_text_split = log_text.split("\n")
    for(let i in log_text_split) {
        fs.appendFileSync("./logs/mainUncaugh.log",`[${date} ERROR] (unknown): ${log_text_split[i]}\n`, 'utf8');
    }
}

/* Importation des modules */
/**/
const { Client, MessageEmbed, Collection } = require('discord.js');
const config = require('./config');
//const commands = require('./help');
const fs = require('fs')

process
  .on('unhandledRejection', (reason, p) => {
    console.log(reason, '[DBG] Unhandled Rejection at Promise', p);
    writeUncaughException(reason, "Unhandled Rejection (process.on handle)")
  })
  .on('uncaughtException', err => {
    console.log(err, '[DBG] Uncaught Exception thrown BBBBBBBBBB');
    writeUncaughException(err, "Uncaught Exception (process.on handle)")
  });

// the asynchronous or synchronous code that emits the otherwise uncaught error


process.on('exit', function(code) {
    logger.error(`About to exit with code ${code}\n`);

    if(code == 0) {
        logger.log(`Le script s'est terminé normalement, par le code 0.`)
    }
});

//console.log = () => {throw new Error("ARRETE D'UTILI² LE CONSOLE.LOG T'AS DEV UN MODULE LOGGER C PAS POUR RIEN")}



logger.info("Starting all modules...")

/* Importation des scripts locaux */
/**/
let moduleList = {
    "./bot/run": "run"
}
for(let module in moduleList) {
    logger.info(`  Starting ${module} ...`)
    if(moduleList[module] == "start") {
        require(module).start()
    } else if(moduleList[module] == "run") {
        require(module).run()
    } else if(moduleList[module] == "()") {
        require(module)()
    } else if(moduleList[module] == "debug") {
        require(module).debug()
    }
    logger.info(`    Done. Started ${module}`)
}

let somef = require("./localModules/someFunctions")

//logger.debug("isScamLink: 'coucou': ",somef.isScam("coucou"))

setTimeout(async () => {
    logger.info("info")
    logger.warn("warn")
    logger.error("error")
    logger.log("log")
    logger.debug("debug")
    //logger.debug("the account found: "+ JSON.stringify( Database.findAccount({id:"774003919625519134"}) ))
    //logger.debug("the account found:", await Database.findAccount({id:"774003919625519134"}) )
    //logger.debug("the account found:", {"cc":1,"slt":[1,4,3]} )
}, 2000)



} catch(e) {

    writeUncaughException(e)

}

}
