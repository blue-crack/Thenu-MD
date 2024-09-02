const {readEnv} = require('../lib/database')
const {cmd , commands} = require('../command')

cmd({
    pattern: "alive",
    desc: "Check bot online or no.",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const config = await readEnv();
return await conn.sendMessage(from,{image: {url: config.ALIVE_IMG},{Audio: {url: "https://github.com/prabathLK/AUTO-VOICE-SENDER-PRABATH-MD-/raw/main/plugins/bgm/I%20tried%20so%20hard%20got%20so%20far%20but%20In%20The%20And%20Matter.mp3"},caption: config.ALIVE_MSG},{quoted: mek})
}catch(e){
console.log(e)
reply(`${e}`)
}
})



