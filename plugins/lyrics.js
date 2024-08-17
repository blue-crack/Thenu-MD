const config = require('../config')
const {cmd , commands} = require('../command')
const fg = require('api-dylux')
const lyrics = require('tkaraoke-lyrics-searcher')
cmd({
    pattern: "lyrics",
    desc: "find song lyrics.",
    category: "find",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
  const searchLyricsBySong = async (songName, artist) => {
  let song = tryToMatchSongWithMetadata(
    await findSongs(songName, MODE_SEARCH_BY_SONG_NAME),
    songName,
    artist,
    MODE_SEARCH_BY_SONG_NAME,
  );
  return song ? await findSongLyrics(song) : null;
};

const searchLyricsByLyrics = async (lyrics, artist) => {
  let song = tryToMatchSongWithMetadata(
    await findSongs(lyrics, MODE_SEARCH_BY_LYRICS),
    lyrics,
    artist,
    MODE_SEARCH_BY_LYRICS,
  );
  return song ? await findSongLyrics(song) : null;
};

const tryToMatchSongWithMetadata = (
  songs,
  songNameOrLyrics,
  artist,
  mode = MODE_SEARCH_BY_SONG_NAME,
) => {
  return songs.find((song) => {
    let songNameIsMatched =
      !!songNameOrLyrics &&
      song.title.toLowerCase() == songNameOrLyrics.toLowerCase();

    let lyricsIsMatched =
      !!songNameOrLyrics &&
      song.lyrics.toLowerCase().indexOf(songNameOrLyrics.toLowerCase()) !== -1;

    let artistIsSinger =
      !!artist &&
      song.singers.some((singer) => {
        if (Array.isArray(artist)) {
          return artist.some(
            (artistName) =>
              singer.toLowerCase() == artistName.toLowerCase() ||
              singer.toLowerCase().indexOf(artistName.toLowerCase()) !== -1
          );
        } else {
          return (
            singer.toLowerCase() == artist.toLowerCase() ||
            singer.toLowerCase().indexOf(artist.toLowerCase()) !== -1
          );
        }
      });

    let artistIsWriter =
      !!artist &&
      (Array.isArray(artist)
        ? artist.some(
          (artistName) =>
            song.writer.toLowerCase() == artistName.toLowerCase()
        )
        : song.writer.toLowerCase() == artist.toLowerCase());

    switch (mode) {
      case MODE_SEARCH_BY_SONG_NAME:
        return (
          songNameIsMatched && (!artist || artistIsSinger || artistIsWriter)
        );
      case MODE_SEARCH_BY_LYRICS:
        return lyricsIsMatched && (!artist || artistIsSinger || artistIsWriter);
    }
  });
};

const findSongLyrics = async (song) => {
  let encodedURL = rootURL + song.songUrl;
  let resp = await axios.get(encodedURL);

  let $ = cheerio.load(resp.data);
  let title = $(".h3-title-song").text().trim();
  let author = $("div .div-author span").text().trim();
  let lyrics = $("div .div-content-lyric").html();

  return (
    title +
    "\n" +
    author +
    "\n\n" +
    lyrics.replace(/<br>/g, "\n").trim() +
    "\n\n" +
    SOURCE
  );
};

const findSongs = async (songName, t) => {
  let encodedURL = rootURL + `/s.tim?q=${encodeURIComponent(songName)}&t=${t}`;
  let resp = await axios.get(encodedURL);

  let songs = [];
  let $ = cheerio.load(resp.data);
  $("div .div-result-item").each((index, element) => {
    let title = $(element).find(".h4-title-song a").text();
    let songUrl = $(element).find(".h4-title-song a").prop("href");
    let writerUrl = $(element).find(".p-author a").prop("href");
    let writer = $(element).find(".p-author a").text();
    let lyrics = $(element).find(".p-lyrics").text();

    let singers = [];
    $(element)
      .find(".p-singer a")
      .each((index, element) => {
        singers.push({
          name: $(element).text(),
          url: $(element).prop("href"),
        });
      });

    songs.push({
      title,
      songUrl,
      writer,
      writerUrl,
      lyrics,
      singers: singers.map((singer) => singer.name),
    });
  });

  return songs;
};

exports.searchLyricsBySong = searchLyricsBySong;
exports.searchLyricsByLyrics = searchLyricsByLyrics;
