const fs = require("fs")
const config = require('../config')
const {cmd , commands} = require('../command')
const { fetchJson } = require('../lib/functions')

cmd({
    pattern: "viewonce",
    desc: "Download viewonce messages.",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
      if(!citel.quoted) return citel.reply('Please quote a view once message.')
     if (citel.quoted.mtype !== "viewOnceMessage") return citel.reply('Please quote a view once message.')
      let buff = await Void.downloadAndSaveMediaMessage(citel.quoted)
      await Void.sendFile(buff);
        fs.unlinkSync(buff)
   }
}
 }catch(e){
  console.log(e)
  reply(`${e}`)
}
})
