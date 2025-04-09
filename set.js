const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'Zokou-MD-WHATSAPP-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0ptbjdpWDEya0JIQlJaMmc2WmdZcG94a2xkT1NUSk1Ob0JVSWNaMGYyQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibHpnWmlYaWk5cW03UGduK1pjZEM2eFpiQjB0TjhHWmF4OTVtQ2RaK2x3UT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJTFJ3WVJiblIwYXRoVnFxdEJZb1ZZdXRKb2NOQUtQbjFDU2FOR0pyNlVNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJGdi9MTmh2Tk8wTU9xUmxtZFlwazI0dEZoOWxFeTRVdDJDYzE2ZGxTRHpNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9FNGVEYmhCTFdEakdhUmFmUnR0MDRJaTlFOWpxWUNlNUtOaXNYY1cvVTg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InM5NTJIMFlnUTFGZ0ZEODFmOFJmczJFZmFUWTZPVWVaWGg3RWpZTnZjaHc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieURjZzhqT2hkU0E4Ykd5Nmw3WlExMURzMlhXRitjYWxUVFFBSmNyTzJrQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaTJjNnRHUWx4dVJsZi9WbkZaTGFVeWpmeTFDTXRwVGZsSFR0TWpOelFWOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtxakJmOVlMVjBoU3FpV3RUc1dYb3FsK3RRUlRLbENmaGdYeWNtN3BQTVFyazNXdEVGR01LU0dTNXlQaGNweWI0b2RyM1h4TVoxRVdqZy9yVlFCd2dBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjEwLCJhZHZTZWNyZXRLZXkiOiJEV1ZYMU90aUxUdDFlSzBPZFZISEJKbHY3b3Y0SEtsTzgxNXZCQ0VFRE04PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI0Mzg5MDQ4MDEyMEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIzMTQwMEVBRTYyNzUwMzM3NTM4Qzg0MkQ2NEZEOUYwQyJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ0MjExODY0fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiI0RFRQS0RaUyIsImxhc3RQcm9wSGFzaCI6IjJHNEFtdSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FnSUVnPT0ifSwibWUiOnsiaWQiOiIyNDM4OTA0ODAxMjA6MjZAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiVE/hl7Dhl7BZ4oCUzZ/Nns2e8J2XmvCdlK/wnZSm8J2UqvCdlKoiLCJsaWQiOiIyNjUzNjk0NzAxMzY1NTk6MjZAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNLU0FzcnNGRUkyZjJyOEdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJaSkZualU3TmpOMG5PTERaaS9yY1hWQi9yT2hXWXpvK2RXQjF5RkFJQUdZPSIsImFjY291bnRTaWduYXR1cmUiOiI3SmdMY3lUKzUxWG1UREZTdWVxOE03QjQ4ajJidHMySm1rcWpMWGxXWTdBTWE1MXd6a3FVRkdIOENMUWRKa09VcFhwY1MrY2JNRG5YdXVJQU9Dd0xCZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoieU1xODhDZENNTFVkTkkwOFFFQTM3c3d0Y2pwZzBZbXllaVlVSHNjK0MwM2c3Q1pTRnh2enFVQzlKK09Pa1dMemZjZEgrV3YwQ0VPT2V1aVRuM2YzaEE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNDM4OTA0ODAxMjA6MjZAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCV1NSWjQxT3pZemRKeml3Mll2NjNGMVFmNnpvVm1NNlBuVmdkY2hRQ0FCbSJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0NDIxMTg1NiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFDZ3MifQ==',
     ETAT:process.env.ETAT,
    PREFIXE: process.env.PREFIXE,
    NOM_OWNER: process.env.NOM_OWNER || "Zokou-Md",
    NUMERO_OWNER : process.env.NUMERO_OWNER,              
    LECTURE_AUTO_STATUS: process.env.LECTURE_AUTO_STATUS || "non",
    TELECHARGER_AUTO_STATUS: process.env.TELECHARGER_AUTO_STATUS || 'non',
    MODE: process.env.MODE_PUBLIC,
    PM_PERMIT: process.env.PM_PERMIT || 'non',
    BOT : process.env.NOM_BOT || 'Zokou_MD',
    URL : process.env.LIENS_MENU || 'https://static.animecorner.me/2023/08/op2.jpg',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    //GPT : process.env.OPENAI_API_KEY,
    DP : process.env.STARTING_BOT_MESSAGE || 'oui',
    ATD : process.env.ANTI_DELETE_MESSAGE || 'non',            
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
