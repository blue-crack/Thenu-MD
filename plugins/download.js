const { cmd , commands } = require('../command')
const { songList, videoList, sendYTaudio, sendYTdocument, sendYT720, sendYT480, sendYT360 } = youtubeDL
const yts = require('yt-search');
const Lang = Language.getString('downloadYT');

const findYT = async (name) => {
    const search = await yts(name)
    return search.all;
}

AMDI({ cmd: ["song", "yta", "mp3"], desc: Lang.songDesc, example: Lang.songExa, type: "download", react: "🎵" }, (async (amdiWA) => {
    let { input, prefix, reply, sendButtonsMsg, sendListMsg, urlRegexYT } = amdiWA.msgLayout;

    if (!input) return reply(Lang.needYTLink, '❓');
    if (input.includes('playlist')) return reply(Lang.noPL);

    let execYT = urlRegexYT(input);
    if (execYT.isYT === "LINK_!YT") return reply(Lang.needYTLink, '❓');
    const ytVidList = await findYT(input);

    if (!execYT.isYT) {
        var listInfo = {}
        listInfo.title = Lang.songListTitle
        listInfo.text = Lang.songListTXT
        listInfo.buttonTXT = 'Choose a song'

        try {
            let isFoundYTS = false;
            if (!isFoundYTS) { // First try in YTS package
                const sections = await songList(prefix, ytVidList);
                isFoundYTS = true;
                return await sendListMsg(listInfo, sections);
            }
            if (!isFoundYTS) { // Second try in YTS package
                const sections = await songList(prefix, ytVidList);
                isFoundYTS = true;
                return await sendListMsg(listInfo, sections);
            }
            if (!isFoundYTS) throw Error(Lang.noSearch)
        } catch (e) {
            console.log(e);
            return await reply(Lang.noSearch);
        }
    } else if (execYT.isYT) {
        const title = ytVidList[0] ? ytVidList[0].title : ''
        const ytDlTXT = `*🎶 Queen Amdi YT Downloader*\n\n📄 ${Lang.Title} ${title}`
        const buttons = [
            { type: "url", displayText: "Watch on YouTube", url: input },
            { type: "click", displayText: "🎶 Audio File", buttonCMD: `${prefix}ytdownload audio ${input}` },
            { type: "click", displayText: "📁 Document File", buttonCMD: `${prefix}ytdownload document ${input}` },
            { type: "click", displayText: "ℹ️ Video Info", buttonCMD: `${prefix}ytinfo ${input}` }
        ]
        return await sendButtonsMsg(buttons, { text: ytDlTXT, tagMsg: true, showURL: true });
    }
}));
