const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
SESSION_ID: process.env.SESSION_ID,
ALIVE_IMG: process.env.ALIVE_IMG || "https://telegra.ph/file/e1805cc111530fe514728.jpg",
ALIVE_MSG: process.env.ALIVE_MSG || "*Hello!* . 'This is Thenu-MD Whatsapp WA BOT'...I'm alive now.. ..♻️😏..",
AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "true",
MODE: process.env.MODE || "public"

};
