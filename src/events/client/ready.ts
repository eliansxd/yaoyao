import { ActivityType } from "discord.js";
import { Event } from "../../types";

export const event: Event = {
    name: "ready",
    execute: async (client) => {
        // Logging and set status
        console.log(`${client.user?.tag} is ready!`);
        client.user?.setPresence({
            activities: [{ name: "linh~", type: ActivityType.Watching }],
            status: "idle",
        });

        // Put application commands
        const slashCommands = [...client.slash.values()].map(
            (slash) => slash.data
        );
        await client.application?.commands.set(slashCommands);
    },
};
