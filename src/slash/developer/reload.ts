import { SlashHandler, EventHandler } from "../../handlers";
import { SlashCommandBuilder } from "discord.js";
import { Slash } from "../../types";

export const slash: Slash = {
    data: new SlashCommandBuilder()
        .setName("reload")
        .setDescription("Reload slash command and event execute."),
    async execute(client, interaction) {
        if (!client.application?.owner) {
            await client.application?.fetch();
        }
        const owner = client.application?.owner;
        if (interaction.member?.user.id != owner?.id) return;
        await SlashHandler(client);
        await EventHandler(client);
        interaction.reply(`Reloaded!`);
    },
};
