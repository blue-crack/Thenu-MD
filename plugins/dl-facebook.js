const config = require('../config')
const {cmd , commands} = require('../command')


cmd({
    pattern: "fb",
    desc: "fb download.",
    category: "download",
    filename: __filename

      },
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{

  if (!args[0]) {
    throw `✳️ Please send the link of a Facebook video\n\n📌 EXAMPLE :\n*${usedPrefix + command}* https://fb.watch/tXadtHWTjf/?mibextid=lbJOhI7Z2ZfpRMIi`
  }

  const urlRegex =
    /^(?:https?:\/\/)?(?:www\.)?(?:facebook\.com|fb\.watch)\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i
  if (!urlRegex.test(args[0])) {
    throw '⚠️ PLEASE GIVE A VALID URL.'
  }

  let url = `https://api.guruapi.tech/fbvideo?url=${args[0]}`

  m.react(rwait)

  try {
    const result = await fetch(url)
    const tex = `
⊱ ─── {* GURU FBDL*} ─── ⊰
↳ *VIDEO TITLE:* ${result.result.title}
⊱ ────── {⋆♬⋆} ────── ⊰`

    const response = await fetch(result.result.hd)
    const arrayBuffer = await response.arrayBuffer()
    const videoBuffer = Buffer.from(arrayBuffer)

    conn.sendFile(m.chat, videoBuffer, 'fb.mp4', tex, m)
    m.react(done)

    }catch(e){
  console.log(e)
  reply(`${e}`)
}
})
  
