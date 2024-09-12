const axios = require('axios');
const { cmd } = require('../command');

cmd({
    pattern: "joke",
    desc: "😂 Get a random joke",
    react: "😗",
    category: "fun",
    filename: __filename
},
async (conn, mek, m, { from, q, reply }) => {
    try {
        const url = 'https://official-joke-api.appspot.com/random_joke';  // API for random jokes
        const response = await axios.get(url);
        const joke = response.data;

        const jokeMessage = `
😂 *Here's a random joke for you!* 😂

*${joke.setup}*

${joke.punchline} 😄

> ❯❯ Powerd By Thenu..🚽`;

        return reply(jokeMessage);
    } catch (e) {
        console.log(e);
        return reply("⚠️ cloud'т fuetch a foke right now. ρℓєαѕє тяу αgαιη ℓαтєя.");
    }
});
