const { Client } = require('discord.js');
const { learnMemberNames } = require('../utility/userUtilities');

module.exports = (client = new Client()) => //* Default value added just to have intellisense active
{
    client.on("ready", () => {
        console.log("Lala has logged in.");
        learnMemberNames(client);
    })
}

