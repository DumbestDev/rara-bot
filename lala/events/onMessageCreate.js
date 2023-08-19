const { Client } = require('discord.js');
const memberUtil = require('../utility/memberUtilities');
const dataHandler = require('../utility/memberDataHandler');
const { getKoboldAIReply, checkResponseProbability } = require('../utility/aiUtilities');

const BOT_ID = dataHandler.getIDFromTag('Lala Racist#1942', true)
const SAI_ID = dataHandler.getIDFromTag('saibandija');
const GOHU_ID = dataHandler.getIDFromTag('gohux');

module.exports = (client = new Client()) => //* Default value added just to have intellisense active
{
    /* client.on("messageCreate", async(message) => {
        if(memberUtil.anybodySays(message, 'blm', 'black lives matter'))
            message.reply("Nigger lover spotted. Fuck off from this server.");

        if(memberUtil.userSays(message, SAI_ID, 'loli', 'niña', 'lolis', 'niñas', 'cunny'))
            message.reply("Pedro");

        if(memberUtil.userSays(message, GOHU_ID, 'comprar', 'compre', 'comprare'))
            message.reply("Consoomer");
    }); */

    client.on("messageCreate", async(message) => {
        if(message.author.id == BOT_ID) return;

        if(checkResponseProbability(message.content)) {
            try{
                const response = await getKoboldAIReply(message.author.id);
                let reply = response?.results[0]?.text;
                reply = reply.replace("Sai:", "")
                reply = reply.replace("Gohux:", "")
                reply = reply.replace("Lala:", "")
                console.log(reply);
                if(reply && reply.replaceAll("\n", "") != '') await message.reply(reply);
            } catch(err) {
                console.log(err);
            }
        }
    })
}