const { Interaction, SlashCommandBuilder } = require("discord.js");
 

module.exports = {
    data: new SlashCommandBuilder()
        .setName('nword')
        .setDescription('Make Lala say the n-word.'),
    
    /**
     * @param {Interaction} interaction the interaction that triggered the command
     */
    async execute(interaction) {
        await interaction.reply('Nigger');
    }
}


