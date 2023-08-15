const { Client } = require('discord.js');
const { learnMemberNames } = require('../utility/memberUtilities');
const { setApiOfflineState } = require('../utility/userUtilities.js');

module.exports = (client = new Client()) => //* Default value added just to have intellisense active
{
    client.on("ready", () => {
        console.log("Lala has logged in.");
        setApiOfflineState(client);// TODO: Check if API is working and use setApiOnlineState (or offline) based on that
        learnMemberNames(client);
    })
}

