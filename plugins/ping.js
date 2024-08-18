const = require('../lib')
cmd({
        pattern: "ping",
        desc: "To check ping",
        category: "general",
        filename: __filename,
    },
    async(Void, citel) => {
        var inital = new Date().getTime();
        const { key } = await Void.sendMessage(citel.chat, {text: '```Ping!!!```'});
        var final = new Date().getTime();
       // await sleep(1000)
       return await Void.sendMessage(citel.chat, {text: '*Pong*\n *' + (final - inital) + ' ms* ', edit: key});
   
    }catch(e){
  console.log(e)
  reply(`${e}`)
}
})
