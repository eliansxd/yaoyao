import { SlashCommandBuilder } from "discord.js";
import { Slash } from "../../types";

export const slash: Slash = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with Pong!"),
    async execute(client, interaction) {
        await interaction.reply("Pong!");
    },
};
