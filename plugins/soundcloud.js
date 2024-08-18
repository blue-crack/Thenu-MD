const config = require('../config')
const {cmd , commands} = require('../command')
const fg = require('api-dylux')
const yts = require('@vncsprd/soundcloud-downloader')
cmd({
    pattern: "soundcloud",
    desc: "download songs.",
    category: "download",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply("> 🔗Please give me a URL or TITLE🔗*")
const search = await mp3 (q) 
const data = search.audios[0];
const url = data.url
  
  let desc = `
  *♻️ 🎶Thenu-MD Soundcloud Downloader🎵 ♻️*
  
  - Title: ${data.title}
  - Description: ${data.description}
  - Time: ${data.timestamp}
  - Ago: ${data.ago}
  - Views: ${data.views}
    
 *🎵Your song downloading...*
 
> © Made by Thenula Panapiti.
  `
 await conn.sendMessage(from,{image:{url: data.thumbnail},caption:desc},{quoted:mek})
 
 //download audio

 let down = await fg.yta(url)
 let downloadUrl = down.dl_url
    
 //send audio message 

 await conn.sendMessage(from,{audio: {url:downloadUrl},mimetype:"audio/mpeg"},{quoted:mek})
 
}catch(e){
  console.log(e)
  reply(`${e}`)
}
})

 
