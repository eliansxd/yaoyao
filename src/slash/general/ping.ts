import { SlashCommandBuilder } from "discord.js";
import { Slash } from "../../types";

export const slash: Slash = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Xem độ trễ của bot."),

    async execute(_client, interaction) {
        await interaction.reply("🏓 Pong!");
        const latency = Date.now() - interaction.createdTimestamp;
        await interaction.editReply(`🏓 Pong! \`${latency}ms\``);
    },
};
