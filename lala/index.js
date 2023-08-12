const { Client, GatewayIntentBits } = require('discord.js');
const readEvents = require('./readEvents');

const intents = [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
]

const client = new Client({ intents, fetchAllMembers: true });
client.login(process.env.BOT_TOKEN);

readEvents(client);