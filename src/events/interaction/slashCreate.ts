import { ChatInputCommandInteraction } from "discord.js";
import { Event } from "../../types";

export const event: Event = {
    name: "interactionCreate",
    execute: async (client, interaction: ChatInputCommandInteraction) => {
        if (!interaction.isChatInputCommand()) return;
        try {
            const slash = client.slash.get(interaction.commandName);
            if (!slash) return;

            const runCommand = async () => {
                try {
                    await slash.execute(client, interaction);
                } catch (err) {
                    console.error(err);
                }
            };
            runCommand();
        } catch (err) {
            console.error(err);
        }
    },
};
