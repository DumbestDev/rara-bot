const { Client } = require('discord.js');
const errorHandler = require('../../helpers/errorHandler');

module.exports = (client = new Client()) => //* Default value added just to have intellisense active
{
    client.on("interactionCreate", async (interaction) => {
        if(!interaction.isChatInputCommand()) return;
        
        const command = interaction.client.commands.get(interaction.commandName);

        if(!command) {
            console.log(`A command (${interaction.commmandName}) was sent but it doesn't exists.`);
            return;
        }
        
        try 
        {
            await command.execute(interaction);
        }
        catch (error)
        {
            errorHandler(error, "executing command");
            if(interaction.replied || interaction.deferred) 
                await interaction.followUp({
                    content: 'There was an error while attempting to run this command.',
                    ephemeral: true
                })
            else
                await interaction.reply({
                    content: 'There was an error while attempting to run this command.',
                    ephemeral: true
                })
        } 
    })
}