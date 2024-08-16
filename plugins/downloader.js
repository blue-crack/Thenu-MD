

const config = require('../config')
const {cmd , commands} = require('../command')

cmd({
    pattern: "alive",
    desc: "Check bot online or no.",
    category: "main",
    filename: __filename)}
const { mediafireDl } = require('mfiredlcore-vihangayt')
const { cmd, commands } = require('../lib/command')
const { Download } = require("nima-threads-dl-api")
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson, jsonformat} = require('../lib/functions')
const { pinterest, wallpaper, wikimedia, quotesAnime, aiovideodl, umma, ringtone, styletext } = require('../lib/scraper')
const gis = require('async-g-i-s')
//let gis = require('g-i-s')
const cheerio = require('cheerio')
const axios = require("axios")
const vm = require('vm')
const yts = require('yt-search');
const FormData = require('form-data')
const videoSearchResults = new Map()
let currentPollIndex = 0
let optionIndex = 1;
const fs = require('fs');
const {unsplash, pixabay} = require("@sl-code-lords/image-library")
var {subsearch , subdl }  = require('@sl-code-lords/si-subdl')
//var { SinhalaSub }  = require('@sl-code-lords/movie-dl')


const { Tiktok } = require('../lib/tiktok')
function regtik(url) {return url.includes('tiktok.com')}
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))
async function fbDownloader(url) {
	try {
		const response1 = await axios({
			method: 'POST',
			url: 'https://snapsave.app/action.php?lang=vn',
			headers: {
				"accept": "*/*",
				"accept-language": "vi,en-US;q=0.9,en;q=0.8",
				"content-type": "multipart/form-data",
				"sec-ch-ua": "\"Chromium\";v=\"110\", \"Not A(Brand\";v=\"24\", \"Microsoft Edge\";v=\"110\"",
				"sec-ch-ua-mobile": "?0",
				"sec-ch-ua-platform": "\"Windows\"",
				"sec-fetch-dest": "empty",
				"sec-fetch-mode": "cors",
				"sec-fetch-site": "same-origin",
				"Referer": "https://snapsave.app/vn",
				"Referrer-Policy": "strict-origin-when-cross-origin"
			},
			data: {
				url
			}
		});

		let html;
		const evalCode = response1.data.replace('return decodeURIComponent', 'html = decodeURIComponent')
		eval(evalCode);
		html = html.split('innerHTML = "')[1].split('";\n')[0].replace(/\\"/g, '"')

		const $ = cheerio.load(html)
		const download = []

		const tbody = $('table').find('tbody')
		const trs = tbody.find('tr')

		trs.each(function (i, elem) {
			const trElement = $(elem)
			const tds = trElement.children()
			const quality = $(tds[0]).text().trim()
			const url = $(tds[2]).children('a').attr('href')
			if (url != undefined) {
				download.push({
					quality,
					url
				});
			}
		});

		return {
			success: true,
			download
		};
	}
	catch (err) {
		return {
			success: false
		};
	}
}
function fbreg(url) {
const fbRegex = /(?:https?:\/\/)?(?:www\.)?(m\.facebook|facebook|fb)\.(com|me|watch)\/(?:(?:\w\.)*#!\/)?(?:groups\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)/
return fbRegex.test(url)
}

//============================================================================

async function Insta(match) {
  const result = []
          const form = {
            url: match,
            submit: '',
          }
          const { data } = await axios(`https://downloadgram.org/`, {
            method: 'POST',
            data: form
          })
          const $ = cheerio.load(data)
                  $('#downloadhere > a').each(function (a,b) {
          const url = $(b).attr('href')
          if (url) result.push(url)
        })
              return result
  }

//============================================================================

async function sswebA(url = '', full = false, type = 'desktop') {
	type = type.toLowerCase()
	if (!['desktop', 'tablet', 'phone'].includes(type)) type = 'desktop'
	let form = new URLSearchParams()
	form.append('url', url)
	form.append('device', type)
	if (!!full) form.append('full', 'on')
	form.append('cacheLimit', 0)
	let res = await axios({
		url: 'https://www.screenshotmachine.com/capture.php',
		method: 'post',
		data: form
	})
	let cookies = res.headers['set-cookie']
	let buffer = await axios({
		url: 'https://www.screenshotmachine.com/' + res.data.link,
		headers: {
			'cookie': cookies.join('')
		},
		responseType: 'arraybuffer' 
	})
	return Buffer.from(buffer.data)
}


function formatUploadDate(uploadDate) {
  const date = new Date(uploadDate)
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

var needus = ''
if (config.LANG === 'SI') {
  needus = '*කරුණාකර මට threads url එකක් දෙන්න !!*'
} else {
  needus = '*Please give me threads url !!*'
}
var cantf = ''
if (config.LANG === 'SI') {
  cantf = '*මට මෙම වීඩියෝව සොයාගත නොහැක!*'
} else {
  cantf = '*I cant find this video!*'
}
var N_FOUND = ''
if (config.LANG === 'SI') {
  N_FOUND = '*මට කිසිවක් සොයාගත නොහැකි විය :(*'
} else {
  N_FOUND = "*I couldn't find anything :(*"
}
var urlneed = ''
if (config.LANG === 'SI') {
  urlneed = 'එය Baiscopelk වෙතින් සිංහල උපසිරැසි බාගත කරයි.'
} else {
  urlneed = 'It downloads sinhala subtitle from Baiscopelk.'
}
var imgmsg = ''
if (config.LANG === 'SI') {
  imgmsg = '```කරුණාකර වචන කිහිපයක් ලියන්න!```'
} else {
  imgmsg = '```Please write a few words!```'
}
var desc = ''
if (config.LANG === 'SI') {
  desc = 'Tiktok වෙතින් වීඩියෝ බාගත කරයි.'
} else {
  desc = 'Download videos from Facebook.'
}
var urlneed1 = ''
if (config.LANG === 'SI') {
  urlneed1 = '*කරුණාකර Tiktok video url එකක් ලබා දෙන්න*'
} else {
  urlneed1 = '*Please give me tiktok video url..*'
}
var desc1 = ''
if (config.LANG === 'SI') {
  desc1 = 'Facebook වෙතින් වීඩියෝ බාගත කරයි.'
} else {
  desc1 = 'Download videos from Facebook.'
}
var urlneed2 = ''
if (config.LANG === 'SI') {
  urlneed2 = '*කරුණාකර facebook video url එකක් ලබා දෙන්න*'
} else {
  urlneed2 = '*Please give me facebook video url..*'
}
var desc5 = ''
if (config.LANG === 'SI') {
  desc5 = 'ගූගල් හි අදාළ පින්තූර සෙවීම.'
} else {
  desc5 = 'Search for related pics on Google.'
}
var desc2 = ''
if (config.LANG === 'SI') {
  desc2 = 'unsplash.com හි අදාළ පින්තූර සෙවීම.'
} else {
  desc2 = 'Search for related pics on unsplash.com.'
}
var desc3 = ''
if (config.LANG === 'SI') {
  desc3 = 'pixabay.com හි අදාළ පින්තූර සෙවීම.'
} else {
  desc3 = 'Search for related pics on pixabay.com.'
}
var desc4 = ''
if (config.LANG === 'SI') {
  desc4 = 'bing හි අදාළ පින්තූර සෙවීම.'
} else {
  desc4 = 'Searche for related pics on bing.'
}
var errt = ''
if (config.LANG === 'SI') {
  errt = '*මට කිසිවක් සොයාගත නොහැකි විය :(*'
} else {
  errt = "*I couldn't find anything :(*"
}
var needus = ''
if (config.LANG === 'SI') {
  needus = '*කරුණාකර මට Instagram url එකක් දෙන්න !!*'
} else {
  needus = '*Please give me Instagram url !!*'
}
var imgmsg1 = ''
if (config.LANG === 'SI') {
  imgmsg1 = '*කරුණාකර මට url එකක් දෙන්න !*'
} else {
  imgmsg1 = '*Please give me a url !*'
}
var descg = ''
if (config.LANG === 'SI') {
  descg = 'එය ලබා දී ඇති url හි desktop ප්‍රමාණයේ තිර රුවක් ලබා දෙයි.'
} else {
  descg = 'It gives desktop size screenshot of given url.'
}
var descp = ''
if (config.LANG === 'SI') {
  descp = 'එය ලබා දී ඇති url හි දුරකථන ප්‍රමාණයේ තිර රුවක් ලබා දෙයි.'
} else {
  descp = 'It gives phone size screenshot of given url.'
}
var desct = ''
if (config.LANG === 'SI') {
  desct = 'එය ලබා දී ඇති url හි ටැබ්ලට් ප්‍රමාණයේ තිර රුවක් ලබා දෙයි.'
} else {
  desct = 'It gives tablet size screenshot of given url.'
}
var cant = ''
if (config.LANG === 'SI') {
  cant = '*මට තිර රුවක් ලබා ගත නොහැක. පසුව නැවත උත්සාහ කරන්න.*'
} else {
  cant = "*I can't get a screenshot. Try again later.*"
}
var urlneed3 = ''
if (config.LANG === 'SI') {
  urlneed3 = 'එය androidapksfree වෙතින් mod apps බාගත කරයි.'
} else {
  urlneed3 = 'It downloads mod apps from androidapksfree.'
}
var urlneed4 = ''
if (config.LANG === 'SI') {
  urlneed4 = 'එය playstore වෙතින් apps බාගත කරයි.'
} else {
  urlneed4 = 'It downloads apps from playstore.'
}
const _0x4fb670 = {}
_0x4fb670.pattern = 'save'
_0x4fb670.react = '\uD83D\uDCF1'
_0x4fb670.desc = 'xxx video dowloader'
_0x4fb670.category = 'download'
_0x4fb670.use = '.save mia kalifa'
_0x4fb670.filename = __filename
cmd(
  _0x4fb670,
  async (
    _0x126fae,
    _0x16401f,
    _0xe02fae,
    {
      from: _0x25c4b4,
      prefix: _0x50e1f2,
      l: _0x4b3609,
      quoted: _0x4fd084,
      body: _0x196885,
      isCmd: _0x353d0e,
      command: _0x258b20,
      args: _0x19e029,
      q: _0x354509,
      isGroup: _0x1b0ac9,
      sender: _0x528a5e,
      senderNumber: _0x4c20cd,
      botNumber2: _0x51197d,
      botNumber: _0xac8306,
      pushname: _0x4308d7,
      isMe: _0x51b1ab,
      isOwner: _0x5b3499,
      groupMetadata: _0x31d240,
      groupName: _0x2ef7e8,
      participants: _0x4088e9,
      groupAdmins: _0x1e6338,
      isBotAdmins: _0x5c6dcb,
      isAdmins: _0x58711a,
      reply: _0x34401b,
    }
  ) => {
    try {
      let _0x39ea7c =
        mem.reply_message && _0x39ea7c.reply_message.status
          ? message.reply_message
          : false
      if (_0x39ea7c) {
        const _0x131a3b = { quoted: _0x39ea7c }
        _0x126fae.forwardOrBroadCast(_0x25c4b4, Message, _0x131a3b)
      } else {
        _0x34401b('*reply to whatsapp status*')
      }
    } catch (_0x339f7f) {
      await _0x34401b(
        _0x339f7f + '\n\ncommand : #(Status Saver)',
        _0x339f7f,
        false
      ),
        _0x4b3609(_0x339f7f)
    }
  }
)
const _0x3908b0 = {}
_0x3908b0.pattern = 'xnxx'
_0x3908b0.react = '\uD83D\uDCF1'
_0x3908b0.desc = 'xxx video dowloader'
_0x3908b0.category = 'download'
_0x3908b0.use = '.xnxx mia kalifa'
_0x3908b0.filename = __filename
cmd(
  _0x3908b0,
  async (
    _0x35ebad,
    _0x569c47,
    _0x44b6b6,
    {
      from: _0x53a8fb,
      prefix: _0x95cff4,
      l: _0x436c17,
      quoted: _0x277d88,
      body: _0x538c5b,
      isCmd: _0x3b314a,
      command: _0x5075de,
      args: _0x4e6720,
      q: _0x89f773,
      isGroup: _0x210670,
      sender: _0x5ab664,
      senderNumber: _0x1dfb5b,
      botNumber2: _0x17173d,
      botNumber: _0x809920,
      pushname: _0x1cd84c,
      isMe: _0x3c0abf,
      isOwner: _0x28691f,
      groupMetadata: _0x2033ff,
      groupName: _0x14a89d,
      participants: _0x810d84,
      groupAdmins: _0x23135a,
      isBotAdmins: _0x3ae40a,
      isAdmins: _0x9fe782,
      reply: _0x1321ed,
    }
  ) => {
    try {
      if (!_0x89f773) {
        return _0x569c47.reply('Enter Query')
      }
      const _0x4d95d7 = require('api-dylux')
      let _0x4629b2 = await _0x4d95d7.xnxxSearch(_0x89f773),
        _0x1c410e = _0x4629b2.result.map(
          () =>
            'මොනාද හුත්තො කුනුහරප ඉල්ලන්නෙ\uD83E\uDD23 \n බැන්ඩ් කරගනිම් ඔව ඉල්ලල උබෙ whatsapp එක\uD83E\uDD23\nවලත්තයා '
        )
      if (_0x4629b2.status) {
        _0x569c47.reply(_0x1c410e)
      }
      const _0x57d1b8 = _0x4629b2.result,
        _0x2449b2 = { text: N_FOUND }
      const _0xe986ee = { quoted: _0x569c47 }
      if (_0x57d1b8.length < 1) {
        return await _0x35ebad.sendMessage(_0x53a8fb, _0x2449b2, _0xe986ee)
      }
      var _0x1527f6 = []
      for (var _0x5a1c25 = 0; _0x5a1c25 < _0x57d1b8.length; _0x5a1c25++) {
        _0x1527f6.push({
          title: _0x5a1c25 + 1,
          description: _0x57d1b8[_0x5a1c25].title,
          rowId:
            _0x95cff4 +
            'xnxxdl ' +
            _0x57d1b8[_0x5a1c25].link +
            '+' +
            _0x57d1b8[_0x5a1c25].title,
        })
      }
      const _0x5d8f32 = {
        title: '_[Result from androidapksfree.]_',
        rows: _0x1527f6,
      }
      const _0x5ce476 = [_0x5d8f32],
        _0x2a5986 = {
          text:
            '[\uD83D\uDC68‍\uD83D\uDCBB ＶＡＪＩＲＡ - ＭＤ - Ｖ4 \uD83D\uDC68‍\uD83D\uDCBB]\n\n   *XNXX VIDEO DOWNLOADER*\n\n*\uD83D\uDCF1 Enterd Name:* ' +
            _0x89f773,
          footer: config.FOOTER,
          title: 'Result from androidapksfree. \uD83D\uDCF2',
          buttonText: '*\uD83D\uDD22 Reply below number*',
          sections: _0x5ce476,
        }
      const _0x9b12b8 = _0x2a5986,
        _0x4b75dd = {}
      return (
        (_0x4b75dd.quoted = _0x569c47),
        await _0x35ebad.replyList(_0x53a8fb, _0x9b12b8, _0x4b75dd)
      )
    } catch (_0x5a4d78) {
      _0x1321ed('*ERROR !!*'), _0x436c17(_0x5a4d78)
    }
  }
)
const _0x3eac0a = {}
_0x3eac0a.pattern = 'img'
_0x3eac0a.react = '\uD83D\uDDBC️'
_0x3eac0a.desc = 'image downloader'
_0x3eac0a.category = 'download'
_0x3eac0a.use = '.img car'
_0x3eac0a.filename = __filename
cmd(
  _0x3eac0a,
  async (
    _0xc2db9c,
    _0x3d7d12,
    _0x573ed9,
    {
      from: _0x24bc76,
      l: _0x41a760,
      quoted: _0x8eb0f0,
      prefix: _0x445fce,
      body: _0x5371b4,
      isCmd: _0x556af5,
      command: _0x106e7a,
      args: _0x18f404,
      q: _0x40602c,
      isGroup: _0x4e16c4,
      sender: _0x47e47d,
      senderNumber: _0x2c38c2,
      botNumber2: _0x208513,
      botNumber: _0x54b8fc,
      pushname: _0x57e184,
      isMe: _0x1d0d15,
      isOwner: _0x497f38,
      groupMetadata: _0x487e5d,
      groupName: _0x201b90,
      participants: _0x461801,
      groupAdmins: _0x3b3035,
      isBotAdmins: _0x58e749,
      isAdmins: _0x152216,
      reply: _0x15de1e,
    }
  ) => {
    try {
      let _0x41e484 =
        '[\uD83D\uDC68‍\uD83D\uDCBB ＶＡＪＩＲＡ - ＭＤ - Ｖ4 \uD83D\uDC68‍\uD83D\uDCBB]\n   \n \u258F *IMG-DOWNLOADER*\n\n \u258F *\uD83C\uDFAD ʀᴇǫᴜᴇꜱᴛᴇʀ: ' +
        _0x57e184 +
        '*\n \u258F *\u270F️ ʀᴇꜱᴜʟᴛ: ' +
        _0x40602c +
        '*\n\n\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u25C9'
      const _0x340097 = [
          {
            title: '',
            rows: [
              {
                title: '1',
                rowId: _0x445fce + 'imgno ' + _0x40602c,
                description: 'Normal type images \uD83D\uDCC1',
              },
              {
                title: '2',
                rowId: _0x445fce + 'imgdoc ' + _0x40602c,
                description: 'Document type images \uD83D\uDDBC️',
              },
            ],
          },
        ],
        _0x5ecc7b = {
          text: _0x41e484,
          footer: config.FOOTER,
          buttonText: '\uD83D\uDD22 Reply below number,',
          sections: _0x340097,
          contextInfo: {},
        }
      _0x5ecc7b.contextInfo.externalAdReply = {}
      _0x5ecc7b.contextInfo.externalAdReply.title =
        '\uD83D\uDC68‍\uD83D\uDCBB ＶＡＪＩＲＡ - ＭＤ - Ｖ4 \uD83D\uDC68‍\uD83D\uDCBB'
      _0x5ecc7b.contextInfo.externalAdReply.body = 'ᴀɴ ᴜꜱᴇʀ ʙᴏᴛ ꜰᴏʀ ᴡʜᴀᴛꜱᴀᴘᴘ'
      _0x5ecc7b.contextInfo.externalAdReply.mediaType = 1
      _0x5ecc7b.contextInfo.externalAdReply.sourceUrl = ''
      _0x5ecc7b.contextInfo.externalAdReply.thumbnailUrl =
        'https://telegra.ph/file/b4caa5682d75220623b83.jpg'
      _0x5ecc7b.contextInfo.externalAdReply.renderLargerThumbnail = false
      _0x5ecc7b.contextInfo.externalAdReply.showAdAttribution = true
      const _0x1544db = _0x5ecc7b,
        _0x25743a = {}
      return (
        (_0x25743a.quoted = _0x3d7d12),
        await _0xc2db9c.replyList(_0x24bc76, _0x1544db, _0x25743a)
      )
    } catch (_0x10e59e) {
      _0x15de1e(N_FOUND)
      _0x41a760(_0x10e59e)
    }
  }
)
const _0x12d956 = {}
_0x12d956.pattern = 'imgno'
_0x12d956.react = '\uD83D\uDC7E'
_0x12d956.desc = 'to down images'
_0x12d956.category = ''
_0x12d956.use = '.im'
_0x12d956.filename = __filename
cmd(
  _0x12d956,
  async (
    _0x57ce92,
    _0x386080,
    _0x1aa8b9,
    {
      from: _0x2db174,
      l: _0x223173,
      prefix: _0x5b4bc2,
      quoted: _0x18d76c,
      body: _0x5673be,
      isCmd: _0x1f60f1,
      command: _0x55dc52,
      args: _0xb9a4d7,
      q: _0x2aae4a,
      isGroup: _0x2a051e,
      sender: _0x364151,
      senderNumber: _0x41c848,
      botNumber2: _0x5be60f,
      botNumber: _0x3512e4,
      pushname: _0x355b8c,
      isMe: _0xbceb1,
      isOwner: _0x21d1fe,
      groupMetadata: _0x39f2ab,
      groupName: _0x3c5828,
      participants: _0x560ecb,
      groupAdmins: _0x4a5786,
      isBotAdmins: _0x55ed0c,
      isAdmins: _0x3281cb,
      reply: _0x2d26cc,
    }
  ) => {
    try {
      if (!_0x2aae4a) {
        throw 'Example: ' + (_0x5b4bc2 + _0x55dc52) + ' Bike'
      }
      let _0x4a70e6 = require('g-i-s')
      _0x4a70e6(_0x2aae4a, async (_0x1b653b, _0x2e6be8) => {
        if (_0x1b653b) {
          return (
            console.error('Error fetching images:', _0x1b653b),
            _0x2d26cc('Error fetching images. Please try again later.')
          )
        }
        const _0xd1c5bb = _0x2e6be8.slice(0, 5)
        for (let _0x1f795f = 0; _0x1f795f < _0xd1c5bb.length; _0x1f795f++) {
          const _0x1cf61c = _0xd1c5bb[_0x1f795f].url,
            _0xaadc1d = { url: _0x1cf61c }
          let _0x3c5f64 = {
            image: _0xaadc1d,
            caption:
              '*-------\u300C VAJIRA MD GIMAGE SEARCH \u300D-------*\n\uD83E\uDD20 *Query* : ' +
              _0x2aae4a +
              '\n\n\uD83D\uDD17 *Image ' +
              (_0x1f795f + 1) +
              ' Url* : ' +
              _0x1cf61c,
          }
          const _0xb7509c = { quoted: _0x386080 }
          _0x57ce92.sendMessage(_0x2db174, _0x3c5f64, _0xb7509c)
        }
      })
    } catch (_0x2d0cdf) {
      _0x223173(_0x2d0cdf)
    }
  }
)
const _0x2d5fc2 = {}
_0x2d5fc2.pattern = 'imgdoc'
_0x2d5fc2.react = '\uD83D\uDC7E'
_0x2d5fc2.desc = 'to down images'
_0x2d5fc2.category = ''
_0x2d5fc2.use = '.im'
_0x2d5fc2.filename = __filename
cmd(
  _0x2d5fc2,
  async (
    _0x48418d,
    _0x1bc912,
    _0x41a4c8,
    {
      from: _0x4f1d80,
      l: _0x12765d,
      prefix: _0x559532,
      quoted: _0x4173f2,
      body: _0x4c52a1,
      isCmd: _0x3f8ee1,
      command: _0x3ad4c9,
      args: _0x35fee9,
      q: _0x3bc5c2,
      isGroup: _0x2df8f4,
      sender: _0x5ecf2d,
      senderNumber: _0x15b208,
      botNumber2: _0x2333b3,
      botNumber: _0x5e975c,
      pushname: _0x176d57,
      isMe: _0x41fad4,
      isOwner: _0x16c561,
      groupMetadata: _0x2b94ce,
      groupName: _0x5a3b56,
      participants: _0x3b80dc,
      groupAdmins: _0x5e4f1c,
      isBotAdmins: _0x434cbc,
      isAdmins: _0x358cef,
      reply: _0x427f88,
    }
  ) => {
    try {
      if (!_0x3bc5c2) {
        throw 'Example: ' + (_0x559532 + _0x3ad4c9) + ' Bike'
      }
      let _0x4716d9 = require('g-i-s')
      _0x4716d9(_0x3bc5c2, async (_0x371c2e, _0xcd19e6) => {
        if (_0x371c2e) {
          return (
            console.error('Error fetching images:', _0x371c2e),
            _0x427f88('Error fetching images. Please try again later.')
          )
        }
        const _0x26db2a = _0xcd19e6.slice(0, 5)
        for (let _0x57c8db = 0; _0x57c8db < _0x26db2a.length; _0x57c8db++) {
          const _0x2e863d = _0x26db2a[_0x57c8db].url,
            _0x13a019 = { url: _0x2e863d }
          let _0x491ddd = {
            document: _0x13a019,
            fileName: 'image.jpg',
            mimetype: 'image/jpeg',
            caption:
              '*-------\u300C VAJIRA MD GIMAGE SEARCH \u300D-------*\n\uD83E\uDD20 *Query* : ' +
              _0x3bc5c2 +
              '\n\n\uD83D\uDD17 *Image ' +
              (_0x57c8db + 1) +
              ' Url* : ' +
              _0x2e863d,
          }
          const _0x100d55 = { quoted: _0x1bc912 }
          _0x48418d.sendMessage(_0x4f1d80, _0x491ddd, _0x100d55)
        }
      })
    } catch (_0xeeda6c) {
      _0x12765d(_0xeeda6c)
    }
  }
)
const _0x381bdc = {}
_0x381bdc.pattern = 'psong'
_0x381bdc.react = '\uD83D\uDC7E'
_0x381bdc.desc = 'to down songs'
_0x381bdc.category = 'download'
_0x381bdc.use = '.song2'
_0x381bdc.filename = __filename
cmd(
  _0x381bdc,
  async (
    _0x4c59fd,
    _0xab2869,
    _0x302b5c,
    {
      from: _0x3c3bb1,
      l: _0x1d5fd8,
      prefix: _0x2fcb9d,
      quoted: _0x17d258,
      body: _0x45da30,
      isCmd: _0x28dee3,
      command: _0x4a4acf,
      args: _0x3c27ab,
      q: _0x14b234,
      isGroup: _0x3b626e,
      sender: _0x1a5969,
      senderNumber: _0x2259a2,
      botNumber2: _0x3fee8f,
      botNumber: _0x2920c1,
      pushname: _0x2acc63,
      isMe: _0xa7da9e,
      isOwner: _0x3c30ef,
      groupMetadata: _0x3c01c1,
      groupName: _0x1c4531,
      participants: _0xa1fd02,
      groupAdmins: _0x15c617,
      isBotAdmins: _0x311e5e,
      isAdmins: _0x2a2c00,
      reply: _0x6392a6,
    }
  ) => {
    try {
      if (!_0x14b234) {
        return _0x6392a6('Enter YouTube Video Link or Search Query!')
      }
      const _0x1c9b11 = await yts(_0x14b234)
      if (_0x1c9b11.videos.length > 0) {
        let _0x2f4ab2 = []
        const _0x5ea92d = 'yts_' + optionIndex,
          _0x44bdb8 = {}
        for (
          let _0x3f8fff = 0;
          _0x3f8fff < Math.min(5, _0x1c9b11.videos.length);
          _0x3f8fff++
        ) {
          const _0x6fd1e0 = _0x1c9b11.videos[_0x3f8fff],
            _0x418f48 = _0x6fd1e0.url,
            _0x496967 = _0x6fd1e0.title
          _0x44bdb8[optionIndex + '.' + (_0x3f8fff + 1)] = _0x418f48
          _0x2f4ab2.push(
            '.tet ' + optionIndex + '.' + (_0x3f8fff + 1) + ' ' + _0x496967
          )
        }
        if (!videoSearchResults.has(_0x5ea92d)) {
          videoSearchResults.set(_0x5ea92d, {})
        }
        videoSearchResults.set(
          _0x5ea92d,
          Object.assign(videoSearchResults.get(_0x5ea92d), _0x44bdb8)
        )
        await _0x4c59fd.sendPoll(_0x3c3bb1, 'Choose a video to download:', [
          ..._0x2f4ab2,
        ])
        optionIndex += 1
      } else {
        return _0x6392a6('No search results found.')
      }
    } catch (_0x12c3a0) {
      console.error('Error during play:', _0x12c3a0),
        _0xab2869.reply('Unexpected error occurred.'),
        _0x1d5fd8(_0x12c3a0)
    }
  }
)
const _0xfa89d = {}
_0xfa89d.pattern = 'tet'
_0xfa89d.react = '\uD83D\uDC7E'
_0xfa89d.desc = 'to take song'
_0xfa89d.category = 'download'
_0xfa89d.use = '.tet'
_0xfa89d.filename = __filename
cmd(
  _0xfa89d,
  async (
    _0x2e7070,
    _0x552b4c,
    _0x381f9e,
    {
      from: _0x30bba0,
      l: _0x5bb14c,
      prefix: _0x276fc4,
      quoted: _0x5b84b1,
      body: _0x374e0b,
      isCmd: _0x3f2c43,
      command: _0x1ed2a6,
      args: _0xb2dd9d,
      q: _0x12cc88,
      isGroup: _0x363c29,
      sender: _0x2892e1,
      senderNumber: _0x4ab5ca,
      botNumber2: _0x2785f2,
      botNumber: _0x33e649,
      pushname: _0x1bd5e8,
      isMe: _0x41049c,
      isOwner: _0x7dd250,
      groupMetadata: _0x12c138,
      groupName: _0x49c52e,
      participants: _0x4da8ae,
      groupAdmins: _0x56671f,
      isBotAdmins: _0xd4901,
      isAdmins: _0x14aaea,
      reply: _0x3b58f4,
    }
  ) => {
    try {
      if (!_0x12cc88) {
        return _0x3b58f4(
          'Please specify the video you want to play. Use the format: play [unique-key]'
        )
      }
      const _0x56b362 = _0x12cc88.match(/(\d+)\.(\d+)/)
      if (!_0x56b362) {
        return _0x3b58f4(
          'Invalid format. Please provide a valid unique key (e.g., 1.1)'
        )
      }
      const _0xaac03d = parseInt(_0x56b362[1]),
        _0x38baa4 = parseInt(_0x56b362[2]),
        _0x5c8f50 = 'yts_' + _0xaac03d
      if (videoSearchResults.has(_0x5c8f50)) {
        const _0x41405e =
          videoSearchResults.get(_0x5c8f50)[_0xaac03d + '.' + _0x38baa4]
        if (_0x41405e) {
          const _0x36e46c = await ytdl.getInfo(_0x41405e),
            _0x442669 =
              _0x36e46c.title ||
              (_0x36e46c.videoDetails && _0x36e46c.videoDetails.title) ||
              'N/A',
            _0x224120 =
              formatUploadDate(_0x36e46c.videoDetails.uploadDate) || 'N/A',
            _0x329928 =
              '\n\u256D\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2022\u221E\u2022\u2550\u2550\u256E\n\u2502\u2FFB *VAJIRA MD*\n\u2502  *Youtube Mp4 Player* \u2728\n\u2502\u2FFB *Title:* ' +
              _0x442669 +
              '\n\u2502\u2FFB *Author:* ' +
              (_0x36e46c.videoDetails.author.name || 'N/A') +
              '\n\u2502\u2FFB *Duration:* ' +
              _0x36e46c.videoDetails.lengthSeconds +
              's\n\u2502\u2FFB *Views:* ' +
              (_0x36e46c.videoDetails.viewCount.toLocaleString() || 'N/A') +
              '\n\u2502\u2FFB *Upload Date:* ' +
              _0x224120 +
              '\n\u2570\u2550\u2550\u2022\u221E\u2022\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u256F\n'
          await _0x2e7070.sendPoll(_0x30bba0, _0x329928, [
            '.\uD835\uDC00\uD835\uDC2E\uD835\uDC1D\uD835\uDC22\uD835\uDC28 ' +
              _0xaac03d +
              '.' +
              _0x38baa4,
            '.\uD835\uDC15\uD835\uDC22\uD835\uDC1D\uD835\uDC1E\uD835\uDC28 ' +
              _0xaac03d +
              '.' +
              _0x38baa4,
            '.\uD835\uDC00\uD835\uDC2E\uD835\uDC1D\uD835\uDC22\uD835\uDC28\uD835\uDC1D\uD835\uDC28\uD835\uDC1C\uD835\uDC2E\uD835\uDC26\uD835\uDC1E\uD835\uDC27\uD835\uDC2D ' +
              _0xaac03d +
              '.' +
              _0x38baa4,
            '.\uD835\uDC15\uD835\uDC22\uD835\uDC1D\uD835\uDC1E\uD835\uDC28\uD835\uDC1D\uD835\uDC28\uD835\uDC1C\uD835\uDC2E\uD835\uDC26\uD835\uDC1E\uD835\uDC27\uD835\uDC2D ' +
              _0xaac03d +
              '.' +
              _0x38baa4,
          ])
        } else {
          return _0x3b58f4(
            'Invalid sub-option. Please choose a valid sub-option.'
          )
        }
      } else {
        return _0x3b58f4(
          'Invalid unique key. Please provide a valid unique key.'
        )
      }
    } catch (_0x3242f4) {
      console.error('Error during poll creation:', _0x3242f4)
      return _0x3b58f4('Unexpected error occurred during poll creation.')
      _0x5bb14c(_0x3242f4)
    }
  }
)
const _0x3969df = {}
_0x3969df.pattern = 'xnxxdl'
_0x3969df.react = '\uD83D\uDC7E'
_0x3969df.desc = 'to take xnxx video'
_0x3969df.category = 'download'
_0x3969df.use = '.xnxxdl'
_0x3969df.filename = __filename
cmd(
  _0x3969df,
  async (
    _0x2c8d8e,
    _0x153eff,
    _0xf13e61,
    {
      from: _0x14d0e7,
      l: _0xb2de77,
      prefix: _0x372cc1,
      quoted: _0x7919c2,
      body: _0x57907b,
      isCmd: _0x5efaa2,
      command: _0xa91340,
      args: _0x248e71,
      q: _0x1b51e7,
      isGroup: _0x50d0c8,
      sender: _0x461eb3,
      senderNumber: _0x3b221d,
      botNumber2: _0x155af0,
      botNumber: _0xf2a145,
      pushname: _0x24a14b,
      isMe: _0x381b0e,
      isOwner: _0x2dcdd0,
      groupMetadata: _0x31f171,
      groupName: _0x9aa068,
      participants: _0x18d7fc,
      groupAdmins: _0x246c5,
      isBotAdmins: _0x37e790,
      isAdmins: _0x1a19b8,
      reply: _0x43cf17,
    }
  ) => {
    try {
      if (!_0x1b51e7.includes('xnxx.com')) {
        return _0x153eff.reply('Enter an xnxx link')
      }
      const _0x585a35 = require('api-dylux')
      let _0x5e667a = await _0x585a35.xnxxdl(_0x1b51e7)
      const _0x38e9d5 = {
        caption:
          '  *XNXX DL*\n        \n\u270D *Title:* ' +
          _0x5e667a.title +
          '\n\u231B *Duration:* ' +
          _0x5e667a.duration +
          '\n\uD83D\uDCFD *Visual Quality:* ' +
          _0x5e667a.quality,
        video: {},
      }
      _0x38e9d5.video.url = _0x5e667a.url_dl
      _0x2c8d8e.sendMessage(_0x153eff.chat, _0x38e9d5, { quoted: _0x153eff })
    } catch (_0x270539) {
      _0xb2de77(_0x270539)
    }
  }
)
const _0xb540a0 = {}
_0xb540a0.pattern = 'tempmail'
_0xb540a0.react = '\uD83D\uDC7E'
_0xb540a0.desc = 'to take a tempmail'
_0xb540a0.category = 'download'
_0xb540a0.use = '.tempmail'
_0xb540a0.filename = __filename
cmd(
  _0xb540a0,
  async (
    _0x41c5ae,
    _0x4644b7,
    _0x48ef35,
    {
      from: _0x35ecac,
      l: _0x162358,
      prefix: _0xd9e512,
      quoted: _0x18acd0,
      body: _0x3a99ac,
      isCmd: _0x4ba45a,
      command: _0x4abbb6,
      args: _0x2cd5d8,
      q: _0x48de38,
      isGroup: _0x4d3d29,
      sender: _0x19c63a,
      senderNumber: _0x1fb9ac,
      botNumber2: _0x1dae8d,
      botNumber: _0x3e5b58,
      pushname: _0x45a95b,
      isMe: _0x4c0d02,
      isOwner: _0x4679bb,
      groupMetadata: _0x3a4a0d,
      groupName: _0x30a1f7,
      participants: _0x195aa1,
      groupAdmins: _0x3057e1,
      isBotAdmins: _0x7486bf,
      isAdmins: _0x3be562,
      reply: _0x33ca98,
    }
  ) => {
    try {
      const _0x5b74b4 = 'https://tempmail.apinepdev.workers.dev/api/gen',
        _0x44a603 = await fetch(_0x5b74b4),
        _0x2b25b4 = await _0x44a603.json()
      if (!_0x2b25b4 || !_0x2b25b4.email) {
        return _0x33ca98('Failed to generate temporary email')
      }
      const _0x472105 = _0x2b25b4.email
      return _0x33ca98('Generated Temporary Email: ' + _0x472105)
    } catch (_0x282516) {
      return _0x33ca98('Unexpected error occurred during the request.')
      _0x162358(_0x282516)
    }
  }
)
const _0x5c8e78 = {}
_0x5c8e78.pattern = 'checkmail'
_0x5c8e78.react = '\uD83D\uDC7E'
_0x5c8e78.desc = 'to see mail'
_0x5c8e78.category = 'download'
_0x5c8e78.use = '.checkmail'
_0x5c8e78.filename = __filename
cmd(
  _0x5c8e78,
  async (
    _0x46c500,
    _0x3be062,
    _0x44a287,
    {
      from: _0x3c600a,
      l: _0x2eee02,
      prefix: _0x5a4910,
      quoted: _0x23fcc6,
      body: _0x13574b,
      isCmd: _0x478d66,
      command: _0x199552,
      args: _0x465de7,
      q: _0x57506f,
      isGroup: _0x1a3972,
      sender: _0x195493,
      senderNumber: _0xcdcbf4,
      botNumber2: _0x3e0bf4,
      botNumber: _0xe2c2ca,
      pushname: _0x14e38e,
      isMe: _0x2261bf,
      isOwner: _0x11f250,
      groupMetadata: _0x220a36,
      groupName: _0x8eadc9,
      participants: _0x3dfa4b,
      groupAdmins: _0x2cf42a,
      isBotAdmins: _0x59e5fa,
      isAdmins: _0x356261,
      reply: _0x740820,
    }
  ) => {
    try {
      if (!_0x57506f) {
        return _0x740820('*Provide me tempmail for view inbox*')
      }
      const _0x3c463f = encodeURIComponent(_0x57506f),
        _0x2f879e =
          'https://tempmail.apinepdev.workers.dev/api/getmessage?email=' +
          _0x3c463f,
        _0xad08fd = await fetch(_0x2f879e)
      if (!_0xad08fd.ok) {
        return _0x740820(
          'Invalid response from the API. Status code: ' + _0xad08fd.status
        )
      }
      const _0x49dc51 = await _0xad08fd.json()
      if (!_0x49dc51 || !_0x49dc51.messages) {
        return _0x740820('Failed to retrieve email messages')
      }
      const _0x33d6c2 = _0x49dc51.messages
      for (const _0x385cdf of _0x33d6c2) {
        const _0x4da3da = _0x385cdf.sender,
          _0x167b4f = _0x385cdf.subject,
          _0x1f1cce = new Date(
            JSON.parse(_0x385cdf.message).date
          ).toLocaleString(),
          _0x57628e = JSON.parse(_0x385cdf.message).body,
          _0x25f3f7 =
            'Sender: ' +
            _0x4da3da +
            '\nSubject: ' +
            _0x167b4f +
            '\nDate: ' +
            _0x1f1cce +
            '\nMessage: ' +
            _0x57628e
        await _0x740820(_0x25f3f7)
      }
    } catch (_0x2b0e29) {
      console.error('Error during API request:', _0x2b0e29)
      return _0x740820('Unexpected error occurred during the request.')
      _0x2eee02(_0x2b0e29)
    }
  }
)
const _0x36cf9b = {}
_0x36cf9b.pattern = 'gitclone'
_0x36cf9b.react = '\uD83D\uDD16'
_0x36cf9b.desc = 'download github repos'
_0x36cf9b.category = 'download'
_0x36cf9b.use = '.gitclone'
_0x36cf9b.filename = __filename
cmd(
  _0x36cf9b,
  async (
    _0x228e98,
    _0x5a2e23,
    _0x2a1f45,
    {
      from: _0x218f7c,
      prefix: _0x25a50d,
      l: _0x2563f9,
      quoted: _0x5d9b6a,
      body: _0x5a6fcf,
      isCmd: _0xe6b50c,
      command: _0x237001,
      args: _0x10fe49,
      q: _0x40181b,
      isGroup: _0x2a59b1,
      sender: _0x55ea73,
      senderNumber: _0x5cf1e2,
      botNumber2: _0x41ced3,
      botNumber: _0x5a7d7a,
      pushname: _0x2cf613,
      isMe: _0x26fd1f,
      isOwner: _0xb2cbff,
      groupMetadata: _0x123f77,
      groupName: _0x1458d5,
      participants: _0x17bfda,
      groupAdmins: _0x362cd7,
      isBotAdmins: _0xd81a0d,
      isAdmins: _0x5ee09c,
      reply: _0x1fa796,
    }
  ) => {
    try {
      if (!_0x10fe49[0]) {
        _0x1fa796(
          'Use ' +
            _0x25a50d +
            'gitclone repo link\n: https://github.com/VajiraTech/QUEEN-IZUMI-MD'
        )
      }
      if (
        !/(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i.test(
          _0x10fe49[0]
        )
      ) {
        return _0x1fa796('link')
      }
      let [, _0x4983c5, _0xc6185f] =
        _0x10fe49[0].match(
          /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i
        ) || []
      _0xc6185f = _0xc6185f.replace(/.git$/, '')
      let _0x516485 =
          'https://api.github.com/repos/' +
          _0x4983c5 +
          '/' +
          _0xc6185f +
          '/zipball',
        _0xe10b1d = '' + _0x4983c5 + _0xc6185f
      const _0x14bc73 = { url: _0x516485 }
      _0x228e98
        .sendMessage(
          _0x5a2e23.chat,
          {
            document: _0x14bc73,
            fileName: _0xe10b1d + '.zip',
            mimetype: 'application/zip',
            caption:
              '*ǫᴜᴇᴇɴ-ɪᴢᴜᴍɪ\u2022ᴍᴜʟᴛɪ-ᴅᴇᴠɪᴄᴇ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴛᴇᴄʜɴɪᴄᴀʟ ᴄʏʙᴇʀꜱ*',
          },
          { quoted: _0x5a2e23 }
        )
        .catch((_0x23c801) => _0x1fa796(mess.error))
    } catch (_0x393505) {
      _0x1fa796(), _0x2563f9(_0x393505)
    }
  }
)
const _0x6a8d89 = {}
_0x6a8d89.pattern = 'ehi'
_0x6a8d89.react = '\uD83D\uDDBC️'
_0x6a8d89.desc = 'ehi files downloader'
_0x6a8d89.category = 'download'
_0x6a8d89.use = '.ehi'
_0x6a8d89.filename = __filename
cmd(
  _0x6a8d89,
  async (
    _0x4b30e9,
    _0x29b7a6,
    _0x3c7e14,
    {
      from: _0x41e72a,
      l: _0x13bdca,
      quoted: _0x832982,
      prefix: _0x57bd9b,
      body: _0x460e53,
      isCmd: _0x5d72ae,
      command: _0x3b4bc1,
      args: _0x34418a,
      q: _0x130347,
      isGroup: _0x798c4c,
      sender: _0x16c8e1,
      senderNumber: _0x5d71ca,
      botNumber2: _0x3a714a,
      botNumber: _0x3fe100,
      pushname: _0x111798,
      isMe: _0x437123,
      isOwner: _0x21b9a3,
      groupMetadata: _0x45e108,
      groupName: _0x4df269,
      participants: _0x17929f,
      groupAdmins: _0x10734b,
      isBotAdmins: _0x443edc,
      isAdmins: _0x4c79fc,
      reply: _0xd3624f,
    }
  ) => {
    try {
      let _0xe7dde0 =
        "\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2768 \u2744 \u2769\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n\n            *\uD83C\uDF97️ ᴠᴀᴊɪʀᴀ ᴍᴅ ᴠ3 ᴇʜɪ \uD83C\uDF97️*\n    \n \u25AB ғʀᴇᴇ ᴇʜɪ\n \u25AB ᴍᴀᴋᴇ ᴅᴀᴛᴇ\n \u25AB ᴇxᴘɪʀᴇ ᴅᴀᴛᴇ \n     \n _\u2715 ɴᴏ ʜᴀᴄᴋɪɴɢ_\n _\u2715 ɴᴏ sᴘᴀᴍ_ \n _\u2715 ɴᴏ ᴅᴅᴏs_\n _\u2715 ᴅᴏɴ'ᴛ ᴜsᴇ ᴜɴɴᴇᴄᴇssᴀʀʏ ᴡᴏʀᴋ_\n \n    *ᴇɴᴊᴏʏ ʏᴏᴜʀ ᴇʜɪ ғɪʟᴇs \uD83D\uDC9E.*\n\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550[\uD83D\uDC80]"
      const _0x39dd75 = [
          {
            title: '',
            rows: [
              {
                title: '1',
                rowId: _0x57bd9b + 'httpinjector ' + _0x130347,
                description: 'apk of http injector',
              },
              {
                title: '2',
                rowId: _0x57bd9b + 'ehifiles ' + _0x130347,
                description: 'Down ehi files',
              },
              {
                title: '3',
                rowId: _0x57bd9b + 'aboutehi ' + _0x130347,
                description: 'Info of ehi files',
              },
            ],
          },
        ],
        _0x484000 = {
          text: _0xe7dde0,
          footer: config.FOOTER,
          buttonText: '\uD83D\uDD22 Reply below number,',
          sections: _0x39dd75,
          contextInfo: {},
        }
      _0x484000.contextInfo.externalAdReply = {}
      _0x484000.contextInfo.externalAdReply.title =
        '\uD83D\uDC68‍\uD83D\uDCBB ＶＡＪＩＲＡ - ＭＤ - Ｖ4 \uD83D\uDC68‍\uD83D\uDCBB'
      _0x484000.contextInfo.externalAdReply.body = 'ᴀɴ ᴜꜱᴇʀ ʙᴏᴛ ꜰᴏʀ ᴡʜᴀᴛꜱᴀᴘᴘ'
      _0x484000.contextInfo.externalAdReply.mediaType = 1
      _0x484000.contextInfo.externalAdReply.sourceUrl = ''
      _0x484000.contextInfo.externalAdReply.thumbnailUrl =
        'https://telegra.ph/file/b4caa5682d75220623b83.jpg'
      _0x484000.contextInfo.externalAdReply.renderLargerThumbnail = false
      _0x484000.contextInfo.externalAdReply.showAdAttribution = true
      const _0xe5b6e0 = _0x484000,
        _0x588d9c = {}
      return (
        (_0x588d9c.quoted = _0x29b7a6),
        await _0x4b30e9.replyList(_0x41e72a, _0xe5b6e0, _0x588d9c)
      )
    } catch (_0x1d5b51) {
      _0xd3624f(N_FOUND)
      _0x13bdca(_0x1d5b51)
    }
  }
)
const _0x48a980 = {}
_0x48a980.pattern = 'aboutehi'
_0x48a980.category = ''
_0x48a980.filename = __filename
cmd(
  _0x48a980,
  async (
    _0x21d07b,
    _0xb82efa,
    _0x2308c5,
    {
      from: _0x319885,
      l: _0x4b4939,
      quoted: _0x319c45,
      body: _0x4b8623,
      isCmd: _0x4cd318,
      command: _0x16319c,
      args: _0x1df2bb,
      q: _0x3b14f4,
      isGroup: _0x41daba,
      sender: _0x2008d4,
      senderNumber: _0x4fc766,
      botNumber2: _0x4a3b68,
      botNumber: _0x1c8ca1,
      pushname: _0x1615ae,
      isMe: _0x5d5823,
      isOwner: _0x41e327,
      groupMetadata: _0x43cef0,
      groupName: _0x1205dc,
      participants: _0x90fa67,
      groupAdmins: _0x56c35a,
      isBotAdmins: _0x5438e0,
      isAdmins: _0xb455ed,
      reply: _0x2ede5d,
    }
  ) => {
    try {
      let _0x32d9f0 =
        '\uD83D\uDCAC Ehi file යනු* ,\nඔබට whatsapp package බාවිතාකර free internet ලබාගත හැකි ක්‍රමයකි.\n\nඋදාහරණයක් ලෙස , ඔබට whatsapp package එක බාවිතාකරමින් tiktok , fb , youtube , google යාම වැනිදේ සිදුකර හැකිවීම.\nමෙම ehi file උපරිම අන්තර්ජාල වේගයක් ලබා නොදෙයි. නමුත් ඔබට යම් වේගයකින් අන්තර්ජාල පහසුකම් ලබාගත හැක.\nඔබට මෙම ehi file සාමාන්‍යයෙන් අප බාවිතාකරන \nwhatsapp , facebook , youtube , zoom යන ආදී package වලට ගැලපෙන ආකාරයේ file බාවිතාකර හැක \n\n\nබාවිතාකරන්නේ කෙසේද ?\n1. http injector app එක ඔබගේ phone එකට install කරගන්න \n2. ඔබගේ package එකට අදාල ehi file එක තෝරාගන්න \n3. එම file එක httpinjector app එකට ඇතුලත් කර start බටන් එක ඔබන්න \n( ඔබට මෙම file බාවිතාකිරීමටනම් ඉහත කිසියම් හෝ package 1ක් දමාගෙන තිබිය යුතුය )\n\n*\xA9 ᴛᴇᴄʜɴɪᴄᴀʟ ᴄʏʙᴇʀꜱ*\n\n============================================================================\n\n*\uD83D\uDCAC Ehi file is*,\n It is a method where you can get free internet by using whatsapp package.\n For example, you can use whatsapp package to go to tiktok, fb, youtube, google etc.\n\n This ehi file does not provide maximum internet speed.  But you can get internet facility at some speed.\n You can find this ehi file which we usually use\n You can use the type of file suitable for packages like whatsapp, facebook, youtube, zoom etc\n\n*How to use*\n 1. Install the http injector app on your phone.\n 2. Select the ehi file related to your package.\n 3. Enter that file into the httpinjector app and press the start button.\n_( If you want to use this file, you must have one of the above packages installed )_\n\n\n*\xA9 ᴛᴇᴄʜɴɪᴄᴀʟ ᴄʏʙᴇʀꜱ*'
      const _0x41e95f = [],
        _0xf439d3 = {
          caption: _0x32d9f0,
          footer:
            '*ᴠᴀᴊɪʀᴀ-ᴍᴅ\u2022ᴍᴜʟᴛɪ-ᴅᴇᴠɪᴄᴇ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴛᴇᴄʜɴɪᴄᴀʟ ᴄʏʙᴇʀꜱ*',
          buttons: _0x41e95f,
          headerType: 1,
        }
      const _0x2d0bee = _0xf439d3
      return await _0x21d07b.buttonMessage(_0x319885, _0x2d0bee, _0xb82efa)
    } catch (_0x471ae6) {
      _0x4b4939(_0x471ae6)
    }
  }
)
const _0x2d9856 = {}
_0x2d9856.pattern = 'httpinjector'
_0x2d9856.dontAddCommandList = true
_0x2d9856.filename = __filename
cmd(
  _0x2d9856,
  async (
    _0x30e031,
    _0x4f3b67,
    _0x4d45e0,
    {
      from: _0xd107fd,
      l: _0x3485c0,
      quoted: _0x325bfb,
      body: _0x17d9d1,
      isCmd: _0x2a9930,
      command: _0x114ce1,
      args: _0x427b66,
      q: _0x2b984c,
      isGroup: _0x192c20,
      sender: _0x3d323b,
      senderNumber: _0x5d74ad,
      botNumber2: _0x25b1ac,
      botNumber: _0x263b33,
      pushname: _0x4beb3a,
      isMe: _0xdeab13,
      isOwner: _0x594f36,
      groupMetadata: _0x3f2971,
      groupName: _0x116909,
      participants: _0x4d4a57,
      groupAdmins: _0x3f2a59,
      isBotAdmins: _0x2ddb0b,
      isAdmins: _0x587b67,
      reply: _0x420a81,
    }
  ) => {
    try {
      const _0xc6b2ac = {
        text: '\uD83D\uDCE5',
        key: _0x4f3b67.key,
      }
      const _0x4cdde4 = { react: _0xc6b2ac }
      await _0x30e031.sendMessage(_0xd107fd, _0x4cdde4)
      const _0xed27a0 = {
        url: 'https://github.com/VajiraTech/Izumi-ehi/blob/main/Http_injector/HTTP%20Injector%20(SSHProxyV2Ray)%20VPN.apk',
      }
      const _0x5278eb = {
        document: _0xed27a0,
        mimetype: 'application/vnd.android.package-archive',
        fileName: 'HTTP Injector Qᴜᴇᴇɴ-ɪᴢᴜᴍɪ (SSHProxyV2Ray) VPN.apk',
        caption: config.FOOTER,
      }
      const _0x2da523 = { quoted: _0x4f3b67 }
      await _0x30e031.sendMessage(_0xd107fd, _0x5278eb, _0x2da523)
      const _0x56388c = {
        text: '\u2714',
        key: _0x4f3b67.key,
      }
      const _0x10abe9 = { react: _0x56388c }
      await _0x30e031.sendMessage(_0xd107fd, _0x10abe9)
    } catch (_0x3c1adc) {
      _0x420a81('*ERROR !!*'), _0x3485c0(_0x3c1adc)
    }
  }
)
const _0xe0a104 = {}
_0xe0a104.pattern = 'ehifiles'
_0xe0a104.dontAddCommandList = true
_0xe0a104.filename = __filename
cmd(
  _0xe0a104,
  async (
    _0x5a1e5c,
    _0x3d305c,
    _0x4dbea7,
    {
      from: _0x5be70d,
      l: _0x563e71,
      quoted: _0x476b67,
      body: _0xe50c59,
      isCmd: _0x2f7f57,
      command: _0xe3e17c,
      args: _0x5eb9fe,
      q: _0x11f480,
      isGroup: _0x1cd9c2,
      sender: _0x2f00b5,
      senderNumber: _0x304f71,
      botNumber2: _0x344d26,
      botNumber: _0x4ce3be,
      pushname: _0x36456e,
      isMe: _0x566c9e,
      isOwner: _0xb081b2,
      groupMetadata: _0xc42347,
      groupName: _0x593e82,
      participants: _0x32b74b,
      groupAdmins: _0x123687,
      isBotAdmins: _0x457619,
      isAdmins: _0x241d95,
      reply: _0x6cc9bf,
    }
  ) => {
    try {
      const _0x351118 = await fetchJson(
        'https://gist.github.com/VajiraTech/e13022d2d3eacaac87967d8ee67ddf25/raw'
      )
      ehi = _0x351118.EHI_FILES[0].SG_FILE1
      ehi2 = _0x351118.EHI_FILES[0].SG_FILE2
      ehi3 = _0x351118.EHI_FILES[0].SG_FILE3
      ehi4 = _0x351118.EHI_FILES[0].SG_FILE4
      ehi5 = _0x351118.EHI_FILES[1].US_FILE1
      ehi6 = _0x351118.EHI_FILES[1].US_FILE2
      ehi7 = _0x351118.EHI_FILES[1].US_FILE3
      ehi8 = _0x351118.EHI_FILES[1].US_FILE4
      const _0x5c1aa0 = {
        text:
          '\n' +
          _0x351118.EHI +
          '\n' +
          _0x351118.C_E_DATES +
          '\n' +
          _0x351118.XX_XX +
          '\n',
      }
      await _0x5a1e5c.sendMessage(_0x3d305c.chat, _0x5c1aa0, {
        quoted: _0x3d305c,
      })
      const _0x56c819 = { url: ehi }
      const _0x3991fe = {
        document: _0x56c819,
        mimetype: 'application/octet-stream',
        fileName:
          _0x351118.EHI_IMOJI + ' FaceBook ' + _0x351118.EHI_IMOJI + '.ehi',
      }
      await _0x5a1e5c.sendMessage(_0x3d305c.chat, _0x3991fe, {
        quoted: _0x3d305c,
      })
      const _0x341752 = { url: ehi2 }
      const _0x318adb = {
        document: _0x341752,
        mimetype: 'application/octet-stream',
        fileName:
          _0x351118.EHI_IMOJI + ' Whatsapp ' + _0x351118.EHI_IMOJI + '.ehi ',
      }
      await _0x5a1e5c.sendMessage(_0x3d305c.chat, _0x318adb, {
        quoted: _0x3d305c,
      })
      const _0x175ef3 = { url: ehi3 }
      const _0x4b631b = {
        document: _0x175ef3,
        mimetype: 'application/octet-stream',
        fileName:
          _0x351118.EHI_IMOJI + ' Youtube ' + _0x351118.EHI_IMOJI + '.ehi',
      }
      await _0x5a1e5c.sendMessage(_0x3d305c.chat, _0x4b631b, {
        quoted: _0x3d305c,
      })
      const _0x4948cb = { url: ehi4 }
      const _0xd840d9 = {
        document: _0x4948cb,
        mimetype: 'application/octet-stream',
        fileName: _0x351118.EHI_IMOJI + ' Zoom ' + _0x351118.EHI_IMOJI + '.ehi',
      }
      await _0x5a1e5c.sendMessage(_0x3d305c.chat, _0xd840d9, {
        quoted: _0x3d305c,
      })
      const _0x1ec2d5 = { url: ehi5 }
      const _0x3b16b4 = {
        document: _0x1ec2d5,
        mimetype: 'application/octet-stream',
        fileName:
          _0x351118.EHI_IMOJI2 + ' FaceBook ' + _0x351118.EHI_IMOJI2 + '.ehi',
      }
      await _0x5a1e5c.sendMessage(_0x3d305c.chat, _0x3b16b4, {
        quoted: _0x3d305c,
      })
      const _0x120d00 = { url: ehi6 }
      const _0x51c568 = {
        document: _0x120d00,
        mimetype: 'application/octet-stream',
        fileName:
          _0x351118.EHI_IMOJI2 + ' Whatsapp ' + _0x351118.EHI_IMOJI2 + '.ehi ',
      }
      await _0x5a1e5c.sendMessage(_0x3d305c.chat, _0x51c568, {
        quoted: _0x3d305c,
      })
      const _0x305907 = { url: ehi7 }
      const _0x312b01 = {
        document: _0x305907,
        mimetype: 'application/octet-stream',
        fileName:
          _0x351118.EHI_IMOJI2 + ' Youtube ' + _0x351118.EHI_IMOJI2 + '.ehi',
      }
      await _0x5a1e5c.sendMessage(_0x3d305c.chat, _0x312b01, {
        quoted: _0x3d305c,
      })
      const _0x53d43f = { url: ehi8 }
      const _0x2b70b8 = {
        document: _0x53d43f,
        mimetype: 'application/octet-stream',
        fileName:
          _0x351118.EHI_IMOJI2 + ' Zoom ' + _0x351118.EHI_IMOJI2 + '.ehi',
      }
      await _0x5a1e5c.sendMessage(_0x3d305c.chat, _0x2b70b8, {
        quoted: _0x3d305c,
      })
      await _0x5a1e5c.sendMessage(
        _0x3d305c.chat,
        '\u2705 _Success send_ *' + _0x3d305c.pushName + '* _Ehi Files..._',
        _0x3d305c
      )
    } catch (_0x13f90c) {
      _0x6cc9bf(
        '*\uD83D\uDCE5 \uD835\uDE50\uD835\uDE4B\uD835\uDE47\uD835\uDE4A\uD835\uDE3C\uD835\uDE3F\uD835\uDE40\uD835\uDE3F \uD835\uDE3D\uD835\uDE54 \uD835\uDE51\uD835\uDE3C\uD835\uDE45\uD835\uDE44\uD835\uDE4D\uD835\uDE3C \uD835\uDE48\uD835\uDE3F \uD835\uDE4A\uD835\uDE52\uD835\uDE49\uD835\uDE40\uD835\uDE4D*'
      ),
        _0x563e71(_0x13f90c)
    }
  }
)
const _0x18cd05 = {}
_0x18cd05.pattern = 'fmmods'
_0x18cd05.alias = ['wamod', 'wamods', 'fmmod']
_0x18cd05.react = '\uD83D\uDCF2'
_0x18cd05.desc = 'Download all fmmods.'
_0x18cd05.category = 'download'
_0x18cd05.use = '.fmmods'
_0x18cd05.filename = __filename
cmd(
  _0x18cd05,
  async (
    _0x253ae6,
    _0x18f6d5,
    _0xab6b2e,
    {
      from: _0x199272,
      l: _0x51d608,
      quoted: _0x1b2033,
      prefix: _0x473d81,
      body: _0x1f9826,
      isCmd: _0x3a3bfe,
      command: _0x18fcec,
      args: _0x2f56c8,
      q: _0x18fe57,
      isGroup: _0x248ccd,
      sender: _0xb3bd19,
      senderNumber: _0x596b7,
      botNumber2: _0x3822a8,
      botNumber: _0x309e81,
      pushname: _0x3d1f48,
      isMe: _0x103e44,
      isOwner: _0x3dd61d,
      groupMetadata: _0x328152,
      groupName: _0x582525,
      participants: _0x1e4995,
      groupAdmins: _0x25633a,
      isBotAdmins: _0x4cc929,
      isAdmins: _0x31c654,
      reply: _0x1716e6,
    }
  ) => {
    try {
      let _0x5c2c5a = (
        await fetchJson('https://api.maher-zubair.tech/whatsapp/wamods')
      ).data
      const _0x1b4520 = [
          {
            title: '',
            rows: [
              {
                title: '1',
                rowId:
                  _0x473d81 +
                  'dmod ' +
                  _0x5c2c5a.com_whatsapp.link +
                  '+' +
                  _0x5c2c5a.com_whatsapp.name,
                description: _0x5c2c5a.com_whatsapp.name,
              },
              {
                title: '2',
                rowId:
                  _0x473d81 +
                  'dmod ' +
                  _0x5c2c5a.com_fmwhatsapp.link +
                  '+' +
                  _0x5c2c5a.com_fmwhatsapp.name,
                description: _0x5c2c5a.com_fmwhatsapp.name,
              },
              {
                title: '3',
                rowId:
                  _0x473d81 +
                  'dmod ' +
                  _0x5c2c5a.com_gbwhatsapp.link +
                  '+' +
                  _0x5c2c5a.com_gbwhatsapp.name,
                description: _0x5c2c5a.com_gbwhatsapp.name,
              },
              {
                title: '4',
                rowId:
                  _0x473d81 +
                  'dmod ' +
                  _0x5c2c5a.com_yowhatsapp.link +
                  '+' +
                  _0x5c2c5a.com_yowhatsapp.name,
                description: _0x5c2c5a.com_yowhatsapp.name,
              },
            ],
          },
        ],
        _0x1be784 = {
          text: '[\uD83D\uDC68‍\uD83D\uDCBB ＶＡＪＩＲＡ - ＭＤ - Ｖ4 \uD83D\uDC68‍\uD83D\uDCBB]\n      \n*Foud Whatsapp Mod Downloader \uD83D\uDCF2*\n',
          footer: config.FOOTER,
          buttonText: '\uD83D\uDD22 Reply below number,',
          sections: _0x1b4520,
          contextInfo: {},
        }
      _0x1be784.contextInfo.externalAdReply = {}
      _0x1be784.contextInfo.externalAdReply.title =
        '\uD83D\uDC68‍\uD83D\uDCBB ＶＡＪＩＲＡ - ＭＤ - Ｖ4 \uD83D\uDC68‍\uD83D\uDCBB'
      _0x1be784.contextInfo.externalAdReply.body = 'ᴀɴ ᴜꜱᴇʀ ʙᴏᴛ ꜰᴏʀ ᴡʜᴀᴛꜱᴀᴘᴘ'
      _0x1be784.contextInfo.externalAdReply.mediaType = 1
      _0x1be784.contextInfo.externalAdReply.sourceUrl = ''
      _0x1be784.contextInfo.externalAdReply.thumbnailUrl =
        'https://telegra.ph/file/b4caa5682d75220623b83.jpg'
      _0x1be784.contextInfo.externalAdReply.renderLargerThumbnail = false
      _0x1be784.contextInfo.externalAdReply.showAdAttribution = true
      const _0x5da1c5 = _0x1be784,
        _0x2c3a73 = {}
      return (
        (_0x2c3a73.quoted = _0x18f6d5),
        await _0x253ae6.replyList(_0x199272, _0x5da1c5, _0x2c3a73)
      )
    } catch (_0x533ea8) {
      _0x1716e6(N_FOUND), _0x51d608(_0x533ea8)
    }
  }
)
const _0x14937a = {}
_0x14937a.pattern = 'dmod'
_0x14937a.dontAddCommandList = true
_0x14937a.filename = __filename
cmd(
  _0x14937a,
  async (
    _0x288357,
    _0x3ef714,
    _0xf7569,
    {
      from: _0x72c1a9,
      l: _0x11913d,
      quoted: _0x26089f,
      body: _0x810c3,
      isCmd: _0x4d196d,
      command: _0x2c3f08,
      args: _0xd73a7a,
      q: _0x37391c,
      isGroup: _0x4c5b46,
      sender: _0x3026bc,
      senderNumber: _0x40012c,
      botNumber2: _0x1215a2,
      botNumber: _0x16b888,
      pushname: _0x1c8e94,
      isMe: _0x4ea908,
      isOwner: _0x54d346,
      groupMetadata: _0x1f6c5b,
      groupName: _0x2dbaa2,
      participants: _0x536bad,
      groupAdmins: _0x88bb4e,
      isBotAdmins: _0x120c66,
      isAdmins: _0x139a1a,
      reply: _0x3c83d4,
    }
  ) => {
    try {
      const _0x359dec = {
        text: '\uD83D\uDCE5',
        key: _0x3ef714.key,
      }
      const _0x20c91b = { react: _0x359dec }
      await _0x288357.sendMessage(_0x72c1a9, _0x20c91b)
      let [_0x1ed441, _0x5e1998] = _0x37391c.split`+`
      const _0x1fa116 = { url: _0x1ed441 }
      const _0x503767 = { quoted: _0x3ef714 }
      await _0x288357.sendMessage(
        _0x72c1a9,
        {
          document: _0x1fa116,
          fileName: _0x5e1998 + '.apk',
          mimetype: 'application/vnd.android.package-archive',
        },
        _0x503767
      )
      const _0x3c85a9 = {
        text: '\u2714',
        key: _0x3ef714.key,
      }
      const _0x199b12 = { react: _0x3c85a9 }
      await _0x288357.sendMessage(_0x72c1a9, _0x199b12)
    } catch (_0x418d9a) {
      _0x3c83d4('*ERROR !!*')
      _0x11913d(_0x418d9a)
    }
  }
)
const _0x4213c0 = {}
_0x4213c0.pattern = 'modapk'
_0x4213c0.react = '\uD83D\uDCF1'
_0x4213c0.alias = ['androidapksfree', 'mod']
_0x4213c0.desc = urlneed
_0x4213c0.category = 'download'
_0x4213c0.use = '.modapk whatsapp'
_0x4213c0.filename = __filename
cmd(
  _0x4213c0,
  async (
    _0x50a9fa,
    _0x4bc8ce,
    _0x2b0f9e,
    {
      from: _0x5a0484,
      prefix: _0x44fc2f,
      l: _0x220584,
      quoted: _0x1d8163,
      body: _0x47ac6c,
      isCmd: _0x10c485,
      command: _0x1a0c2b,
      args: _0x24ae61,
      q: _0x3edeff,
      isGroup: _0x3e6153,
      sender: _0x5cc899,
      senderNumber: _0x16125c,
      botNumber2: _0x10f9ce,
      botNumber: _0x2b0416,
      pushname: _0x46c11f,
      isMe: _0x4313de,
      isOwner: _0x1e7ac3,
      groupMetadata: _0x190d64,
      groupName: _0x20fc11,
      participants: _0x283943,
      groupAdmins: _0x491233,
      isBotAdmins: _0x3223bf,
      isAdmins: _0xa27fdc,
      reply: _0x56830a,
    }
  ) => {
    try {
      const _0x135061 = { text: imgmsg }
      const _0x46d139 = { quoted: _0x4bc8ce }
      if (!_0x3edeff) {
        return await _0x50a9fa.sendMessage(_0x5a0484, _0x135061, _0x46d139)
      }
      const _0x275f23 = { withCredentials: true }
      const _0x27e16c = await axios.get(
        'https://androidapksfree.com/?s=' + _0x3edeff,
        _0x275f23
      )
      var _0xc3ec13 = []
      const _0x24e84f = cheerio.load(_0x27e16c.data)
      _0x24e84f(
        'html > body > div.main-wrap > div.main.wrap.cf > div > div > div > div > div.boxed-content > div.devapk-apps-list > section'
      ).each(function (_0xe8311d, _0x328269) {
        const _0x161596 = _0x24e84f(_0x328269).find('h1 > a').attr('href'),
          _0x4696cd = _0x24e84f(_0x328269).find('h1').text(),
          _0x56f194 = _0x24e84f(_0x328269)
            .find('div.date-on-tax')
            .text()
            .replaceAll('\n', ''),
          _0x5e1d7f = {
            link: _0x161596,
            title: _0x4696cd,
            update: _0x56f194,
          }
        _0xc3ec13.push(_0x5e1d7f)
      })
      const _0x48a628 = _0xc3ec13,
        _0x2c97dd = { text: N_FOUND }
      const _0x353084 = { quoted: _0x4bc8ce }
      if (_0x48a628.length < 1) {
        return await _0x50a9fa.sendMessage(_0x5a0484, _0x2c97dd, _0x353084)
      }
      var _0x536abc = []
      for (var _0x25ce3a = 0; _0x25ce3a < _0x48a628.length; _0x25ce3a++) {
        _0x536abc.push({
          title: _0x48a628[_0x25ce3a].title,
          rowId:
            _0x44fc2f +
            'dapk2 ' +
            _0x48a628[_0x25ce3a].link +
            '+' +
            _0x48a628[_0x25ce3a].title,
        })
      }
      const _0x440ca7 = {
        title: '_[Result from androidapksfree.]_',
        rows: _0x536abc,
      }
      const _0x592de6 = [_0x440ca7],
        _0x1a3a89 = {
          text:
            '[\uD83D\uDC68‍\uD83D\uDCBB ＶＡＪＩＲＡ -  ＭＤ - Ｖ4 \uD83D\uDC68‍\uD83D\uDCBB]\n\n   *MOD APK DOWNLOADER*\n\n*\uD83D\uDCF1 Enterd Name:* ' +
            _0x3edeff,
          footer: config.FOOTER,
          title: 'Result from androidapksfree. \uD83D\uDCF2',
          buttonText: '*\uD83D\uDD22 Reply below number*',
          sections: _0x592de6,
        }
      const _0x3ec300 = _0x1a3a89
      await _0x50a9fa.listMessage(_0x5a0484, _0x3ec300, _0x4bc8ce)
    } catch (_0x219c57) {
      _0x56830a('*ERROR !!*'), _0x220584(_0x219c57)
    }
  }
)
const _0x51d484 = {}
_0x51d484.pattern = 'dapk2'
_0x51d484.dontAddCommandList = true
_0x51d484.filename = __filename
cmd(
  _0x51d484,
  async (
    _0x467449,
    _0x4e6b79,
    _0x54d2e7,
    {
      from: _0x3fed40,
      l: _0x4c3643,
      quoted: _0x2bb5fa,
      body: _0x4ff8ed,
      isCmd: _0x2daf00,
      command: _0x105aba,
      args: _0x4b7aac,
      q: _0xedf17,
      isGroup: _0x4fd2eb,
      sender: _0xf312a6,
      senderNumber: _0x315028,
      botNumber2: _0x23dd0f,
      botNumber: _0x12b5a0,
      pushname: _0x2e31d8,
      isMe: _0x5bd15f,
      isOwner: _0x533e35,
      groupMetadata: _0x56a793,
      groupName: _0x2480ee,
      participants: _0x3cef39,
      groupAdmins: _0x498fea,
      isBotAdmins: _0x29614f,
      isAdmins: _0x24887f,
      reply: _0x170fab,
    }
  ) => {
    try {
      const _0x367a45 = {
        text: '\uD83D\uDCE5',
        key: _0x4e6b79.key,
      }
      const _0x2f6daa = { react: _0x367a45 }
      await _0x467449.sendMessage(_0x3fed40, _0x2f6daa)
      const _0x393f3e = { text: '*Need apk link...*' }
      const _0x522fa1 = { quoted: _0x4e6b79 }
      if (!_0xedf17) {
        return await _0x467449.sendMessage(_0x3fed40, _0x393f3e, _0x522fa1)
      }
      let [_0x282bcc, _0x185c84] = _0xedf17.split('+')
      const _0x1db94f = { withCredentials: true }
      const _0x1a5caa = await axios.get(_0x282bcc + 'download/', _0x1db94f),
        _0x31c63c = cheerio.load(_0x1a5caa.data),
        _0x20dea0 = _0x31c63c(
          'html > body > div.main-wrap > div.main.wrap.cf > div > div > div > div > div.post-container.cf > div > div > div.box > div.boxed-content.boxed-content-mobile > div > div > div.download-button-main.centered-element > a'
        ).attr('href'),
        _0x189bb8 = _0x31c63c('div.app-icon-new > img').attr('src'),
        _0xf13398 = _0x31c63c(
          'html > body > div.main-wrap > div.main.wrap.cf > div > div > div > div > div.post-container.cf > div > div > div.box > div.boxed-content.boxed-content-mobile > div > div > div.download-button-main.centered-element > a'
        )
          .text()
          .split('(')[1]
          .replaceAll(')', '')
      let _0x1b943d =
        '*\uD83D\uDCDA Name :* ' +
        _0x185c84 +
        '\n*\uD83D\uDCE5 Size :* ' +
        _0xf13398
      const _0x25ff34 = { url: _0x189bb8 }
      const _0x3a971f = {
        image: _0x25ff34,
        caption: _0x1b943d,
      }
      const _0x442c33 = { quoted: _0x4e6b79 }
      await _0x467449.sendMessage(_0x3fed40, _0x3a971f, _0x442c33)
      const _0x195172 = { url: _0x20dea0 }
      const _0x505d44 = { quoted: _0x4e6b79 }
      let _0x18301c = await _0x467449.sendMessage(
        _0x3fed40,
        {
          document: _0x195172,
          mimetype: 'application/vnd.android.package-archive',
          fileName: _0x185c84 + '.' + 'apk',
          caption: '',
        },
        _0x505d44
      )
      const _0x3a2fbd = {
        text: '\uD83D\uDCC1',
        key: _0x18301c.key,
      }
      const _0xd33af7 = { react: _0x3a2fbd }
      await _0x467449.sendMessage(_0x3fed40, _0xd33af7)
      const _0x39e99b = {
        text: '\u2714',
        key: _0x4e6b79.key,
      }
      const _0x226e4e = { react: _0x39e99b }
      await _0x467449.sendMessage(_0x3fed40, _0x226e4e)
    } catch (_0xb054e1) {
      _0x170fab('*ERROR !!*'), _0x4c3643(_0xb054e1)
    }
  }
)
const _0x263dbc = {}
_0x263dbc.pattern = 'apk'
_0x263dbc.react = '\uD83D\uDCE6'
_0x263dbc.desc = 'apk downloader'
_0x263dbc.category = 'download'
_0x263dbc.use = '.apk whatsapp'
_0x263dbc.filename = __filename
cmd(
  _0x263dbc,
  async (
    _0x262263,
    _0x1b6d38,
    _0x523064,
    {
      from: _0x15e369,
      l: _0x1de248,
      quoted: _0x37d892,
      prefix: _0x67d2f4,
      body: _0x1b5acb,
      isCmd: _0x388388,
      command: _0x35bcf6,
      args: _0x346f0e,
      q: _0x4519fa,
      isGroup: _0x39024e,
      sender: _0x2f5553,
      senderNumber: _0x553d2a,
      botNumber2: _0x1bbd2c,
      botNumber: _0x4ea033,
      pushname: _0xc66d4e,
      isMe: _0x2dca61,
      isOwner: _0x3f0cee,
      groupMetadata: _0x58e2ff,
      groupName: _0x101cb3,
      participants: _0x237583,
      groupAdmins: _0x350c67,
      isBotAdmins: _0x1eddca,
      isAdmins: _0x13e632,
      reply: _0x3bd37e,
    }
  ) => {
    try {
      var _0x4579fd = _0x1b6d38
      const _0x266e7b = {
        text: 'ℹ️',
        key: _0x4579fd.key,
      }
      const _0xb9649f = { react: _0x266e7b }
      await _0x262263.sendMessage(_0x15e369, _0xb9649f)
      const _0x2d1963 = { text: '*Need apk link...*' }
      const _0x267f70 = { quoted: _0x4579fd }
      if (!_0x4519fa) {
        return await _0x262263.sendMessage(_0x15e369, _0x2d1963, _0x267f70)
      }
      const _0x4119ec = await apkdl.download(_0x4519fa)
      let _0xad49be =
        '[\uD83D\uDC68‍\uD83D\uDCBB ＶＡＪＩＲＡ - ＭＤ - Ｖ3 \uD83D\uDC68‍\uD83D\uDCBB]\n   \n *APK-DOWNLOADER*\n\n *\uD83D\uDCDA ᴀᴘᴘ ɴᴀᴍᴇ: ' +
        _0x4119ec.name +
        '*\n *\uD83D\uDCC8 ᴀᴘᴘ ꜱɪᴢᴇ: ' +
        _0x4119ec.size +
        '*\n \n\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500'
      const _0x3f8a85 = [
          {
            title: '',
            rows: [
              {
                title: '1',
                rowId: _0x67d2f4 + 'dapk ' + _0x4519fa,
                description: 'Download the apk',
              },
              {
                title: '2',
                rowId: _0x67d2f4 + 'apk1 ' + _0x4519fa,
                description: 'Download many apk',
              },
              {
                title: '3',
                rowId: _0x67d2f4 + 'apkinfo ' + _0x4519fa,
                description: 'Info of apk',
              },
            ],
          },
        ],
        _0x37410d = {
          text: _0xad49be,
          footer: config.FOOTER,
          buttonText: '\uD83D\uDD22 Reply below number,',
          sections: _0x3f8a85,
          contextInfo: {},
        }
      _0x37410d.contextInfo.externalAdReply = {}
      _0x37410d.contextInfo.externalAdReply.title =
        '\uD83D\uDC68‍\uD83D\uDCBB ＶＡＪＩＲＡ - ＭＤ - Ｖ4 \uD83D\uDC68‍\uD83D\uDCBB'
      _0x37410d.contextInfo.externalAdReply.body = 'ᴀɴ ᴜꜱᴇʀ ʙᴏᴛ ꜰᴏʀ ᴡʜᴀᴛꜱᴀᴘᴘ'
      _0x37410d.contextInfo.externalAdReply.mediaType = 1
      _0x37410d.contextInfo.externalAdReply.sourceUrl = ''
      _0x37410d.contextInfo.externalAdReply.thumbnailUrl =
        'https://telegra.ph/file/b4caa5682d75220623b83.jpg'
      _0x37410d.contextInfo.externalAdReply.renderLargerThumbnail = false
      _0x37410d.contextInfo.externalAdReply.showAdAttribution = true
      const _0x131b42 = _0x37410d,
        _0x5afa16 = {}
      return (
        (_0x5afa16.quoted = _0x1b6d38),
        await _0x262263.replyList(_0x15e369, _0x131b42, _0x5afa16)
      )
    } catch (_0x30b562) {
      _0x3bd37e(N_FOUND)
      _0x1de248(_0x30b562)
    }
  }
)
const _0xddd5ca = {}
_0xddd5ca.pattern = 'apk1'
_0xddd5ca.react = '\uD83D\uDCF1'
_0xddd5ca.alias = ['findapk', 'playstore']
_0xddd5ca.desc = urlneed4
_0xddd5ca.category = 'download'
_0xddd5ca.use = '.apk whatsapp'
_0xddd5ca.filename = __filename
cmd(
  _0xddd5ca,
  async (
    _0x1539de,
    _0x5567e8,
    _0x2e94ae,
    {
      from: _0x2b7896,
      prefix: _0xdfd263,
      l: _0x2a6e0c,
      quoted: _0xae9051,
      body: _0x22cf9b,
      isCmd: _0x2f8aff,
      command: _0xfcaa8b,
      args: _0x425968,
      q: _0xbd99d7,
      isGroup: _0x2daf25,
      sender: _0x266898,
      senderNumber: _0x38c772,
      botNumber2: _0x5b6079,
      botNumber: _0x27e502,
      pushname: _0x375aee,
      isMe: _0xcca43f,
      isOwner: _0x327f1f,
      groupMetadata: _0x57e9cc,
      groupName: _0x4ffdff,
      participants: _0x4b4423,
      groupAdmins: _0x2f90da,
      isBotAdmins: _0x4255f0,
      isAdmins: _0x2d4256,
      reply: _0x3df960,
    }
  ) => {
    try {
      const _0x2115c8 = { text: imgmsg }
      const _0x10e619 = { quoted: _0x5567e8 }
      if (!_0xbd99d7) {
        return await _0x1539de.sendMessage(_0x2b7896, _0x2115c8, _0x10e619)
      }
      const _0x3167fa = await apkdl.search(_0xbd99d7),
        _0x33e198 = _0x3167fa,
        _0x5dd583 = { text: N_FOUND }
      const _0x3a06ba = { quoted: _0x5567e8 }
      if (_0x33e198.length < 1) {
        return await _0x1539de.sendMessage(_0x2b7896, _0x5dd583, _0x3a06ba)
      }
      var _0x44efaf = []
      for (var _0x3a4559 = 0; _0x3a4559 < 9; _0x3a4559++) {
        _0x44efaf.push({
          description: _0x33e198[_0x3a4559].name,
          title: _0x3a4559 + 1,
          rowId: _0xdfd263 + 'dapk ' + _0x33e198[_0x3a4559].id,
        })
      }
      const _0x123857 = {
        title: '_[Result from playstore.]_',
        rows: _0x44efaf,
      }
      const _0x284a22 = [_0x123857],
        _0x24dbe6 = {
          text:
            '\u250C\u2500\u2500\u2500[\uD83D\uDC68‍\uD83D\uDCBB ＶＡＪＩＲＡ - ＭＤ - Ｖ4 \uD83D\uDC68‍\uD83D\uDCBB]\n\n   *APK DOWNLOADER*\n\n*\uD83D\uDCF1 Apk Name:* ' +
            _0xbd99d7,
          footer: config.FOOTER,
          title: 'Result from playstore. \uD83D\uDCF2',
          buttonText: '*\uD83D\uDD22 Reply below number*',
          sections: _0x284a22,
        }
      const _0x346f55 = _0x24dbe6,
        _0x12397e = { quoted: _0x5567e8 }
      await _0x1539de.replyList(_0x2b7896, _0x346f55, _0x12397e)
    } catch (_0x385df9) {
      _0x3df960('*ERROR !!*'), _0x2a6e0c(_0x385df9)
    }
  }
)
const _0x304cf0 = {}
_0x304cf0.pattern = 'dapk'
_0x304cf0.dontAddCommandList = true
_0x304cf0.filename = __filename
cmd(
  _0x304cf0,
  async (
    _0x775db,
    _0xe09471,
    _0x5a4118,
    {
      from: _0x1aec00,
      l: _0x3853ea,
      quoted: _0x5462c6,
      body: _0x430bec,
      isCmd: _0x322d56,
      command: _0x2434a2,
      args: _0x4d1db4,
      q: _0x2b6d46,
      isGroup: _0xda9955,
      sender: _0xace698,
      senderNumber: _0x2e3b1b,
      botNumber2: _0xb776ee,
      botNumber: _0x350805,
      pushname: _0x25f869,
      isMe: _0x229313,
      isOwner: _0x7394e5,
      groupMetadata: _0x2128b2,
      groupName: _0x6b2701,
      participants: _0x22ef5a,
      groupAdmins: _0x1ec20a,
      isBotAdmins: _0x3b1809,
      isAdmins: _0x396fd4,
      reply: _0x38d19f,
    }
  ) => {
    try {
      const _0x4f0254 = {
        text: '\uD83D\uDCE5',
        key: _0xe09471.key,
      }
      const _0x21690a = { react: _0x4f0254 }
      await _0x775db.sendMessage(_0x1aec00, _0x21690a)
      const _0x299adb = { text: '*Need apk link...*' }
      const _0x3781a3 = { quoted: _0xe09471 }
      if (!_0x2b6d46) {
        return await _0x775db.sendMessage(_0x1aec00, _0x299adb, _0x3781a3)
      }
      const _0xdf2204 = await apkdl.download(_0x2b6d46),
        _0x20a931 = { url: _0xdf2204.dllink }
      const _0x10b54c = { quoted: _0xe09471 }
      let _0x47c595 = await _0x775db.sendMessage(
        _0x1aec00,
        {
          document: _0x20a931,
          mimetype: 'application/vnd.android.package-archive',
          fileName: _0xdf2204.name + '.' + 'apk',
          caption:
            '*ᴠᴀᴊɪʀᴀ-ᴍᴅ\u2022ᴍᴜʟᴛɪ-ᴅᴇᴠɪᴄᴇ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴛᴇᴄʜɴɪᴄᴀʟ ᴄʏʙᴇʀꜱ*',
        },
        _0x10b54c
      )
      const _0x416605 = {
        text: '\uD83D\uDCC1',
        key: _0x47c595.key,
      }
      const _0x1963b1 = { react: _0x416605 }
      await _0x775db.sendMessage(_0x1aec00, _0x1963b1)
      const _0x2dcd48 = {
        text: '\u2714',
        key: _0xe09471.key,
      }
      const _0x6a386 = { react: _0x2dcd48 }
      await _0x775db.sendMessage(_0x1aec00, _0x6a386)
    } catch (_0x167d50) {
      _0x38d19f('*ERROR !!*'), _0x3853ea(_0x167d50)
    }
  }
)
const _0x3d6f23 = {}
_0x3d6f23.pattern = 'apkinfo'
_0x3d6f23.dontAddCommandList = true
_0x3d6f23.filename = __filename
cmd(
  _0x3d6f23,
  async (
    _0x4218c0,
    _0x5814e5,
    _0xf95650,
    {
      from: _0x16876e,
      l: _0x37da78,
      quoted: _0x5e80ad,
      body: _0x482115,
      isCmd: _0x208a85,
      command: _0x1fa94a,
      args: _0x57b752,
      q: _0x5c1e41,
      isGroup: _0x36f5f3,
      sender: _0x23b74f,
      senderNumber: _0x20d27e,
      botNumber2: _0x3220e3,
      botNumber: _0x5da0ac,
      pushname: _0x56e971,
      isMe: _0x5c0617,
      isOwner: _0x1a8e17,
      groupMetadata: _0x4cda00,
      groupName: _0x1c0e9b,
      participants: _0x24663f,
      groupAdmins: _0x50ddc8,
      isBotAdmins: _0x1be431,
      isAdmins: _0x59eece,
      reply: _0x30ea85,
    }
  ) => {
    try {
      var _0x46fa46 = _0x5814e5
      const _0x4b5dae = {
        text: 'ℹ️',
        key: _0x46fa46.key,
      }
      const _0x18ec97 = { react: _0x4b5dae }
      await _0x4218c0.sendMessage(_0x16876e, _0x18ec97)
      const _0x22e86a = { text: '*Need apk link...*' }
      const _0x40afce = { quoted: _0x46fa46 }
      if (!_0x5c1e41) {
        return await _0x4218c0.sendMessage(_0x16876e, _0x22e86a, _0x40afce)
      }
      const _0x437682 = await apkdl.download(_0x5c1e41)
      let _0x19e966 =
        '\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557\n*\u2551\uD83E\uDD33VAJIRA PLAYSTORE-SEARCH*\n\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D\n\n*\uD83D\uDCDA ᴀᴘᴘ ɴᴀᴍᴇ: ' +
        _0x437682.name +
        '* \n\n*\uD83D\uDCC8 ᴀᴘᴘ ꜱɪᴢᴇ(ᴍʙ): ' +
        _0x437682.size +
        '*\n\n*\uD83D\uDCF1 ʟᴀꜱᴛ ᴜᴘᴅᴀᴛᴇᴅ: ' +
        _0x437682.lastup +
        '*\n\n*\uD83D\uDCE6 ᴅᴇᴠᴇʟᴏᴘᴇʀ: ' +
        _0x437682.package +
        '* \n\n_*\u25EF\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u25EF*_'
      const _0x359062 = { url: _0x437682.icon }
      const _0x3dc6cc = {
        image: _0x359062,
        caption: _0x19e966,
      }
      const _0x35bb87 = { quoted: _0x46fa46 }
      await _0x4218c0.sendMessage(_0x16876e, _0x3dc6cc, _0x35bb87)
      const _0x596268 = {
        text: '\u2714',
        key: _0x46fa46.key,
      }
      const _0x3f8c95 = { react: _0x596268 }
      await _0x4218c0.sendMessage(_0x16876e, _0x3f8c95)
    } catch (_0x205cb0) {
      _0x37da78(_0x205cb0)
    }
  }
)
const _0x519111 = {}
_0x519111.pattern = 'ss'
_0x519111.react = '\uD83D\uDDBC️'
_0x519111.desc = 'url to screenshot'
_0x519111.category = 'download'
_0x519111.use = '.ss url'
_0x519111.filename = __filename
cmd(
  _0x519111,
  async (
    _0x2b33b1,
    _0x34037d,
    _0x31dcff,
    {
      from: _0x2186ce,
      l: _0x23964c,
      quoted: _0x375b66,
      prefix: _0x4e8fce,
      body: _0x37203e,
      isCmd: _0x2c4b99,
      command: _0x1e6d2f,
      args: _0x318940,
      q: _0x367e65,
      isGroup: _0x12dd7c,
      sender: _0xa80e45,
      senderNumber: _0x3e3356,
      botNumber2: _0x412f03,
      botNumber: _0x11ce46,
      pushname: _0x58bdb6,
      isMe: _0x6fc4e4,
      isOwner: _0x58010e,
      groupMetadata: _0xbe5623,
      groupName: _0x539e95,
      participants: _0x21b124,
      groupAdmins: _0x38c67e,
      isBotAdmins: _0x313023,
      isAdmins: _0x5a3efd,
      reply: _0x4f32ec,
    }
  ) => {
    try {
      let _0x23c5c4 =
        '[\uD83D\uDC68‍\uD83D\uDCBB ＶＡＪＩＲＡ - ＭＤ - Ｖ4 \uD83D\uDC68‍\uD83D\uDCBB]\n   \n \u258F *SS CONVETER*\n\n\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u25C9'
      const _0x33f8cd = [
          {
            title: '',
            rows: [
              {
                title: '1',
                rowId: _0x4e8fce + 'desktop ' + _0x367e65,
                description: 'Desktop type ss',
              },
              {
                title: '2',
                rowId: _0x4e8fce + 'ssphone ' + _0x367e65,
                description: 'Phone type ss \uD83D\uDDBC️',
              },
              {
                title: '3',
                rowId: _0x4e8fce + 'sstab ' + _0x367e65,
                description: 'Tab type ss \uD83D\uDDBC️',
              },
            ],
          },
        ],
        _0x11a1f5 = {
          text: _0x23c5c4,
          footer: config.FOOTER,
          buttonText: '\uD83D\uDD22 Reply below number,',
          sections: _0x33f8cd,
          contextInfo: {},
        }
      _0x11a1f5.contextInfo.externalAdReply = {}
      _0x11a1f5.contextInfo.externalAdReply.title =
        '\uD83D\uDC68‍\uD83D\uDCBB ＶＡＪＩＲＡ - ＭＤ - Ｖ4 \uD83D\uDC68‍\uD83D\uDCBB'
      _0x11a1f5.contextInfo.externalAdReply.body = 'ᴀɴ ᴜꜱᴇʀ ʙᴏᴛ ꜰᴏʀ ᴡʜᴀᴛꜱᴀᴘᴘ'
      _0x11a1f5.contextInfo.externalAdReply.mediaType = 1
      _0x11a1f5.contextInfo.externalAdReply.sourceUrl = ''
      _0x11a1f5.contextInfo.externalAdReply.thumbnailUrl =
        'https://telegra.ph/file/b4caa5682d75220623b83.jpg'
      _0x11a1f5.contextInfo.externalAdReply.renderLargerThumbnail = false
      _0x11a1f5.contextInfo.externalAdReply.showAdAttribution = true
      const _0x5692d6 = _0x11a1f5,
        _0x2f5095 = {}
      return (
        (_0x2f5095.quoted = _0x34037d),
        await _0x2b33b1.replyList(_0x2186ce, _0x5692d6, _0x2f5095)
      )
    } catch (_0x53c850) {
      _0x4f32ec(N_FOUND)
      _0x23964c(_0x53c850)
    }
  }
)
const _0x2c706b = {}
_0x2c706b.pattern = 'desktop'
_0x2c706b.react = '\uD83D\uDCF8'
_0x2c706b.alias = ['screenshot', 'ssweb', 'ssdesktop']
_0x2c706b.desc = descg
_0x2c706b.category = 'download'
_0x2c706b.use = '.ss <url>'
_0x2c706b.filename = __filename
cmd(
  _0x2c706b,
  async (
    _0x3e07b5,
    _0x436b9a,
    _0x114942,
    {
      from: _0x28adff,
      l: _0x2119d6,
      quoted: _0x506311,
      prefix: _0x3d68c5,
      body: _0x127f8e,
      isCmd: _0x52d7e2,
      command: _0x3be851,
      args: _0x442dc5,
      q: _0x57b42b,
      isGroup: _0x2454c1,
      sender: _0x1611be,
      senderNumber: _0x196b06,
      botNumber2: _0x1107c8,
      botNumber: _0x2ded54,
      pushname: _0x5a94de,
      isMe: _0x278f11,
      isOwner: _0x514ee0,
      groupMetadata: _0x37adbf,
      groupName: _0xaf9da3,
      participants: _0x3a91cc,
      groupAdmins: _0x14a528,
      isBotAdmins: _0x1293f6,
      isAdmins: _0x1429ae,
      reply: _0x1dc246,
    }
  ) => {
    try {
      if (!_0x57b42b) {
        return _0x1dc246(imgmsg)
      }
      let _0x52c012 = getRandom(''),
        _0x2be9dd = await sswebA(_0x57b42b, true, 'desktop')
      fs.writeFileSync(_0x52c012 + '.jpg', _0x2be9dd)
      let _0x1f6304 =
        '[\uD83D\uDC68‍\uD83D\uDCBB ＶＡＪＩＲＡ - ＭＤ - Ｖ4 \uD83D\uDC68‍\uD83D\uDCBB]\n\n   *\uD83D\uDCF8 SCREENSHOT GETTER*'
      const _0x1a2c5d = [
          {
            title: '',
            rows: [
              {
                title: '1',
                rowId: _0x3d68c5 + 'ssd ' + _0x52c012 + '.jpg',
                description: 'DOCUMENT',
              },
              {
                title: '2',
                rowId: _0x3d68c5 + 'ssi ' + _0x52c012 + '.jpg',
                description: 'IMAGE',
              },
            ],
          },
        ],
        _0x4b029e = {
          text: _0x1f6304,
          footer: config.FOOTER,
          buttonText: '\uD83D\uDD22 Reply below number,',
          sections: _0x1a2c5d,
          contextInfo: {},
        }
      _0x4b029e.contextInfo.externalAdReply = {}
      _0x4b029e.contextInfo.externalAdReply.title =
        '\uD83D\uDC68‍\uD83D\uDCBB ＶＡＪＩＲＡ - ＭＤ - Ｖ4 \uD83D\uDC68‍\uD83D\uDCBB'
      _0x4b029e.contextInfo.externalAdReply.body = 'ᴀɴ ᴜꜱᴇʀ ʙᴏᴛ ꜰᴏʀ ᴡʜᴀᴛꜱᴀᴘᴘ'
      _0x4b029e.contextInfo.externalAdReply.mediaType = 1
      _0x4b029e.contextInfo.externalAdReply.sourceUrl = ''
      _0x4b029e.contextInfo.externalAdReply.thumbnailUrl =
        'https://telegra.ph/file/b4caa5682d75220623b83.jpg'
      _0x4b029e.contextInfo.externalAdReply.renderLargerThumbnail = false
      _0x4b029e.contextInfo.externalAdReply.showAdAttribution = true
      const _0x1fe5b8 = _0x4b029e,
        _0xaefe3d = { quoted: _0x436b9a }
      await _0x3e07b5.replyList(_0x28adff, _0x1fe5b8, _0xaefe3d)
    } catch (_0x1ac885) {
      _0x1dc246(cant), _0x2119d6(_0x1ac885)
    }
  }
)
const _0x26694e = {}
_0x26694e.pattern = 'ssphone'
_0x26694e.react = '\uD83D\uDCF8'
_0x26694e.desc = descp
_0x26694e.category = 'download'
_0x26694e.use = '.ss <url>'
_0x26694e.filename = __filename
cmd(
  _0x26694e,
  async (
    _0x4470b8,
    _0x21a367,
    _0x3ac2b8,
    {
      from: _0x217fa0,
      l: _0x4733ed,
      quoted: _0xeae3ec,
      prefix: _0x2030cb,
      body: _0x240338,
      isCmd: _0x2fa49e,
      command: _0x5b2333,
      args: _0x193b71,
      q: _0x29f849,
      isGroup: _0x4a9e5b,
      sender: _0x4498ed,
      senderNumber: _0x3b23f8,
      botNumber2: _0x5242ef,
      botNumber: _0x7b8481,
      pushname: _0x3f8f85,
      isMe: _0x570638,
      isOwner: _0x496396,
      groupMetadata: _0x2d0484,
      groupName: _0x46c134,
      participants: _0x16ed42,
      groupAdmins: _0x5f2675,
      isBotAdmins: _0x24767e,
      isAdmins: _0x5d0b91,
      reply: _0x5bc709,
    }
  ) => {
    try {
      if (!_0x29f849) {
        return _0x5bc709(imgmsg)
      }
      let _0x4a8421 = getRandom(''),
        _0x38557e = await sswebA(_0x29f849, true, 'phone')
      fs.writeFileSync(_0x4a8421 + '.jpg', _0x38557e)
      let _0x402c09 =
        '[\uD83D\uDC68‍\uD83D\uDCBB ＶＡＪＩＲＡ - ＭＤ - Ｖ4 \uD83D\uDC68‍\uD83D\uDCBB]\n\n   *\uD83D\uDCF8 SCREENSHOT GETTER*'
      const _0x479591 = [
          {
            title: '',
            rows: [
              {
                title: '1',
                rowId: _0x2030cb + 'ssd ' + _0x4a8421 + '.jpg',
                description: 'DOCUMENT',
              },
              {
                title: '2',
                rowId: _0x2030cb + 'ssi ' + _0x4a8421 + '.jpg',
                description: 'IMAGE',
              },
            ],
          },
        ],
        _0x3d4dcb = {
          caption: config.ALIVE,
          image: {},
          footer: config.FOOTER,
          buttonText: '\uD83D\uDD22 Reply below number,',
          sections: _0x479591,
          contextInfo: {},
        }
      _0x3d4dcb.image.url = config.LOGO
      _0x3d4dcb.contextInfo.externalAdReply = {}
      _0x3d4dcb.contextInfo.externalAdReply.title =
        '\uD83D\uDC68‍\uD83D\uDCBB ＶＡＪＩＲＡ - ＭＤ - Ｖ4 \uD83D\uDC68‍\uD83D\uDCBB'
      _0x3d4dcb.contextInfo.externalAdReply.body = 'ᴀɴ ᴜꜱᴇʀ ʙᴏᴛ ꜰᴏʀ ᴡʜᴀᴛꜱᴀᴘᴘ'
      _0x3d4dcb.contextInfo.externalAdReply.mediaType = 1
      _0x3d4dcb.contextInfo.externalAdReply.sourceUrl = ''
      _0x3d4dcb.contextInfo.externalAdReply.thumbnailUrl =
        'https://telegra.ph/file/b4caa5682d75220623b83.jpg'
      _0x3d4dcb.contextInfo.externalAdReply.renderLargerThumbnail = false
      _0x3d4dcb.contextInfo.externalAdReply.showAdAttribution = true
      const _0x587d4f = _0x3d4dcb,
        _0x51802d = {}
      return (
        (_0x51802d.quoted = _0x21a367),
        await _0x4470b8.replyList(_0x217fa0, _0x587d4f, _0x51802d)
      )
    } catch (_0x4b0b06) {
      _0x5bc709('*Error !!*'), _0x4733ed(_0x4b0b06)
    }
  }
)
const _0x5d55f6 = {}
_0x5d55f6.pattern = 'sstab'
_0x5d55f6.react = '\uD83D\uDCF8'
_0x5d55f6.desc = desct
_0x5d55f6.category = 'download'
_0x5d55f6.use = '.ss <url>'
_0x5d55f6.filename = __filename
cmd(
  _0x5d55f6,
  async (
    _0x4eec07,
    _0x1f1de4,
    _0x459221,
    {
      from: _0x2d9fcd,
      l: _0x47e541,
      quoted: _0x95a8af,
      prefix: _0x2caa56,
      body: _0x2dd8b9,
      isCmd: _0xad8f3b,
      command: _0xd672b6,
      args: _0x536547,
      q: _0x2707d2,
      isGroup: _0x184c35,
      sender: _0xd9ac0,
      senderNumber: _0x18d6fb,
      botNumber2: _0x2c1678,
      botNumber: _0xbcca95,
      pushname: _0x2399cf,
      isMe: _0x2e7985,
      isOwner: _0x5a7613,
      groupMetadata: _0x570766,
      groupName: _0x57e74c,
      participants: _0x36c71d,
      groupAdmins: _0x36da7f,
      isBotAdmins: _0x1c6ca7,
      isAdmins: _0x133958,
      reply: _0x4afc8a,
    }
  ) => {
    try {
      if (!_0x2707d2) {
        return _0x4afc8a(imgmsg)
      }
      let _0x396c29 = getRandom(''),
        _0x566bd6 = await sswebA(_0x2707d2, true, 'tablet')
      fs.writeFileSync(_0x396c29 + '.jpg', _0x566bd6)
      let _0x43f7c2 =
        '[\uD83D\uDC68‍\uD83D\uDCBB ＶＡＪＩＲＡ - ＭＤ - Ｖ4 \uD83D\uDC68‍\uD83D\uDCBB]\n\n   *\uD83D\uDCF8 SCREENSHOT GETTER*'
      const _0x2ff791 = [
          {
            title: '',
            rows: [
              {
                title: '1',
                rowId: _0x2caa56 + 'ssd ' + _0x396c29 + '.jpg',
                description: 'DOCUMENT',
              },
              {
                title: '2',
                rowId: _0x2caa56 + 'ssi ' + _0x396c29 + '.jpg',
                description: 'IMAGE',
              },
            ],
          },
        ],
        _0x2777a4 = {
          caption: config.ALIVE,
          image: {},
          footer: config.FOOTER,
          buttonText: '\uD83D\uDD22 Reply below number,',
          sections: _0x2ff791,
          contextInfo: {},
        }
      _0x2777a4.image.url = config.LOGO
      _0x2777a4.contextInfo.externalAdReply = {}
      _0x2777a4.contextInfo.externalAdReply.title =
        '\uD83D\uDC68‍\uD83D\uDCBB ＶＡＪＩＲＡ - ＭＤ - Ｖ4 \uD83D\uDC68‍\uD83D\uDCBB'
      _0x2777a4.contextInfo.externalAdReply.body = 'ᴀɴ ᴜꜱᴇʀ ʙᴏᴛ ꜰᴏʀ ᴡʜᴀᴛꜱᴀᴘᴘ'
      _0x2777a4.contextInfo.externalAdReply.mediaType = 1
      _0x2777a4.contextInfo.externalAdReply.sourceUrl = ''
      _0x2777a4.contextInfo.externalAdReply.thumbnailUrl =
        'https://telegra.ph/file/b4caa5682d75220623b83.jpg'
      _0x2777a4.contextInfo.externalAdReply.renderLargerThumbnail = false
      _0x2777a4.contextInfo.externalAdReply.showAdAttribution = true
      const _0x43b75f = _0x2777a4,
        _0x327de4 = {}
      return (
        (_0x327de4.quoted = _0x1f1de4),
        await _0x4eec07.replyList(_0x2d9fcd, _0x43b75f, _0x327de4)
      )
    } catch (_0x537904) {
      _0x4afc8a('*Error !!*')
      _0x47e541(_0x537904)
    }
  }
)
const _0xf7a477 = {}
_0xf7a477.pattern = 'ssi'
_0xf7a477.dontAddCommandList = true
_0xf7a477.filename = __filename
cmd(
  _0xf7a477,
  async (
    _0x420c5b,
    _0x566c33,
    _0x5d32f9,
    {
      from: _0x24de5a,
      l: _0x17a441,
      quoted: _0x533a93,
      body: _0x369999,
      isCmd: _0x42e9cc,
      command: _0x411617,
      args: _0x43483f,
      q: _0x1e1b03,
      isGroup: _0x2cad21,
      sender: _0xcaf768,
      senderNumber: _0x36f2fa,
      botNumber2: _0x38bde8,
      botNumber: _0x5a5aa1,
      pushname: _0x3543a5,
      isMe: _0x5baf29,
      isOwner: _0x580a31,
      groupMetadata: _0x25b6e8,
      groupName: _0x578c9d,
      participants: _0x1abfb3,
      groupAdmins: _0x306411,
      isBotAdmins: _0x2b9d93,
      isAdmins: _0x543907,
      reply: _0x97f01c,
    }
  ) => {
    try {
      const _0x518dea = {
        text: '\uD83D\uDCE5',
        key: _0x566c33.key,
      }
      const _0x2e915f = { react: _0x518dea }
      await _0x420c5b.sendMessage(_0x24de5a, _0x2e915f)
      const _0x3af4a2 = { quoted: _0x566c33 }
      await _0x420c5b.sendMessage(
        _0x24de5a,
        {
          image: fs.readFileSync(_0x1e1b03),
          caption: config.FOOTER,
        },
        _0x3af4a2
      )
      const _0xc6953f = {
        text: '\u2714',
        key: _0x566c33.key,
      }
      const _0x1a1d80 = { react: _0xc6953f }
      await _0x420c5b.sendMessage(_0x24de5a, _0x1a1d80)
    } catch (_0x15a004) {
      _0x97f01c('*ERROR !!*'), _0x17a441(_0x15a004)
    }
  }
)
const _0xd17aa6 = {}
_0xd17aa6.pattern = 'ssd'
_0xd17aa6.dontAddCommandList = true
_0xd17aa6.filename = __filename
cmd(
  _0xd17aa6,
  async (
    _0x63cd4b,
    _0x19346a,
    _0x4bfe82,
    {
      from: _0x1be5b7,
      l: _0x340221,
      quoted: _0x12608c,
      body: _0x51be94,
      isCmd: _0x1c9951,
      command: _0x331ea2,
      args: _0x332749,
      q: _0xba9e98,
      isGroup: _0xaf215a,
      sender: _0x47aeec,
      senderNumber: _0x3dfcee,
      botNumber2: _0x5b02c4,
      botNumber: _0x42200c,
      pushname: _0x51b181,
      isMe: _0x4a9aa6,
      isOwner: _0x7e1d51,
      groupMetadata: _0x4ae5c8,
      groupName: _0x5b5425,
      participants: _0x4c2337,
      groupAdmins: _0x51d5f8,
      isBotAdmins: _0x5a9b62,
      isAdmins: _0x40350e,
      reply: _0x3e9834,
    }
  ) => {
    try {
      const _0x15aa8c = {
        text: '\uD83D\uDCE5',
        key: _0x19346a.key,
      }
      const _0xb0a74b = { react: _0x15aa8c }
      await _0x63cd4b.sendMessage(_0x1be5b7, _0xb0a74b)
      const _0x237663 = { quoted: _0x19346a }
      await _0x63cd4b.sendMessage(
        _0x1be5b7,
        {
          document: fs.readFileSync(_0xba9e98),
          mimetype: 'image/jpeg',
          fileName: 'screenshot.jpg',
          caption: config.FOOTER,
        },
        _0x237663
      )
      const _0x2f3f35 = {
        text: '\u2714',
        key: _0x19346a.key,
      }
      const _0x165cfb = { react: _0x2f3f35 }
      await _0x63cd4b.sendMessage(_0x1be5b7, _0x165cfb)
    } catch (_0x1ab5aa) {
      _0x3e9834('*ERROR !!*'), _0x340221(_0x1ab5aa)
    }
  }
)
const _0x333762 = {}
_0x333762.pattern = 'mediafire'
_0x333762.alias = ['mfire']
_0x333762.react = '\uD83D\uDCC1'
_0x333762.desc = 'Download mediafire files.'
_0x333762.category = 'download'
_0x333762.use = '.mediafire <mediafire link>'
_0x333762.filename = __filename
cmd(
  _0x333762,
  async (
    _0x1d0b99,
    _0x3b9450,
    _0x5afb0a,
    {
      from: _0x150756,
      l: _0x4a5db4,
      quoted: _0x457c9,
      body: _0x490ccf,
      isCmd: _0x3e6e25,
      command: _0x3d712f,
      args: _0x1a227f,
      q: _0x2bde27,
      isGroup: _0x8817db,
      sender: _0x5bcce8,
      senderNumber: _0x3a155d,
      botNumber2: _0x1721ee,
      botNumber: _0x2e57ac,
      pushname: _0x88d1e0,
      isMe: _0x3d3327,
      isOwner: _0x25539f,
      groupMetadata: _0x2d51cb,
      groupName: _0x54bd1c,
      participants: _0x5f2ff4,
      groupAdmins: _0x25c652,
      isBotAdmins: _0x1e4514,
      isAdmins: _0x5864da,
      reply: _0x4d0ab8,
    }
  ) => {
    try {
      if (!_0x2bde27) {
        return await _0x4d0ab8('*Please give me google drive url*')
      }
      if (!_0x2bde27.includes('mediafire.com')) {
        return await _0x4d0ab8('*Please give me google drive url*')
      }
      if (!_0x2bde27.includes('/file')) {
        return await _0x4d0ab8('*Please give me google drive url*')
      }
      const _0x4a7319 = await mediafireDl(_0x2bde27)
      if (
        _0x4a7319.size.includes('MB') &&
        _0x4a7319.size.replace('MB', '') > config.MAX_SIZE
      ) {
        return await _0x4d0ab8('*This file is too big !!*')
      }
      if (_0x4a7319.size.includes('GB')) {
        return await _0x4d0ab8('*This file is too big !!*')
      }
      const _0x4e3e7a = { url: _0x4a7319.link }
      const _0x3cc981 = {
        document: _0x4e3e7a,
        fileName: _0x4a7319.name,
        mimetype: _0x4a7319.mime,
        caption:
          '*\uD83E\uDDF8 Name* : ' +
          _0x4a7319.name +
          '\n*\uD83D\uDCCA Size* : ' +
          _0x4a7319.size +
          '\n*\uD83D\uDD79️ Mime* : ' +
          _0x4a7319.mime,
      }
      const _0x4c2794 = { quoted: _0x3b9450 }
      const _0x15186d = _0x1d0b99.sendMessage(_0x150756, _0x3cc981, _0x4c2794),
        _0x10b53e = {
          text: '\uD83D\uDCC1',
          key: _0x15186d.key,
        }
      const _0x40342f = { react: _0x10b53e }
      await _0x1d0b99.sendMessage(_0x150756, _0x40342f)
    } catch (_0x9db074) {
      _0x4d0ab8('*Error !!*'), _0x4a5db4(_0x9db074)
    }
  }
)
const _0x17bff2 = {}
_0x17bff2.pattern = 'ig'
_0x17bff2.alias = ['igstory']
_0x17bff2.react = '\uD83C\uDF80'
_0x17bff2.desc = 'Download instagram videos/photos.'
_0x17bff2.category = 'download'
_0x17bff2.use = '.ig <Instagram link>'
_0x17bff2.filename = __filename
cmd(
  _0x17bff2,
  async (
    _0x2d3596,
    _0x571198,
    _0x5f0004,
    {
      from: _0x507aa0,
      l: _0x49da9b,
      quoted: _0x36f990,
      body: _0x1f0b48,
      isCmd: _0x33313a,
      command: _0x16c652,
      args: _0x3c169c,
      q: _0x433793,
      isGroup: _0x428765,
      sender: _0x5bef34,
      senderNumber: _0x155106,
      botNumber2: _0x18aaf4,
      botNumber: _0x518c8b,
      pushname: _0x5d930d,
      isMe: _0x505c3a,
      isOwner: _0x5e344c,
      groupMetadata: _0x18f14d,
      groupName: _0x39e10e,
      participants: _0x32046c,
      groupAdmins: _0x1d5e4f,
      isBotAdmins: _0x2fe3fd,
      isAdmins: _0x1c4c9e,
      reply: _0x438391,
    }
  ) => {
    try {
      if (!_0x433793) {
        return await _0x438391(needus)
      }
      let _0x17a36c = await fetchJson(
        'https://api.maher-zubair.tech/download/instagram2?url=' + _0x433793
      )
      for (
        let _0x46bdf5 = 0;
        _0x46bdf5 < _0x17a36c.data.data.length;
        _0x46bdf5++
      ) {
        const _0x4d08bf = { quoted: _0x571198 }
        const _0x1455cf = { quoted: _0x571198 }
        if (_0x17a36c.data.data[_0x46bdf5].type === 'image') {
          await _0x2d3596.sendMessage(
            _0x507aa0,
            {
              image: { url: _0x17a36c.data.data[_0x46bdf5].url },
              caption: config.FOOTER,
            },
            _0x4d08bf
          )
        } else {
          await _0x2d3596.sendMessage(
            _0x507aa0,
            {
              video: { url: _0x17a36c.data.data[_0x46bdf5].url },
              caption: config.FOOTER,
            },
            _0x1455cf
          )
        }
      }
    } catch (_0x2f3468) {
      _0x438391(cantf)
      _0x49da9b(_0x2f3468)
    }
  }
)
const _0x3fad45 = {}
_0x3fad45.pattern = 'threads'
_0x3fad45.alias = ['thread']
_0x3fad45.react = '\uD83E\uDDF5'
_0x3fad45.desc = 'Download threads videos/photos.'
_0x3fad45.category = 'download'
_0x3fad45.use = '.threads <threads link>'
_0x3fad45.filename = __filename
cmd(
  _0x3fad45,
  async (
    _0x4a1f93,
    _0x32d699,
    _0x148eb9,
    {
      from: _0x2d2fb6,
      l: _0x565896,
      quoted: _0x19f5a1,
      body: _0x2197f8,
      isCmd: _0xb86d49,
      command: _0x18a2b0,
      args: _0x24a85f,
      q: _0x2ed792,
      isGroup: _0x177a7b,
      sender: _0x6433ae,
      senderNumber: _0x37ca4e,
      botNumber2: _0x12df8b,
      botNumber: _0x1f1c1a,
      pushname: _0x863a4c,
      isMe: _0xa21ad8,
      isOwner: _0x2d0e3b,
      groupMetadata: _0x1e4712,
      groupName: _0x3fa406,
      participants: _0x307e4a,
      groupAdmins: _0x4e6d67,
      isBotAdmins: _0x843eac,
      isAdmins: _0x1a522b,
      reply: _0x213de6,
    }
  ) => {
    try {
      if (!_0x2ed792) {
        return await _0x213de6(needus)
      }
      let _0x411d8e = await Download(_0x2ed792)
      for (
        let _0x35cb14 = 0;
        _0x35cb14 < _0x411d8e.download.length;
        _0x35cb14++
      ) {
        const _0x784781 = { quoted: _0x32d699 }
        const _0x412057 = { quoted: _0x32d699 }
        if (_0x411d8e.download[_0x35cb14].type === 'image') {
          await _0x4a1f93.sendMessage(
            _0x2d2fb6,
            {
              image: { url: _0x411d8e.download[_0x35cb14].url },
              caption: config.FOOTER,
            },
            _0x784781
          )
        } else {
          await _0x4a1f93.sendMessage(
            _0x2d2fb6,
            {
              video: { url: _0x411d8e.download[_0x35cb14].url },
              caption: config.FOOTER,
            },
            _0x412057
          )
        }
      }
    } catch (_0x4d3614) {
      _0x213de6(cantf)
      _0x565896(_0x4d3614)
    }
  }
)
const _0x589e4d = {}
_0x589e4d.pattern = 'pindl'
_0x589e4d.react = '\uD83D\uDD16'
_0x589e4d.desc = 'download pinterest images'
_0x589e4d.category = 'download'
_0x589e4d.use = '.pindl'
_0x589e4d.filename = __filename
cmd(
  _0x589e4d,
  async (
    _0x21b5a4,
    _0x3a970a,
    _0x3890cb,
    {
      from: _0x236014,
      l: _0x5a1e0e,
      quoted: _0x2ccec4,
      body: _0x25febf,
      isCmd: _0x40b06d,
      command: _0x33a958,
      args: _0x53a205,
      q: _0x16ea00,
      isGroup: _0x3b00e2,
      sender: _0x10accb,
      senderNumber: _0x5fffc2,
      botNumber2: _0x21ea60,
      botNumber: _0x27a954,
      pushname: _0x1933f9,
      isMe: _0x1532f8,
      isOwner: _0x5d17b9,
      groupMetadata: _0x5438b8,
      groupName: _0x2965e9,
      participants: _0x107b4b,
      groupAdmins: _0x5f5cf3,
      isBotAdmins: _0x2b5ab4,
      isAdmins: _0x2d9151,
      reply: _0x343aa8,
    }
  ) => {
    try {
      let { pinterest: _0x43074a } = require('../lib/scraper')
      anu = await _0x43074a(_0x16ea00)
      result = anu[Math.floor(Math.random() * anu.length)]
      const _0x52c7f4 = { url: result }
      _0x21b5a4.sendMessage(
        _0x3a970a.chat,
        {
          image: _0x52c7f4,
          caption: '\uD83D\uDD2E Media Url : ' + result,
        },
        { quoted: _0x3a970a }
      )
      const _0xfc26e8 = {
        text: '\u2705',
        key: _0x3a970a.key,
      }
      const _0x116c83 = { react: _0xfc26e8 }
      await _0x21b5a4.sendMessage(_0x236014, _0x116c83)
    } catch (_0x29432e) {
      _0x343aa8()
      _0x5a1e0e(_0x29432e)
    }
  }
)
const _0x4a641a = {}
_0x4a641a.pattern = 'gdrive'
_0x4a641a.alias = ["googledrive'"]
_0x4a641a.react = '\uD83D\uDCD1'
_0x4a641a.desc = 'Download googledrive files.'
_0x4a641a.category = 'download'
_0x4a641a.use = '.gdrive <googledrive link>'
_0x4a641a.filename = __filename
cmd(
  _0x4a641a,
  async (
    _0x33c3e8,
    _0x5ef265,
    _0x4b8511,
    {
      from: _0x74f9c5,
      l: _0x5ebb36,
      quoted: _0x36979c,
      body: _0x58ae61,
      isCmd: _0x478712,
      command: _0x49888c,
      args: _0x4feef0,
      q: _0x15d237,
      isGroup: _0x13e0c3,
      sender: _0x1bb86b,
      senderNumber: _0x307655,
      botNumber2: _0x2397da,
      botNumber: _0x3da99c,
      pushname: _0x1ebdee,
      isMe: _0xdfa316,
      isOwner: _0x1823f3,
      groupMetadata: _0x397527,
      groupName: _0x40781e,
      participants: _0xd00222,
      groupAdmins: _0x3b19f3,
      isBotAdmins: _0x55cf7f,
      isAdmins: _0x2d1802,
      reply: _0x3bfba2,
    }
  ) => {
    try {
      if (!_0x15d237) {
        return await _0x3bfba2('*Please give me googledrive url !!*')
      }
      let _0x48f85d = await fg.GDriveDl(_0x15d237)
      _0x3bfba2(
        '*\uD83D\uDCC3 File name:*  ' +
          _0x48f85d.fileName +
          '\n*\uD83D\uDC88 File Size:* ' +
          _0x48f85d.fileSize +
          '\n*\uD83D\uDD79️ File type:* ' +
          _0x48f85d.mimetype
      )
      const _0x410527 = { url: _0x48f85d.downloadUrl }
      const _0x191b18 = {
        document: _0x410527,
        fileName: _0x48f85d.fileName,
        mimetype: _0x48f85d.mimetype,
      }
      const _0x408de2 = { quoted: _0x5ef265 }
      _0x33c3e8.sendMessage(_0x74f9c5, _0x191b18, _0x408de2)
    } catch (_0x33df1d) {
      _0x3bfba2('*Error !!*')
      _0x5ebb36(_0x33df1d)
    }
  }
)
const _0x379cd8 = {}
_0x379cd8.pattern = 'sub'
_0x379cd8.react = '\uD83C\uDF9E️'
_0x379cd8.alias = ['subtitle', 'sinhalasub', 'sisub', 'sinhalasubtitle']
_0x379cd8.desc = urlneed1
_0x379cd8.category = 'download'
_0x379cd8.use = '.sub spiderman'
_0x379cd8.filename = __filename
cmd(
  _0x379cd8,
  async (
    _0x1dbb66,
    _0xc6e468,
    _0x2bd6b1,
    {
      from: _0x176049,
      prefix: _0x47fa90,
      l: _0x5cf188,
      quoted: _0x5ae5ac,
      body: _0x2d3887,
      isCmd: _0x4b3d4f,
      command: _0x23236f,
      args: _0x58cdec,
      q: _0x489219,
      isGroup: _0x48c638,
      sender: _0x4984a8,
      senderNumber: _0x158a2f,
      botNumber2: _0x537b68,
      botNumber: _0x4efd01,
      pushname: _0x1476c5,
      isMe: _0x398f01,
      isOwner: _0x5bd9c5,
      groupMetadata: _0x50d360,
      groupName: _0x3fa6be,
      participants: _0x409a44,
      groupAdmins: _0x4092a3,
      isBotAdmins: _0x9b1c56,
      isAdmins: _0x117a2f,
      reply: _0x3f3ea5,
    }
  ) => {
    try {
      const _0x7bdf68 = { text: imgmsg }
      const _0x17ef47 = { quoted: _0xc6e468 }
      if (!_0x489219) {
        return await _0x1dbb66.sendMessage(_0x176049, _0x7bdf68, _0x17ef47)
      }
      const _0x1b67e4 = await subsearch(_0x489219),
        _0x1fa0c1 = _0x1b67e4.results,
        _0x3e98cc = { text: N_FOUND }
      const _0x4950c8 = { quoted: _0xc6e468 }
      if (_0x1fa0c1.length < 1) {
        return await _0x1dbb66.sendMessage(_0x176049, _0x3e98cc, _0x4950c8)
      }
      var _0x4f0167 = []
      for (var _0x27e18f = 0; _0x27e18f < 9; _0x27e18f++) {
        _0x4f0167.push({
          title: _0x27e18f + 1,
          description: _0x1fa0c1[_0x27e18f].title,
          rowId: _0x47fa90 + 'dsub ' + _0x1fa0c1[_0x27e18f].link,
        })
      }
      const _0x761e48 = {
        title: '_[Result from Baiscopelk.com]_',
        rows: _0x4f0167,
      }
      const _0x5e3944 = [_0x761e48],
        _0x4250e0 = {
          text:
            '[\uD83D\uDC68‍\uD83D\uDCBB ＶＡＪＩＲＡ - ＭＤ - Ｖ4 \uD83D\uDC68‍\uD83D\uDCBB]\n\n   *SI SUB DOWNLOADER*\n\n*\uD83D\uDCDC Entered Name:* ' +
            _0x489219,
          footer: config.FOOTER,
          title: 'Result from Baiscopelk.com \uD83D\uDCF2',
          buttonText: '*\uD83D\uDD22 Reply below number*',
          sections: _0x5e3944,
        }
      const _0x1c5eba = _0x4250e0,
        _0x2d187c = { quoted: _0xc6e468 }
      await _0x1dbb66.replyList(_0x176049, _0x1c5eba, _0x2d187c)
    } catch (_0x5e97f8) {
      _0x3f3ea5('*ERROR !!*')
      _0x5cf188(_0x5e97f8)
    }
  }
)
const _0x3ea910 = {}
_0x3ea910.pattern = 'dsub'
_0x3ea910.dontAddCommandList = true
_0x3ea910.filename = __filename
cmd(
  _0x3ea910,
  async (
    _0x45b1e5,
    _0x383912,
    _0x248437,
    {
      from: _0x49c65a,
      l: _0x2426e0,
      quoted: _0x4f49ed,
      body: _0x25ec68,
      isCmd: _0x5dd3d9,
      command: _0x5d8c8f,
      args: _0xd3fb10,
      q: _0x36770b,
      isGroup: _0x1e838d,
      sender: _0x1c4e3a,
      senderNumber: _0x3747a9,
      botNumber2: _0x5909d5,
      botNumber: _0x38d84d,
      pushname: _0x76c9f6,
      isMe: _0x2043f5,
      isOwner: _0x13c196,
      groupMetadata: _0x5ac7b1,
      groupName: _0x2a9076,
      participants: _0x1c78da,
      groupAdmins: _0x2b0946,
      isBotAdmins: _0x1a92f9,
      isAdmins: _0x4448fd,
      reply: _0xc50331,
    }
  ) => {
    try {
      const _0x1c6164 = {
        text: '\uD83D\uDCE5',
        key: _0x383912.key,
      }
      const _0x1fdd3f = { react: _0x1c6164 }
      await _0x45b1e5.sendMessage(_0x49c65a, _0x1fdd3f)
      const _0x5ae94f = { text: '*Need sub link...*' }
      const _0xbb4ee9 = { quoted: _0x383912 }
      if (!_0x36770b) {
        return await _0x45b1e5.sendMessage(_0x49c65a, _0x5ae94f, _0xbb4ee9)
      }
      const _0x3c35d2 = await subdl(_0x36770b)
      let _0x5032ae = _0x3c35d2.results,
        _0x2db8cf =
          '*\uD83D\uDCDA Title :* ' +
          _0x5032ae.title.trim() +
          '\n*\uD83D\uDCBC Creater :* ' +
          _0x5032ae.creater
      const _0x35956c = { url: _0x5032ae.img }
      const _0x12e7e8 = {
        image: _0x35956c,
        caption: _0x2db8cf,
      }
      const _0x580d45 = { quoted: _0x383912 }
      await _0x45b1e5.sendMessage(_0x49c65a, _0x12e7e8, _0x580d45)
      const _0x46b0ce = { url: _0x5032ae.dl_link }
      const _0x3f91bf = { quoted: _0x383912 }
      let _0x2fcbb4 = await _0x45b1e5.sendMessage(
        _0x49c65a,
        {
          document: _0x46b0ce,
          mimetype: 'application/zip',
          fileName: _0x5032ae.title.trim() + '.' + 'zip',
          caption: '',
        },
        _0x3f91bf
      )
      const _0x21eeea = {
        text: '\uD83D\uDCC1',
        key: _0x2fcbb4.key,
      }
      const _0x23d811 = { react: _0x21eeea }
      await _0x45b1e5.sendMessage(_0x49c65a, _0x23d811)
      const _0x46f00c = {
        text: '\u2714',
        key: _0x383912.key,
      }
      const _0x21c2e6 = { react: _0x46f00c }
      await _0x45b1e5.sendMessage(_0x49c65a, _0x21c2e6)
    } catch (_0x356324) {
      _0xc50331('*ERROR !!*')
      _0x2426e0(_0x356324)
    }
  }
)
const _0x27ecc6 = {}
_0x27ecc6.pattern = 'slsub'
_0x27ecc6.react = '\uD83D\uDCC3'
_0x27ecc6.alias = ['srisub']
_0x27ecc6.desc = 'Search Sinhala Subtitles  from Web Site'
_0x27ecc6.category = 'download'
_0x27ecc6.use = '.slsub'
_0x27ecc6.filename = __filename
cmd(
  _0x27ecc6,
  async (
    _0x1cc0f7,
    _0x41b36f,
    _0x323cc4,
    {
      from: _0x14e0f0,
      l: _0x45a27d,
      quoted: _0x5054c1,
      body: _0x24c6bd,
      isCmd: _0x136c07,
      command: _0x39224c,
      args: _0xc975ea,
      q: _0x5b5d59,
      isGroup: _0x43166e,
      sender: _0x4ddb41,
      senderNumber: _0x57916d,
      botNumber2: _0xb98a55,
      botNumber: _0xe295a,
      pushname: _0x243212,
      isMe: _0x3c16c1,
      isOwner: _0x5d0de0,
      groupMetadata: _0x5dbbc2,
      groupName: _0x3c4173,
      participants: _0x3c5209,
      groupAdmins: _0x2c4913,
      isBotAdmins: _0x48a543,
      isCreator: _0x47e118,
      isDev: _0x313c89,
      isAdmins: _0x227613,
      reply: _0xe77d7e,
    }
  ) => {
    try {
      if (!_0x5b5d59) {
        return _0xe77d7e(
          '\u2757 *Please enter movie name to download Subtitles*'
        )
      }
      const _0x43f41f = await subsearch(_0x5b5d59),
        _0x348686 = await subdl(_0x43f41f.results[0].link),
        _0x13db67 =
          '*QUEEN-IZUMI-MD SINHALA SUB DOWNLOADER*\n\n\uD83D\uDCCA *Movie Title - ' +
          _0x348686.results.title +
          '*\n\n\uD83D\uDD12 Creator - ' +
          _0x348686.results.creater +
          '\n\n\uD83D\uDD87️ _Link_ - ' +
          _0x43f41f.results[0].link +
          '\n\n',
        _0xc9dea = { url: _0x348686.results.img }
      const _0x49d29c = { quoted: _0x41b36f }
      await _0x1cc0f7.sendMessage(
        _0x14e0f0,
        {
          image: _0xc9dea,
          caption:
            _0x13db67 +
            '*Qᴜᴇᴇɴ-ɪᴢᴜᴍɪ-ᴍᴅ ᴡʜᴀᴛꜱᴀᴘᴘ ᴜꜱᴇʀ ʙᴏᴛ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴛᴇᴄʜɴɪᴄᴀʟ ᴄʏʙᴇʀꜱ*',
        },
        _0x49d29c
      )
      const _0x56ebc9 = { url: _0x348686.results.dl_link }
      const _0x43dc12 = {
        document: _0x56ebc9,
        caption: _0x348686.results.title,
        mimetype: 'application/zip',
        fileName: _0x348686.results.title + '.zip',
      }
      const _0x49afbb = { quoted: _0x41b36f }
      await _0x1cc0f7.sendMessage(_0x14e0f0, _0x43dc12, _0x49afbb)
    } catch (_0x4858e5) {
      _0xe77d7e('\uD83D\uDEAB *Error Accurated !!*\n\n' + _0x4858e5)
      _0x45a27d(_0x4858e5)
    }
  }
)
const _0x2eb3ab = {}
_0x2eb3ab.pattern = 'subdlfromlink'
_0x2eb3ab.react = '\uD83D\uDCC3'
_0x2eb3ab.desc = 'Download subtitles from Web Sites'
_0x2eb3ab.category = 'download'
_0x2eb3ab.use = '.subdlfromlink'
_0x2eb3ab.filename = __filename
cmd(
  _0x2eb3ab,
  async (
    _0x1016b9,
    _0x323f9e,
    _0x4d710b,
    {
      from: _0x449860,
      l: _0x4fcc65,
      quoted: _0x27a7f4,
      body: _0x179321,
      isCmd: _0x30dd38,
      command: _0x115885,
      args: _0x1ef758,
      q: _0x2ff1c0,
      isGroup: _0x4e8ae5,
      sender: _0x3bba8c,
      senderNumber: _0x27506c,
      botNumber2: _0x58613c,
      botNumber: _0x42ad37,
      pushname: _0x46e84a,
      isMe: _0x199110,
      isOwner: _0xe174f7,
      groupMetadata: _0x51ac93,
      groupName: _0x1c43ac,
      participants: _0x4cc6bf,
      groupAdmins: _0x594f53,
      isBotAdmins: _0x1f624c,
      isCreator: _0x557013,
      isDev: _0x9593aa,
      isAdmins: _0x39d056,
      reply: _0x26312c,
    }
  ) => {
    try {
      if (!_0x2ff1c0) {
        return _0x26312c(
          '\u2757 Please enter movie Link to download Subtitles*'
        )
      }
      if (!_0x2ff1c0.includes('baiscope')) {
        return _0x26312c('\uD83D\uDEAB *Please enter Valid Movie url*')
      }
      const _0x425cf6 = await subdl(_0x2ff1c0),
        _0x3f5283 =
          '*VAJIRA-MD SL SUBTITLES DOWNLOADER*\n\n\uD83D\uDCCA *Movie title - ' +
          _0x425cf6.results.title +
          '*\n\n\uD83D\uDD12 Creator - ' +
          _0x425cf6.results.creater +
          '\n\n\uD83D\uDD87️ _Link_ - ' +
          _0x2ff1c0 +
          '\n\n*ᴠᴀᴊɪʀᴀ-ᴍᴅ-ᴠ3*\n*ᴀʟʟ ʀɪɢʜᴛ ʀᴇꜱᴇʀᴠᴇᴅ - ʙʏ ᴠᴀᴊɪʀᴀ*',
        _0x5d70f0 = { text: _0x3f5283 }
      const _0x3a0301 = { quoted: _0x323f9e }
      await _0x1016b9.sendMessage(_0x449860, _0x5d70f0, _0x3a0301)
      const _0x5ecd9b = { url: _0x425cf6.results.dl_link }
      const _0x33f22f = {
        document: _0x5ecd9b,
        caption: _0x425cf6.results.title,
        mimetype: 'application/zip',
        fileName: _0x425cf6.results.title + '.zip',
      }
      const _0x4a9335 = { quoted: _0x323f9e }
      await _0x1016b9.sendMessage(_0x449860, _0x33f22f, _0x4a9335)
    } catch (_0x5a3bd5) {
      _0x26312c('\uD83D\uDEAB *Error Accurated !!*\n\n' + _0x5a3bd5)
      _0x4fcc65(_0x5a3bd5)
    }
  }
)
const _0x1a60ee = {}
_0x1a60ee.pattern = 'tiktok'
_0x1a60ee.alias = ['ttdl', 'tt']
_0x1a60ee.react = '\uD83C\uDFF7️'
_0x1a60ee.desc = desc
_0x1a60ee.category = 'download'
_0x1a60ee.use = '.tiktok <Tiktok link>'
_0x1a60ee.filename = __filename
cmd(
  _0x1a60ee,
  async (
    _0x40c7c5,
    _0x262962,
    _0x483c9d,
    {
      from: _0x37460c,
      l: _0x13c852,
      prefix: _0x41ff95,
      quoted: _0x41fb29,
      body: _0x1b0f9e,
      isCmd: _0x3ebb1d,
      command: _0x38d27d,
      args: _0x39b742,
      q: _0x1e9ca4,
      isGroup: _0x29ceb2,
      sender: _0x111635,
      senderNumber: _0xe88b3e,
      botNumber2: _0x58e19f,
      botNumber: _0x160d71,
      pushname: _0x13bafa,
      isMe: _0x595d13,
      isOwner: _0x3bb910,
      groupMetadata: _0x203a85,
      groupName: _0x1716f3,
      participants: _0x1a8a45,
      groupAdmins: _0xd01d33,
      isBotAdmins: _0x3d4fe4,
      isAdmins: _0x111b0c,
      reply: _0x487591,
    }
  ) => {
    try {
      if (!regtik(_0x1e9ca4)) {
        return await _0x487591(urlneed)
      }
      var _0x13c852 = ''
      let _0x1d4dd5 = await fetchJson(
        'https://vajira-apis-803339515192.herokuapp.com/api/dowloader/tikok?url=' +
          _0x1e9ca4
      )
      if (_0x1d4dd5.msg == 'OK') {
        let _0x51ab76 = _0x1d4dd5
        const _0x1daf72 = {
          title: _0x51ab76.result.desc,
          nowm: _0x51ab76.result.withoutWaterMarkVideo,
          watermark: _0x51ab76.result.waterMarkVideo,
          audio: _0x51ab76.result.music,
          thumbnail: _0x51ab76.result.cover,
          author: _0x51ab76.result.author,
        }
        _0x13c852 = _0x1daf72
      } else {
        let _0xd4c0ce = await Tiktok(_0x1e9ca4)
        _0x13c852 = _0xd4c0ce
      }
      let _0x5c63ec =
        '[\uD83D\uDC68‍\uD83D\uDCBB ＶＡＪＩＲＡ - ＭＤ - Ｖ4 \uD83D\uDC68‍\uD83D\uDCBB]\n\n*TIKTOK DOWNLOADER*\n\n*\uD83D\uDCC3 Title:* ' +
        _0x13c852.title +
        '\n*\u270D\uD83C\uDFFC Author:* ' +
        _0x13c852.author
      const _0x23dbfa = {
        title: '1',
        rowId: _0x41ff95 + 'dvideo ' + _0x13c852.nowm,
        description: 'VIDEO NO WATERMARK',
      }
      const _0x24d15e = {
        title: '2',
        rowId: _0x41ff95 + 'dvideo ' + _0x13c852.watermark,
        description: 'VIDEO WITH WATERMARK',
      }
      const _0x4faf20 = {
        title: '3',
        rowId: _0x41ff95 + 'dau ' + _0x13c852.audio,
        description: 'AUDIO DOWNLOAD',
      }
      const _0x151145 = {
        title: '',
        rows: [_0x23dbfa, _0x24d15e, _0x4faf20],
      }
      const _0x305528 = [_0x151145],
        _0x1edd18 = { url: _0x13c852.thumbnail }
      const _0x2a05f9 = {
        image: _0x1edd18,
        text: _0x5c63ec,
        footer: config.FOOTER,
        buttonText: '\uD83D\uDD22 Reply below number,',
        sections: _0x305528,
        contextInfo: {},
      }
      _0x2a05f9.contextInfo.externalAdReply = {}
      _0x2a05f9.contextInfo.externalAdReply.title =
        '\uD83D\uDC68‍\uD83D\uDCBB ＶＡＪＩＲＡ - ＭＤ - Ｖ4 \uD83D\uDC68‍\uD83D\uDCBB'
      _0x2a05f9.contextInfo.externalAdReply.body = 'ᴀɴ ᴜꜱᴇʀ ʙᴏᴛ ꜰᴏʀ ᴡʜᴀᴛꜱᴀᴘᴘ'
      _0x2a05f9.contextInfo.externalAdReply.mediaType = 1
      _0x2a05f9.contextInfo.externalAdReply.sourceUrl = ''
      _0x2a05f9.contextInfo.externalAdReply.renderLargerThumbnail = false
      _0x2a05f9.contextInfo.externalAdReply.showAdAttribution = true
      const _0x4050dc = _0x2a05f9,
        _0xfe7dce = {}
      return (
        (_0xfe7dce.quoted = _0x262962),
        await _0x40c7c5.replyList(_0x37460c, _0x4050dc, _0xfe7dce)
      )
    } catch (_0x20b40d) {
      _0x487591(N_FOUND)
      _0x13c852(_0x20b40d)
    }
  }
)
const _0x3206d0 = {}
_0x3206d0.pattern = 'dau'
_0x3206d0.dontAddCommandList = true
_0x3206d0.filename = __filename
cmd(
  _0x3206d0,
  async (
    _0x4aaa80,
    _0x4cad1c,
    _0x43a92f,
    {
      from: _0x5486a0,
      l: _0x1229a0,
      quoted: _0x493f41,
      body: _0x5cb114,
      isCmd: _0x53a6b8,
      command: _0x80de35,
      args: _0x2cc7b2,
      q: _0x2327e9,
      isGroup: _0x2ce55b,
      sender: _0x14cdba,
      senderNumber: _0x403df1,
      botNumber2: _0x4c370d,
      botNumber: _0x5ea141,
      pushname: _0x513ccb,
      isMe: _0x347be5,
      isOwner: _0x20a2b3,
      groupMetadata: _0x388487,
      groupName: _0x478208,
      participants: _0xb83e0a,
      groupAdmins: _0x683a34,
      isBotAdmins: _0xeb4c54,
      isAdmins: _0x41e74a,
      reply: _0x5c93ac,
    }
  ) => {
    try {
      const _0x87781d = {
        text: '\uD83D\uDCE5',
        key: _0x4cad1c.key,
      }
      const _0x327819 = { react: _0x87781d }
      await _0x4aaa80.sendMessage(_0x5486a0, _0x327819)
      const _0xf81aad = { url: _0x2327e9 }
      const _0x4e5b8f = { quoted: _0x4cad1c }
      await _0x4aaa80.sendMessage(
        _0x5486a0,
        {
          document: _0xf81aad,
          mimetype: 'audio/mpeg',
          fileName: 'TikTok Audio.mp3',
          caption: config.FOOTER,
        },
        _0x4e5b8f
      )
      const _0x36fd12 = {
        text: '\u2714',
        key: _0x4cad1c.key,
      }
      const _0x1368f7 = { react: _0x36fd12 }
      await _0x4aaa80.sendMessage(_0x5486a0, _0x1368f7)
    } catch (_0x131cb7) {
      _0x5c93ac('*ERROR !!*')
      _0x1229a0(_0x131cb7)
    }
  }
)
const _0x5dfda7 = {}
_0x5dfda7.pattern = 'img1'
_0x5dfda7.react = '\uD83D\uDDBC️'
_0x5dfda7.desc = desc2
_0x5dfda7.category = ''
_0x5dfda7.use = '.img2 car'
_0x5dfda7.filename = __filename
cmd(
  _0x5dfda7,
  async (
    _0x5df5db,
    _0x563c15,
    _0x28c0fd,
    {
      from: _0x30ff5e,
      l: _0x2f4652,
      prefix: _0x573fc3,
      quoted: _0x493c73,
      body: _0x36ef97,
      isCmd: _0x5cf0d3,
      command: _0x4f49a7,
      args: _0x919118,
      q: _0x3e2bad,
      isGroup: _0x5aa5fc,
      sender: _0x2a857d,
      senderNumber: _0x47e3c0,
      botNumber2: _0x457a8c,
      botNumber: _0x498c3a,
      pushname: _0x2b7169,
      isMe: _0x565a56,
      isOwner: _0x1067ff,
      groupMetadata: _0x199283,
      groupName: _0x5b47a4,
      participants: _0x2cde9e,
      groupAdmins: _0x4767aa,
      isBotAdmins: _0x129767,
      isAdmins: _0x215fc2,
      reply: _0x98b8d9,
    }
  ) => {
    try {
      if (!_0x3e2bad) {
        return await _0x98b8d9(imgmsg)
      }
      const _0x517691 = {
        query: _0x3e2bad,
        page: 1,
      }
      const _0x5b3f5c = await unsplash.search(_0x517691)
      let _0x229152 = _0x5b3f5c
      const _0x55eb4c = { text: N_FOUND }
      const _0x326fb0 = { quoted: _0x563c15 }
      if (_0x229152.result.length < 1) {
        return await _0x5df5db.sendMessage(_0x30ff5e, _0x55eb4c, _0x326fb0)
      }
      var _0x5b3539 = []
      let _0x2604c4 = 1
      for (var _0x158640 = 0; _0x158640 < _0x229152.length; _0x158640++) {
        _0x5b3539.push({
          title: _0x158640 + 1,
          description: 'Image number: ' + _0x2604c4++,
          rowId: _0x573fc3 + 'dimg ' + _0x229152.result[_0x158640],
        })
      }
      const _0x4933d8 = {
        title: 'Result from unsplash.com. \uD83D\uDCF2',
        rows: _0x5b3539,
      }
      const _0x4133aa = [_0x4933d8],
        _0x5ef5ba = {
          text:
            '[\uD83D\uDC68‍\uD83D\uDCBB ＶＡＪＩＲＡ - ＭＤ - Ｖ4 \uD83D\uDC68‍\uD83D\uDCBB]\n\n   *IMG DOWNLOADER 02*\n\n*\uD83D\uDDBC️ Image Name:* ' +
            _0x3e2bad,
          footer: config.FOOTER,
          title: 'Result from unsplash.com. \uD83D\uDCF2',
          buttonText: 'Select Image',
          sections: _0x4133aa,
        }
      const _0x1f02b1 = _0x5ef5ba,
        _0x32d70a = { quoted: _0x563c15 }
      await _0x5df5db.replyList(_0x30ff5e, _0x1f02b1, _0x32d70a)
    } catch (_0x5cfa49) {
      _0x98b8d9(errt)
      _0x2f4652(_0x5cfa49)
    }
  }
)
const _0x41d47b = {}
_0x41d47b.pattern = 'img2'
_0x41d47b.react = '\uD83D\uDDBC️'
_0x41d47b.desc = desc3
_0x41d47b.category = ''
_0x41d47b.use = '.img3 car'
_0x41d47b.filename = __filename
cmd(
  _0x41d47b,
  async (
    _0x5b4195,
    _0x4f4e08,
    _0x5d485b,
    {
      from: _0x3d98d1,
      l: _0x40d0a9,
      prefix: _0x41e892,
      quoted: _0x5ec6e5,
      body: _0x33d19c,
      isCmd: _0x583816,
      command: _0x23a450,
      args: _0xe37c33,
      q: _0x44f3e1,
      isGroup: _0x59cb7c,
      sender: _0x47b739,
      senderNumber: _0x17f939,
      botNumber2: _0x46bccf,
      botNumber: _0x3a5a51,
      pushname: _0x4d52d5,
      isMe: _0xc55546,
      isOwner: _0x2ef1da,
      groupMetadata: _0x50b871,
      groupName: _0x57eb40,
      participants: _0x225448,
      groupAdmins: _0x45f510,
      isBotAdmins: _0x1a1313,
      isAdmins: _0x219700,
      reply: _0x31938b,
    }
  ) => {
    try {
      if (!_0x44f3e1) {
        return await _0x31938b(imgmsg)
      }
      const _0xf6c7a8 = {
        query: _0x44f3e1,
        page: 1,
      }
      const _0x2504a3 = await pixabay.search(_0xf6c7a8)
      let _0x591563 = _0x2504a3
      const _0x28dad9 = { text: N_FOUND }
      const _0x4e6f0d = { quoted: _0x4f4e08 }
      if (_0x591563.result.length < 1) {
        return await _0x5b4195.sendMessage(_0x3d98d1, _0x28dad9, _0x4e6f0d)
      }
      var _0x5d20f1 = []
      let _0x1bbb90 = 1
      for (var _0x4c5094 = 0; _0x4c5094 < _0x591563.length; _0x4c5094++) {
        _0x5d20f1.push({
          title: _0x4c5094 + 1,
          description: 'Image number: ' + _0x1bbb90++,
          rowId: _0x41e892 + 'dimg ' + _0x591563.result[_0x4c5094],
        })
      }
      const _0x132cda = {
        title: 'Result from pixabay.com. \uD83D\uDCF2',
        rows: _0x5d20f1,
      }
      const _0x22e69f = [_0x132cda],
        _0x421b95 = {
          text:
            '[\uD83D\uDC68‍\uD83D\uDCBB ＶＡＪＩＲＡ - ＭＤ - Ｖ4 \uD83D\uDC68‍\uD83D\uDCBB]\n\n   *IMG DOWNLOADER 03*\n\n*\uD83D\uDDBC️ Image Name:* ' +
            _0x44f3e1,
          footer: config.FOOTER,
          title: 'Result from pixabay.com. \uD83D\uDCF2',
          buttonText: 'Select Image',
          sections: _0x22e69f,
        }
      const _0xd83d95 = _0x421b95,
        _0x763e90 = { quoted: _0x4f4e08 }
      await _0x5b4195.replyList(_0x3d98d1, _0xd83d95, _0x763e90)
    } catch (_0x48b883) {
      _0x31938b(errt)
      _0x40d0a9(_0x48b883)
    }
  }
)
const _0x5f4ecd = {}
_0x5f4ecd.pattern = 'img3'
_0x5f4ecd.react = '\uD83D\uDDBC️'
_0x5f4ecd.desc = desc4
_0x5f4ecd.category = ''
_0x5f4ecd.use = '.img4 car'
_0x5f4ecd.filename = __filename
cmd(
  _0x5f4ecd,
  async (
    _0x2044d1,
    _0x33c976,
    _0x3c20b8,
    {
      from: _0x4ce43a,
      l: _0x3bfda2,
      prefix: _0x581bbf,
      quoted: _0x133b5d,
      body: _0x66754e,
      isCmd: _0x15812d,
      command: _0x17f9b6,
      args: _0x56ebff,
      q: _0x4eaba7,
      isGroup: _0x588cf4,
      sender: _0x267950,
      senderNumber: _0x13f562,
      botNumber2: _0x2d1313,
      botNumber: _0x206637,
      pushname: _0x3221d0,
      isMe: _0x550750,
      isOwner: _0x22a14d,
      groupMetadata: _0x558c87,
      groupName: _0x383db8,
      participants: _0xc360b9,
      groupAdmins: _0x5c811a,
      isBotAdmins: _0x3c9859,
      isAdmins: _0x4c8053,
      reply: _0x1a97bd,
    }
  ) => {
    try {
      if (!_0x4eaba7) {
        return await _0x1a97bd(imgmsg)
      }
      const _0x31a2a6 = await fetchJson(
        'https://api.akuari.my.id/search/bingimage?query=' + _0x4eaba7
      )
      let _0x15c109 = _0x31a2a6.hasil
      const _0x549ff7 = { text: N_FOUND }
      const _0x42c59b = { quoted: _0x33c976 }
      if (_0x15c109.results.length < 1) {
        return await _0x2044d1.sendMessage(_0x4ce43a, _0x549ff7, _0x42c59b)
      }
      var _0x3a5d12 = []
      for (var _0x2cc5c7 = 0; _0x2cc5c7 < _0x15c109.length; _0x2cc5c7++) {
        _0x3a5d12.push({
          title: _0x2cc5c7 + 1,
          description: _0x15c109.results[_0x2cc5c7].title,
          rowId: _0x581bbf + 'dimg ' + _0x15c109.results[_0x2cc5c7].direct,
        })
      }
      const _0x466d74 = {
        title: 'Result from bing \uD83D\uDCF2',
        rows: _0x3a5d12,
      }
      const _0x220dda = [_0x466d74],
        _0x377174 = {
          text:
            '[\uD83D\uDC68‍\uD83D\uDCBB ＶＡＪＩＲＡ - ＭＤ - Ｖ4 \uD83D\uDC68‍\uD83D\uDCBB]\n\n   *IMG DOWNLOADER 04*\n\n*\uD83D\uDDBC️ Image Name:* ' +
            _0x4eaba7,
          footer: config.FOOTER,
          title: 'Result from bing \uD83D\uDCF2',
          buttonText: 'Select Image',
          sections: _0x220dda,
        }
      const _0xe6c356 = _0x377174,
        _0x44aefe = { quoted: _0x33c976 }
      await _0x2044d1.replyList(_0x4ce43a, _0xe6c356, _0x44aefe)
    } catch (_0x4ec273) {
      _0x1a97bd(errt)
      _0x3bfda2(_0x4ec273)
    }
  }
)
const _0x213d0b = {}
_0x213d0b.pattern = 'img4'
_0x213d0b.react = '\uD83D\uDDBC️'
_0x213d0b.desc = desc5
_0x213d0b.category = 'download'
_0x213d0b.use = '.img car'
_0x213d0b.filename = __filename
cmd(
  _0x213d0b,
  async (
    _0xfb5495,
    _0x334972,
    _0x39687f,
    {
      from: _0x460fc4,
      l: _0x455cba,
      prefix: _0x472d3e,
      quoted: _0xd119e,
      body: _0xa6f87b,
      isCmd: _0x28fe3c,
      command: _0x19a89e,
      args: _0x1f9d78,
      q: _0x49f149,
      isGroup: _0x37053b,
      sender: _0x5e0759,
      senderNumber: _0x335c1f,
      botNumber2: _0x2c39c7,
      botNumber: _0x9d071a,
      pushname: _0x2c252f,
      isMe: _0x41c88a,
      isOwner: _0x2ba46c,
      groupMetadata: _0x1b76ea,
      groupName: _0x3c3c82,
      participants: _0x50dccb,
      groupAdmins: _0x4197e7,
      isBotAdmins: _0x302703,
      isAdmins: _0x4d0c63,
      reply: _0x41d181,
    }
  ) => {
    try {
      if (!_0x49f149) {
        return await _0x41d181(imgmsg)
      }
      const _0x4f4cf9 = await gis(_0x49f149)
      let _0x2b21ac = _0x4f4cf9.slice(0, 100)
      const _0x1ce734 = { text: N_FOUND }
      const _0x105af7 = { quoted: _0x334972 }
      if (_0x2b21ac.length < 1) {
        return await _0xfb5495.sendMessage(_0x460fc4, _0x1ce734, _0x105af7)
      }
      var _0x2362bd = []
      let _0x58d665 = 1
      for (var _0x236645 = 0; _0x236645 < _0x2b21ac.length; _0x236645++) {
        _0x2362bd.push({
          title: _0x236645 + 1,
          description: 'Image number: ' + _0x58d665++,
          rowId: _0x472d3e + 'dimg ' + _0x2b21ac[_0x236645].url,
        })
      }
      const _0x3f4903 = {
        title: 'Result from google. \uD83D\uDCF2',
        rows: _0x2362bd,
      }
      const _0x14858f = [_0x3f4903],
        _0x582318 = {
          text:
            '[\uD83D\uDC68‍\uD83D\uDCBB ＶＡＪＩＲＡ - ＭＤ - Ｖ4 \uD83D\uDC68‍\uD83D\uDCBB]\n\n   *IMG DOWNLOADER 01*\n\n*\uD83D\uDDBC️ Image Name:* ' +
            _0x49f149,
          footer: config.FOOTER,
          title: 'Result from google. \uD83D\uDCF2',
          buttonText: 'Select Image',
          sections: _0x14858f,
        }
      const _0x38a9ea = _0x582318,
        _0xdcacf3 = { quoted: _0x334972 }
      await _0xfb5495.replyList(_0x460fc4, _0x38a9ea, _0xdcacf3)
    } catch (_0x48cc6c) {
      _0x41d181(errt)
      _0x455cba(_0x48cc6c)
    }
  }
)
const _0x5bc525 = {}
_0x5bc525.pattern = 'dimg'
_0x5bc525.dontAddCommandList = true
_0x5bc525.filename = __filename
cmd(
  _0x5bc525,
  async (
    _0x3fc3af,
    _0x17144d,
    _0x3b2953,
    {
      from: _0x48ee4d,
      l: _0x103636,
      quoted: _0xdafe4f,
      body: _0x455f3e,
      isCmd: _0x4cf3ac,
      command: _0x4a9dee,
      args: _0x1f89ba,
      q: _0x4d4c85,
      isGroup: _0x11a82a,
      sender: _0x120cb6,
      senderNumber: _0x151500,
      botNumber2: _0x3d7399,
      botNumber: _0x444d1e,
      pushname: _0x26d953,
      isMe: _0x381b19,
      isOwner: _0x2a59d8,
      groupMetadata: _0x514a81,
      groupName: _0x3893ac,
      participants: _0x2f27a4,
      groupAdmins: _0x5180a1,
      isBotAdmins: _0x38fcd5,
      isAdmins: _0x31450c,
      reply: _0x1d28b2,
    }
  ) => {
    try {
      const _0x3beaf6 = {
        text: '\uD83D\uDD03',
        key: _0x17144d.key,
      }
      const _0x4996ad = { react: _0x3beaf6 }
      await _0x3fc3af.sendMessage(_0x48ee4d, _0x4996ad)
      const _0x1d6cee = { url: _0x4d4c85 }
      const _0x183a51 = {
        image: _0x1d6cee,
        caption: config.FOOTER,
      }
      const _0x1ba34d = { quoted: _0x17144d }
      await _0x3fc3af.sendMessage(_0x48ee4d, _0x183a51, _0x1ba34d)
      const _0x19f018 = {
        text: '\u2714',
        key: _0x17144d.key,
      }
      const _0x5ca48b = { react: _0x19f018 }
      await _0x3fc3af.sendMessage(_0x48ee4d, _0x5ca48b)
    } catch (_0x5798ae) {
      _0x1d28b2(errt)
      _0x103636(_0x5798ae)
    }
  }
)
const _0x56bfa0 = {}
_0x56bfa0.pattern = 'wallpaper'
_0x56bfa0.react = '\uD83D\uDD16'
_0x56bfa0.desc = 'image downloader'
_0x56bfa0.category = 'download'
_0x56bfa0.use = '.wallpaper'
_0x56bfa0.filename = __filename
cmd(
  _0x56bfa0,
  async (
    _0x41a8a8,
    _0x6586d6,
    _0x35d21d,
    {
      from: _0x1ac180,
      l: _0x20b434,
      quoted: _0x4314ea,
      prefix: _0x50ffa8,
      body: _0x3ee84b,
      isCmd: _0x173924,
      command: _0x697cc0,
      args: _0x451e5e,
      q: _0x161eb6,
      isGroup: _0x3f94b7,
      sender: _0x5da37b,
      senderNumber: _0x542de7,
      botNumber2: _0x4da906,
      botNumber: _0x184d19,
      pushname: _0x19d0f3,
      isMe: _0x18bafa,
      isOwner: _0x1ca7fb,
      groupMetadata: _0x571091,
      groupName: _0x15921e,
      participants: _0x4ea103,
      groupAdmins: _0x43d1a0,
      isBotAdmins: _0x472a21,
      isAdmins: _0x223d3a,
      reply: _0x48de3c,
    }
  ) => {
    try {
      let _0x3db274 = 'Enter Query Title',
        { wallpaper: _0x5a4ae4 } = require('../lib/scraper')
      anu = await _0x5a4ae4(_0x161eb6)
      result = anu[Math.floor(Math.random() * anu.length)]
      const _0x1c2acc = [
          {
            title: '',
            rows: [
              {
                title: '1',
                rowId: _0x50ffa8 + 'wallpaper ' + _0x161eb6,
                description: 'NEXT  PIC \u27A1️',
              },
            ],
          },
        ],
        _0x3bce9b = { url: result.image[0] }
      const _0x1ed53e = {
        image: _0x3bce9b,
        caption:
          '\uD83D\uDD2E \uD835\uDDE7\uD835\uDDDC\uD835\uDDE7\uD835\uDDDF\uD835\uDDD8 : ' +
          result.title +
          '\n\uD83D\uDD2E \uD835\uDDD6\uD835\uDDD4\uD835\uDDE7\uD835\uDDD8\uD835\uDDDA\uD835\uDDE2\uD835\uDDE5\uD835\uDDEC : ' +
          result.type +
          '\n\uD83D\uDD2E \uD835\uDDD7\uD835\uDDD8\uD835\uDDE7\uD835\uDDD4\uD835\uDDDC\uD835\uDDDF : ' +
          result.source +
          '\n\uD83D\uDD2E \uD835\uDDE0\uD835\uDDD8\uD835\uDDD7\uD835\uDDDC\uD835\uDDD4 \uD835\uDDE8\uD835\uDDE5\uD835\uDDDF : ' +
          (result.image[2] || result.image[1] || result.image[0]),
        footer: config.FOOTER,
        buttonText: '\uD83D\uDD22 Reply below number,',
        sections: _0x1c2acc,
        contextInfo: {},
      }
      _0x1ed53e.contextInfo.externalAdReply = {}
      _0x1ed53e.contextInfo.externalAdReply.title =
        '\uD83D\uDC68‍\uD83D\uDCBB ＶＡＪＩＲＡ - ＭＤ - Ｖ4 \uD83D\uDC68‍\uD83D\uDCBB'
      _0x1ed53e.contextInfo.externalAdReply.body = 'ᴀɴ ᴜꜱᴇʀ ʙᴏᴛ ꜰᴏʀ ᴡʜᴀᴛꜱᴀᴘᴘ'
      _0x1ed53e.contextInfo.externalAdReply.mediaType = 1
      _0x1ed53e.contextInfo.externalAdReply.sourceUrl = ''
      _0x1ed53e.contextInfo.externalAdReply.thumbnailUrl =
        'https://telegra.ph/file/b4caa5682d75220623b83.jpg'
      _0x1ed53e.contextInfo.externalAdReply.renderLargerThumbnail = false
      _0x1ed53e.contextInfo.externalAdReply.showAdAttribution = true
      const _0x26b2de = _0x1ed53e,
        _0x3905bd = {}
      return (
        (_0x3905bd.quoted = _0x6586d6),
        await _0x41a8a8.replyList(_0x1ac180, _0x26b2de, _0x3905bd)
      )
    } catch (_0x2c614b) {
      _0x48de3c(N_FOUND)
      _0x20b434(_0x2c614b)
    }
  }
)
const _0x2000c3 = {}
_0x2000c3.pattern = 'wikimedia'
_0x2000c3.react = '\uD83D\uDD16'
_0x2000c3.desc = 'to download wikimedia'
_0x2000c3.category = 'download'
_0x2000c3.use = '.wikimedia'
_0x2000c3.filename = __filename
cmd(
  _0x2000c3,
  async (
    _0xb8385c,
    _0x2df238,
    _0x57c0b6,
    {
      from: _0x49ee0b,
      l: _0x9cd966,
      quoted: _0x283982,
      prefix: _0x2b3035,
      body: _0x251e55,
      isCmd: _0x546ad9,
      command: _0x5d90c8,
      args: _0x346909,
      q: _0x4dcef7,
      isGroup: _0x377d23,
      sender: _0x493183,
      senderNumber: _0x5dfeb5,
      botNumber2: _0x2e8386,
      botNumber: _0x3a076d,
      pushname: _0x28d844,
      isMe: _0x74f4fe,
      isOwner: _0x447ec9,
      groupMetadata: _0x433570,
      groupName: _0x12b5bb,
      participants: _0x323754,
      groupAdmins: _0x24611d,
      isBotAdmins: _0x28f5bd,
      isAdmins: _0xf8aa0d,
      reply: _0x7907c2,
    }
  ) => {
    try {
      let _0x26535d = 'Enter Query Title',
        { wikimedia: _0x1d8ef0 } = require('../lib/scraper')
      anu = await _0x1d8ef0(_0x4dcef7)
      result = anu[Math.floor(Math.random() * anu.length)]
      const _0x17cb0e = [
          {
            title: '',
            rows: [
              {
                title: '1',
                rowId: _0x2b3035 + 'wikimedia ' + _0x4dcef7,
                description: 'NEXT  PIC \u27A1️',
              },
            ],
          },
        ],
        _0xd9ff91 = { url: result.image[0] }
      const _0x3aa96d = {
        image: _0xd9ff91,
        caption:
          '\uD83D\uDD2E \uD835\uDDE7\uD835\uDDDC\uD835\uDDE7\uD835\uDDDF\uD835\uDDD8 : ' +
          result.title +
          '\n\uD83D\uDD2E \uD835\uDDD6\uD835\uDDD4\uD835\uDDE7\uD835\uDDD8\uD835\uDDDA\uD835\uDDE2\uD835\uDDE5\uD835\uDDEC : ' +
          result.type +
          '\n\uD83D\uDD2E \uD835\uDDD7\uD835\uDDD8\uD835\uDDE7\uD835\uDDD4\uD835\uDDDC\uD835\uDDDF : ' +
          result.source +
          '\n\uD83D\uDD2E \uD835\uDDE0\uD835\uDDD8\uD835\uDDD7\uD835\uDDDC\uD835\uDDD4 \uD835\uDDE8\uD835\uDDE5\uD835\uDDDF : ' +
          (result.image[2] || result.image[1] || result.image[0]),
        footer: config.FOOTER,
        buttonText: '\uD83D\uDD22 Reply below number,',
        sections: _0x17cb0e,
        contextInfo: {},
      }
      _0x3aa96d.contextInfo.externalAdReply = {}
      _0x3aa96d.contextInfo.externalAdReply.title =
        '\uD83D\uDC68‍\uD83D\uDCBB ＶＡＪＩＲＡ - ＭＤ - Ｖ4 \uD83D\uDC68‍\uD83D\uDCBB'
      _0x3aa96d.contextInfo.externalAdReply.body = 'ᴀɴ ᴜꜱᴇʀ ʙᴏᴛ ꜰᴏʀ ᴡʜᴀᴛꜱᴀᴘᴘ'
      _0x3aa96d.contextInfo.externalAdReply.mediaType = 1
      _0x3aa96d.contextInfo.externalAdReply.sourceUrl = ''
      _0x3aa96d.contextInfo.externalAdReply.thumbnailUrl =
        'https://telegra.ph/file/b4caa5682d75220623b83.jpg'
      _0x3aa96d.contextInfo.externalAdReply.renderLargerThumbnail = false
      _0x3aa96d.contextInfo.externalAdReply.showAdAttribution = true
      const _0x14d02b = _0x3aa96d,
        _0x7e4bc2 = {}
      return (
        (_0x7e4bc2.quoted = _0x2df238),
        await _0xb8385c.replyList(_0x49ee0b, _0x14d02b, _0x7e4bc2)
      )
    } catch (_0x51c2fe) {
      _0x7907c2(N_FOUND)
      _0x9cd966(_0x51c2fe)
    }
  }
)
const _0x2535f2 = {}
_0x2535f2.pattern = 'quotesanime'
_0x2535f2.react = '\uD83D\uDD16'
_0x2535f2.desc = 'to download animes'
_0x2535f2.category = 'download'
_0x2535f2.use = '.quotesanime'
_0x2535f2.filename = __filename
cmd(
  _0x2535f2,
  async (
    _0x544afc,
    _0x4e218c,
    _0xe6aa91,
    {
      from: _0x146cf7,
      l: _0x10fbd5,
      quoted: _0x11ad6e,
      prefix: _0x3b7f33,
      body: _0x4f330b,
      isCmd: _0x32742a,
      command: _0x47e8d2,
      args: _0x228491,
      q: _0x85fe21,
      isGroup: _0x53bcb5,
      sender: _0xf71ceb,
      senderNumber: _0x130dca,
      botNumber2: _0x2c44a2,
      botNumber: _0x12bac2,
      pushname: _0x8cfc1c,
      isMe: _0x483a61,
      isOwner: _0x5c0b29,
      groupMetadata: _0x12cba9,
      groupName: _0x25aa30,
      participants: _0x1ca5ec,
      groupAdmins: _0x146f88,
      isBotAdmins: _0x542210,
      isAdmins: _0x145d5a,
      reply: _0x379433,
    }
  ) => {
    try {
      let _0x19374a = 'Enter Query Title',
        { quotesAnime: _0x27056d } = require('../lib/scraper'),
        _0x5c0ddf = await _0x27056d()
      result = _0x5c0ddf[Math.floor(Math.random() * _0x5c0ddf.length)]
      const _0x29f291 = [
          {
            title: '',
            rows: [
              {
                title: '1',
                rowId: _0x3b7f33 + 'quotesanime ' + _0x85fe21,
                description: 'NEXT  PIC \u27A1️',
              },
            ],
          },
        ],
        _0x2bf73d = {
          text:
            '~_' +
            result.quotes +
            "_\n\nBy '" +
            result.karakter +
            "', " +
            result.anime +
            '\n\n- ' +
            result.up_at,
          footer: config.FOOTER,
          buttonText: '\uD83D\uDD22 Reply below number,',
          sections: _0x29f291,
          contextInfo: {},
        }
      _0x2bf73d.contextInfo.externalAdReply = {}
      _0x2bf73d.contextInfo.externalAdReply.title =
        '\uD83D\uDC68‍\uD83D\uDCBB ＶＡＪＩＲＡ - ＭＤ - Ｖ4 \uD83D\uDC68‍\uD83D\uDCBB'
      _0x2bf73d.contextInfo.externalAdReply.body = 'ᴀɴ ᴜꜱᴇʀ ʙᴏᴛ ꜰᴏʀ ᴡʜᴀᴛꜱᴀᴘᴘ'
      _0x2bf73d.contextInfo.externalAdReply.mediaType = 1
      _0x2bf73d.contextInfo.externalAdReply.sourceUrl = ''
      _0x2bf73d.contextInfo.externalAdReply.thumbnailUrl =
        'https://telegra.ph/file/b4caa5682d75220623b83.jpg'
      _0x2bf73d.contextInfo.externalAdReply.renderLargerThumbnail = false
      _0x2bf73d.contextInfo.externalAdReply.showAdAttribution = true
      const _0xf4dbf3 = _0x2bf73d,
        _0x42c7ca = {}
      return (
        (_0x42c7ca.quoted = _0x4e218c),
        await _0x544afc.replyList(_0x146cf7, _0xf4dbf3, _0x42c7ca)
      )
    } catch (_0x4bd59a) {
      _0x379433(N_FOUND)
      _0x10fbd5(_0x4bd59a)
    }
  }
)
const _0x68fe80 = {}
_0x68fe80.pattern = 'coffe'
_0x68fe80.react = '\uD83D\uDD16'
_0x68fe80.desc = 'to download coffe'
_0x68fe80.category = 'download'
_0x68fe80.use = '.coffe'
_0x68fe80.filename = __filename
cmd(
  _0x68fe80,
  async (
    _0xab4ca7,
    _0x1617ee,
    _0x56d768,
    {
      from: _0x43489e,
      l: _0x2f4dff,
      quoted: _0x4acdf1,
      prefix: _0xdca8fe,
      body: _0x2f8d27,
      isCmd: _0x127b91,
      command: _0x9770d2,
      args: _0x253634,
      q: _0x582b63,
      isGroup: _0xe6cdac,
      sender: _0x5665e8,
      senderNumber: _0x14d8cc,
      botNumber2: _0x448b33,
      botNumber: _0x418d06,
      pushname: _0x18668f,
      isMe: _0xcf3cb,
      isOwner: _0x19dd27,
      groupMetadata: _0x245812,
      groupName: _0x385e7b,
      participants: _0x1d5ef9,
      groupAdmins: _0x4d5ff4,
      isBotAdmins: _0x25c8fd,
      isAdmins: _0x9d1a83,
      reply: _0x49f64b,
    }
  ) => {
    try {
      const _0x3d022d = {
        text: '\u2615',
        key: _0x1617ee.key,
      }
      const _0x21b0e5 = { react: _0x3d022d }
      await _0xab4ca7.sendMessage(_0x43489e, _0x21b0e5)
      const _0x54aa77 = [
          {
            title: '',
            rows: [
              {
                title: '1',
                rowId: _0xdca8fe + 'coffe ' + _0x582b63,
                description: 'NEXT  PIC \u27A1️',
              },
            ],
          },
        ],
        _0x2f5b6f = { url: 'https://coffee.alexflipnote.dev/random' }
      const _0x22165c = {
        image: _0x2f5b6f,
        caption: 'Random Coffee',
        footer: config.FOOTER,
        buttonText: '\uD83D\uDD22 Reply below number,',
        sections: _0x54aa77,
        contextInfo: {},
      }
      _0x22165c.contextInfo.externalAdReply = {}
      _0x22165c.contextInfo.externalAdReply.title =
        '\uD83D\uDC68‍\uD83D\uDCBB ＶＡＪＩＲＡ - ＭＤ - Ｖ4 \uD83D\uDC68‍\uD83D\uDCBB'
      _0x22165c.contextInfo.externalAdReply.body = 'ᴀɴ ᴜꜱᴇʀ ʙᴏᴛ ꜰᴏʀ ᴡʜᴀᴛꜱᴀᴘᴘ'
      _0x22165c.contextInfo.externalAdReply.mediaType = 1
      _0x22165c.contextInfo.externalAdReply.sourceUrl = ''
      _0x22165c.contextInfo.externalAdReply.thumbnailUrl =
        'https://telegra.ph/file/b4caa5682d75220623b83.jpg'
      _0x22165c.contextInfo.externalAdReply.renderLargerThumbnail = false
      _0x22165c.contextInfo.externalAdReply.showAdAttribution = true
      const _0x50c86d = _0x22165c,
        _0x4bbe39 = {}
      return (
        (_0x4bbe39.quoted = _0x1617ee),
        await _0xab4ca7.replyList(_0x43489e, _0x50c86d, _0x4bbe39)
      )
    } catch (_0xb23a46) {
      _0x49f64b(N_FOUND)
      _0x2f4dff(_0xb23a46)
    }
  }
)
const _0x4da0ef = {}
_0x4da0ef.pattern = 'wpaper'
_0x4da0ef.react = '\uD83D\uDD16'
_0x4da0ef.desc = 'to download wpaper'
_0x4da0ef.category = 'download'
_0x4da0ef.use = '.wpaper'
_0x4da0ef.filename = __filename
cmd(
  _0x4da0ef,
  async (
    _0x4c543d,
    _0xdf808,
    _0x480849,
    {
      from: _0x698e64,
      l: _0x2f9711,
      quoted: _0x5c12a5,
      prefix: _0x9c2743,
      body: _0x146396,
      isCmd: _0x3d1565,
      command: _0xef2f8a,
      args: _0x281bc3,
      q: _0xe04c95,
      isGroup: _0x452f4e,
      sender: _0x1c7a07,
      senderNumber: _0x4a1327,
      botNumber2: _0x5c0173,
      botNumber: _0xeacb0a,
      pushname: _0x1dd981,
      isMe: _0x419bcc,
      isOwner: _0x3109e5,
      groupMetadata: _0x28c20c,
      groupName: _0x40bea3,
      participants: _0x47fccd,
      groupAdmins: _0x4ec7c7,
      isBotAdmins: _0xc7ad36,
      isAdmins: _0xe2afd8,
      reply: _0x44a7b9,
    }
  ) => {
    try {
      let _0x1c00bb = '*LOADING...*'
      const _0xc158c4 = {
        url: 'https://api.akuari.my.id/search/alphacoders?query=' + _0xe04c95,
      }
      const _0x47afdd = {
        image: _0xc158c4,
        caption: '' + config.cap,
      }
      await _0x4c543d.sendMessage(_0xdf808.chat, _0x47afdd, {
        quoted: _0xdf808,
      })
      await _0x4c543d.sendMessage(
        _0xdf808.chat,
        _0xefc71b,
        { quoted: _0xdf808 }.repeat(5)
      )
      const _0x2a5e9e = {
        url: 'https://api.akuari.my.id/search/alphacoders?query=' + _0xe04c95,
      }
      const _0xefc71b = {
        image: _0x2a5e9e,
        caption: '' + config.cap,
      }
      await _0x4c543d.sendMessage(_0xdf808.chat, _0x47afdd, {
        quoted: _0xdf808,
      }),
        await _0x4c543d.sendMessage(
          _0xdf808.chat,
          _0xefc71b,
          { quoted: _0xdf808 }.repeat(5)
        )
      const _0x2c86cf = {
        text: '\u2705',
        key: _0xdf808.key,
      }
      const _0x36ff1e = { react: _0x2c86cf }
      await _0x4c543d.sendMessage(_0x698e64, _0x36ff1e)
    } catch (_0x5df4cd) {
      _0x44a7b9()
      _0x2f9711(_0x5df4cd)
    }
  }
)
const _0x596816 = {}
_0x596816.pattern = 'ringtone'
_0x596816.react = '\uD83D\uDD16'
_0x596816.desc = 'to download ringtone'
_0x596816.category = 'download'
_0x596816.use = '.ringtone'
_0x596816.filename = __filename
cmd(
  _0x596816,
  async (
    _0x4f5d43,
    _0xebf3bc,
    _0x576986,
    {
      from: _0x5d267b,
      l: _0xfbc2af,
      quoted: _0x5b18d8,
      prefix: _0x340a4e,
      body: _0xa630eb,
      isCmd: _0x4f3d3a,
      command: _0x4c8d69,
      args: _0x51ba3f,
      q: _0x9f6e3a,
      isGroup: _0x1e2269,
      sender: _0x43aedd,
      senderNumber: _0xcf6dfc,
      botNumber2: _0x4c84b4,
      botNumber: _0x26de67,
      pushname: _0x5e10a4,
      isMe: _0x1d6e6e,
      isOwner: _0x10d9ea,
      groupMetadata: _0xebafa4,
      groupName: _0x302b9c,
      participants: _0x8d1380,
      groupAdmins: _0x70cf5d,
      isBotAdmins: _0x177417,
      isAdmins: _0x13302d,
      reply: _0x1853de,
    }
  ) => {
    try {
      if (!_0x9f6e3a) {
        _0x1853de`${Lang.EXAMPLE}\n : ${_0x340a4e + _0x4c8d69} black rover`
      }
      let { ringtone: _0x59d0ab } = require('../lib/scraper'),
        _0x43796e = await _0x59d0ab(_0x9f6e3a),
        _0x2d5884 = _0x43796e[Math.floor(Math.random() * _0x43796e.length)]
      const _0x3f2e6c = { url: _0x2d5884.audio }
      _0x4f5d43.sendMessage(
        _0xebf3bc.chat,
        {
          audio: _0x3f2e6c,
          fileName: _0x2d5884.title + '.mp3',
          mimetype: 'audio/mpeg',
        },
        { quoted: _0xebf3bc }
      )
      const _0x5e50cf = {
        text: '\u2705',
        key: _0xebf3bc.key,
      }
      const _0x5eae50 = { react: _0x5e50cf }
      await _0x4f5d43.sendMessage(_0x5d267b, _0x5eae50)
    } catch (_0x3a0b4a) {
      _0x1853de()
      _0xfbc2af(_0x3a0b4a)
    }
  }
)
const _0x436e26 = {}
_0x436e26.pattern = 'couplepp'
_0x436e26.react = '\uD83D\uDD16'
_0x436e26.desc = 'couple pic download'
_0x436e26.category = 'download'
_0x436e26.use = '.couplepp'
_0x436e26.filename = __filename
cmd(
  _0x436e26,
  async (
    _0x5cb679,
    _0x648f4c,
    _0x1ca848,
    {
      from: _0x1c2450,
      l: _0x5a47cc,
      quoted: _0x2bd095,
      body: _0x5f43be,
      isCmd: _0xc1b2a6,
      command: _0x1f646e,
      args: _0x2b91e5,
      q: _0x1468af,
      isGroup: _0x11f133,
      sender: _0x3ce735,
      senderNumber: _0x12ae6c,
      botNumber2: _0x7b24ce,
      botNumber: _0x526df6,
      pushname: _0x1357b1,
      isMe: _0x56ab5a,
      isOwner: _0x40d25e,
      groupMetadata: _0x464cf9,
      groupName: _0x55f4cd,
      participants: _0x37dcbc,
      groupAdmins: _0x200a31,
      isBotAdmins: _0x4da071,
      isAdmins: _0x1c3293,
      reply: _0x495bfb,
    }
  ) => {
    try {
      const _0x4c3a44 = {
        text: '\uD83D\uDC8F',
        key: _0x648f4c.key,
      }
      const _0xa392f5 = { react: _0x4c3a44 }
      await _0x5cb679.sendMessage(_0x1c2450, _0xa392f5)
      let _0x3220f8 = await fetchJson(
          'https://raw.githubusercontent.com/iamriz7/kopel_/main/kopel.json'
        ),
        _0x182a3f = _0x3220f8[Math.floor(Math.random() * _0x3220f8.length)]
      const _0x6fed01 = { url: _0x182a3f.male }
      const _0x3430ef = {
        image: _0x6fed01,
        caption: 'Couple Male',
      }
      _0x5cb679.sendMessage(_0x648f4c.chat, _0x3430ef, { quoted: _0x648f4c })
      const _0xd09932 = { url: _0x182a3f.female }
      const _0x2911a8 = {
        image: _0xd09932,
        caption: 'Couple Female',
      }
      _0x5cb679.sendMessage(_0x648f4c.chat, _0x2911a8, { quoted: _0x648f4c })
      const _0x2d53ff = {
        text: '\u2705',
        key: _0x648f4c.key,
      }
      const _0x498a40 = { react: _0x2d53ff }
      await _0x5cb679.sendMessage(_0x1c2450, _0x498a40)
    } catch (_0x4424db) {
      _0x495bfb()
      _0x5a47cc(_0x4424db)
    }
  }
)
const _0x1bf7f9 = {}
_0x1bf7f9.pattern = 'fb'
_0x1bf7f9.react = '#️\u20E3'
_0x1bf7f9.alias = ['fbdl', 'facebook']
_0x1bf7f9.desc = desc1
_0x1bf7f9.category = 'download'
_0x1bf7f9.use = '.fb <Fb video link>'
_0x1bf7f9.filename = __filename
cmd(
  _0x1bf7f9,
  async (
    _0x293104,
    _0xea9504,
    _0x5bacfd,
    {
      from: _0x4067a3,
      prefix: _0x32e07b,
      l: _0x5399fb,
      quoted: _0x2e9dea,
      body: _0x930b7,
      isCmd: _0x48d15e,
      command: _0x48dcfa,
      args: _0x418759,
      q: _0x55d7c2,
      isGroup: _0xdeca83,
      sender: _0x396c3b,
      senderNumber: _0x6121cf,
      botNumber2: _0x28a36b,
      botNumber: _0x586aa3,
      pushname: _0x3457a2,
      isMe: _0xfcff81,
      isOwner: _0x4ef5c7,
      groupMetadata: _0x208a7d,
      groupName: _0x3e7fdb,
      participants: _0x54d919,
      groupAdmins: _0x1bef6a,
      isBotAdmins: _0x3e8501,
      isAdmins: _0x5e84a0,
      reply: _0x1bc21d,
    }
  ) => {
    try {
      if (!fbreg(_0x55d7c2)) {
        return await _0x1bc21d(urlneed2)
      }
      let _0x57b7ed = await fbDownloader(_0x55d7c2),
        _0x1ccd6d = _0x57b7ed.download,
        _0x4b90a0 =
          '[\uD83D\uDC68‍\uD83D\uDCBB ＶＡＪＩＲＡ - ＭＤ - Ｖ4 \uD83D\uDC68‍\uD83D\uDCBB]\n\n   *FB DOWNLOADER*\n\n*\uD83D\uDCCE Url:* ' +
          _0x55d7c2
      if (!_0x1ccd6d[0]) {
        return await _0x1bc21d(N_FOUND)
      }
      var _0x30631e
      if (!_0x1ccd6d[1]) {
        var _0x30631e = [
          {
            title: '',
            rows: [
              {
                title: '1',
                rowId: _0x32e07b + 'dvideo ' + _0x1ccd6d[0].url,
                description: _0x1ccd6d[0].quality + ' VIDEO',
              },
            ],
          },
        ]
      } else {
        var _0x30631e = [
          {
            title: '',
            rows: [
              {
                title: '1',
                rowId: _0x32e07b + 'dvideo ' + _0x1ccd6d[0].url,
                description: _0x1ccd6d[0].quality + ' VIDEO',
              },
              {
                title: '2',
                rowId: _0x32e07b + 'dvideo ' + _0x1ccd6d[1].url,
                description: _0x1ccd6d[1].quality + ' VIDEO',
              },
            ],
          },
        ]
      }
      const _0x547086 = {
        url: 'https://media.idownloadblog.com/wp-content/uploads/2022/04/Download-Facebook-data.jpg',
      }
      const _0x334c79 = {
        image: _0x547086,
        text: _0x4b90a0,
        footer: config.FOOTER,
        buttonText: '\uD83D\uDD22 Reply below number,',
        sections: _0x30631e,
        contextInfo: {},
      }
      _0x334c79.contextInfo.externalAdReply = {}
      _0x334c79.contextInfo.externalAdReply.title =
        '\uD83D\uDC68‍\uD83D\uDCBB ＶＡＪＩＲＡ - ＭＤ - Ｖ4 \uD83D\uDC68‍\uD83D\uDCBB'
      _0x334c79.contextInfo.externalAdReply.body = 'ᴀɴ ᴜꜱᴇʀ ʙᴏᴛ ꜰᴏʀ ᴡʜᴀᴛꜱᴀᴘᴘ'
      _0x334c79.contextInfo.externalAdReply.mediaType = 1
      _0x334c79.contextInfo.externalAdReply.sourceUrl = ''
      _0x334c79.contextInfo.externalAdReply.renderLargerThumbnail = false
      _0x334c79.contextInfo.externalAdReply.showAdAttribution = true
      const _0x379302 = _0x334c79,
        _0x28a00f = {}
      return (
        (_0x28a00f.quoted = _0xea9504),
        await _0x293104.replyList(_0x4067a3, _0x379302, _0x28a00f)
      )
    } catch (_0x1f589c) {
      _0x1bc21d(N_FOUND)
      _0x5399fb(_0x1f589c)
    }
  }
)
const _0x22215c = {}
_0x22215c.pattern = 'dvideo'
_0x22215c.dontAddCommandList = true
_0x22215c.filename = __filename
cmd(
  _0x22215c,
  async (
    _0x4a644d,
    _0xff90e4,
    _0x3a616c,
    {
      from: _0x4619fa,
      l: _0x249884,
      quoted: _0x3ee2a8,
      body: _0x4592a3,
      isCmd: _0x3010d1,
      command: _0x4b5dbf,
      args: _0x341ab5,
      q: _0x254291,
      isGroup: _0x4af248,
      sender: _0x242b6e,
      senderNumber: _0x3c84ac,
      botNumber2: _0x3f7529,
      botNumber: _0x3529a4,
      pushname: _0x170a86,
      isMe: _0x3b6317,
      isOwner: _0x44cf0b,
      groupMetadata: _0x1a3ca1,
      groupName: _0x34bd1d,
      participants: _0x233fcc,
      groupAdmins: _0x15466a,
      isBotAdmins: _0x243643,
      isAdmins: _0x20b5b3,
      reply: _0x179a22,
    }
  ) => {
    try {
      const _0x45f289 = {
        text: '\uD83D\uDCE5',
        key: _0xff90e4.key,
      }
      const _0x330d8a = { react: _0x45f289 }
      await _0x4a644d.sendMessage(_0x4619fa, _0x330d8a)
      const _0x51eb03 = { url: _0x254291 }
      const _0x287869 = {
        video: _0x51eb03,
        caption: config.FOOTER,
      }
      const _0x2fedb5 = { quoted: _0xff90e4 }
      await _0x4a644d.sendMessage(_0x4619fa, _0x287869, _0x2fedb5)
      const _0x5cb160 = {
        text: '\u2714',
        key: _0xff90e4.key,
      }
      const _0x4bcb83 = { react: _0x5cb160 }
      await _0x4a644d.sendMessage(_0x4619fa, _0x4bcb83)
    } catch (_0x273f2e) {
      _0x179a22('*ERROR !!*')
      _0x249884(_0x273f2e)
    }
  }
)
