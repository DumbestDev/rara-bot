const { Interaction, SlashCommandBuilder } = require("discord.js");
 

module.exports = {
    data: new SlashCommandBuilder()
        .setName('asdasd')
        .setDescription('Make Lala say "asdasd".'),
    
    /**
     * @param {Interaction} interaction the interaction that triggered the command
     */
    async execute(interaction) {
        await interaction.reply('asdasd');
    }
}


