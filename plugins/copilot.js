const config = require('../config')
const {cmd , commands} = require('../command')
const { fetchJson } = require('../lib/functions')

cmd({
    pattern: "copilot",
    desc: "copilot chat.",
    category: "ai",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let data = await fetchJson(`https://apis.vihangayt.com/ai/codemirror?q=${q}`)
return reply(`${data.data}`)
 }catch(e){
  console.log(e)
  reply(`${e}`)
}
})
