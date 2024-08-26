const config = require('../config')
const {cmd , commands} = require('../command')
import axios from 'axios'
cmd({
    pattern: "cristiano",
    desc: "send wallpapers Ronaldo.",
    category: "fun",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
  let cristiano = (
    await axios.get(
      `https://raw.githubusercontent.com/Guru322/api/Guru/BOT-JSON/CristianoRonaldo.json`
    )
  ).data
  let ronaldo = await cristiano[Math.floor(cristiano.length * Math.random())]
  conn.sendFile(m.chat, ronaldo, 'error.jpg', `*siuuuuuuuuuu*`, m)

  }catch(e){
  console.log(e)
  reply(`${e}`)
}
})

