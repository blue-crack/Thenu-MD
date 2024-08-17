const config = require('../config')
const {cmd , commands} = require('../command')
const fg = requier('api-dylux')
const yts = require('yts-search')
cmd({
    pattern: "song",
    desc: "download songs.",
    category: "download",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply("*♻️Please give me a URL or TITLE*")
const search = await yts (q) 
const data = search.videos[0];
const url = data.url

let desc = ' 
  *♻️ Thenu-MD Song Downloader ♻️*
  
  title: ${data.title}
  description: ${data.description}
  time: ${data.timestamp}
  ago: ${data.ago}
  
}catch(e){
  console.log(e)
  reply('${e}')
}
}}
