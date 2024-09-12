const config = require('../config')
const {cmd , commands} = require('../command')
const { fetchJson } = require('../lib/functions')

cmd({
    pattern: "apkdl",
    alias: ["modapk"],
    desc: "download apks",
    category: "download",
    filename: __filename,
    react: "📁"
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q && !q.startsWith("https://")) return reply("𝚊𝚙𝚔 𝚗𝚘𝚝 𝚏𝚘𝚞𝚗𝚍 ‼️")
        //fetch data from api  
        let data = await fetchJson(`${baseUrl}/api/apkdl?url=${q}`)
        reply("*ᴅᴏᴡɴʟᴏᴀᴅɪɴɢ...*")
        await conn.sendMessage(from, { document: { url: data.data.link_1 }, fileName: data.data.name, mimetype: data.data.file_type, caption: cap }, { quoted: mek })                                                                                                                 
    } catch (e) {
        console.log(e)
        reply(`Cant Find`)
    }
})
