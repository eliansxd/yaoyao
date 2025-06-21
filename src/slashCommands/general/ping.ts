import { SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../../modules/command";

const data = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Xem độ trễ của bot.");

export default new SlashCommand({
    data,
    async run(interaction) {
        await interaction.reply("🏓 Pong!");
        const latency = Date.now() - interaction.createdTimestamp;
        await interaction.editReply(`🏓 Pong! \`${latency}ms\``);
    },
});
