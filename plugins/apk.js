const config = require('../config')
const { cmd, commands } = require('../command')
cmd({
    pattern: "apk",
    alias: ["modapk"],
    desc: "download apks",
    category: "download",
    react: "⚡",
    filename: __filename
},
async(conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q && !q.startsWith("https://")) return reply("❗Apk Not Found,Sorry")
        //fetch data from api          
        let baseUrl = 'your_base_url'; // Define baseUrl here
        let data = await fetchJson(`${baseUrl}/api/apkdl?url=${q}`); // Correct template literal
        reply("plase waite...")
        await conn.sendMessage(from, { document: { url: data.data.link_1 }, fileName: data.data.name, mimetype: data.data.file_type, caption: cap }, { quoted: mek })                                                                                                                 
         }catch(e){
        console.log(e)
        reply(`${e}`)
        }
        })
