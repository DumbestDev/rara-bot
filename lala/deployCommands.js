require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { REST, Routes } = require('discord.js');
const errorHandler = require('../helpers/errorHandler');

const token = process.env.BOT_TOKEN;
const guildId = process.env.GUILD_ID;
const clientId = process.env.CLIENT_ID;

//* Setting up commands definitions and their execution methods

const commands = [];
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);

        if('data' in command && 'execute' in command) 
            commands.push(command.data.toJSON());
        else
            errorHandler(`Command (${filePath}) is missing properties. (definition/implementation)`, "deploying commands");
    }
}

//* Uploading changes to the client/guild

const rest = new REST().setToken(token);

(async () => {
    try {
        console.log(`Lala started refreshing ${commands.length} application (/) commands.`);

        //* The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );

        console.log(`Lala successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        errorHandler(error, "deploying commands (rest)");
    }
})();