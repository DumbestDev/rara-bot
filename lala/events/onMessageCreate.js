const { Client } = require('discord.js');
const userUtil = require('../utility/userUtilities');
const dataHandler = require('../utility/dataHandler');

const SAI_ID = dataHandler.getIDFromTag('saibandija');
const GOHU_ID = dataHandler.getIDFromTag('gohux');

module.exports = (client = new Client()) => //* Default value added just to have intellisense active
{
    client.on("messageCreate", async(message) => {
        if(userUtil.anybodySays(message, 'blm', 'black lives matter'))
            message.reply("Nigger lover spotted. Fuck off from this server.");

        if(userUtil.userSays(message, SAI_ID, 'loli', 'niña', 'lolis', 'niñas', 'cunny'))
            message.reply("Pedro");

        if(userUtil.userSays(message, GOHU_ID, 'comprar', 'compre', 'comprare'))
            message.reply("Consoomer");
    });
}