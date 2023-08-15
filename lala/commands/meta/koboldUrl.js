const { Interaction, SlashCommandBuilder } = require("discord.js");
const aiDataHandler = require("../../utility/aiDataHandler");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('koboldurl')
        .setDescription("Get or set the kobold API url for Lala's AI")
        .addStringOption(option => 
            option.setName("koboldurl")
            .setDescription("You can add an url to set or replace the previous one.")
            .setRequired(false)),
    
    /**
     * @param {Interaction} interaction the interaction that triggered the command
     */
    async execute(interaction) {
        const url = interaction.options.getString('koboldurl')
        const currentUrl = aiDataHandler.getKoboldUrl();
        
        if(url) {
            aiDataHandler.setKoboldUrl(url);
            await interaction.reply({ content: "Finally. Don't take this fucking long next time.", ephemeral: true });
        } else {
            if(currentUrl)
                await interaction.reply({ content: `This is my current url: ${currentUrl}`, ephemeral: true });
            else 
                await interaction.reply({ content: `I don't have an url yet, dumbass.`, ephemeral: true });
        }
    }
}


