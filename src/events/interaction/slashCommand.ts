import { ChatInputCommandInteraction } from "discord.js";
import { Event } from "../../types";

export const event: Event = {
    name: "interactionCreate",
    execute: async (client, interaction: ChatInputCommandInteraction) => {
        if (!interaction.isChatInputCommand()) return;
        try {
            const commandName = interaction.commandName;
            const slash = client.slash.get(commandName);
            if (!slash) return;

            const runCommand = async () => {
                try {
                    if (slash.execute) {
                        await slash.execute(client, interaction);
                    } else {
                        const subCommand = interaction.options.getSubcommand();
                        if (!subCommand) return;
                        const subCmd = client.subCommand.get(
                            `${commandName}.${subCommand}`
                        );
                        if (!subCmd) return;
                        await subCmd.execute(client, interaction);
                    }
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
