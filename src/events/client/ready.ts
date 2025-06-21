import BotEvent from "../../modules/event";
import { ActivityType } from "discord.js";
import YaoYao from "../../YaoYao";

export default new BotEvent({
    name: "ready",
    async run(client) {
        // Logging and set status
        console.log(`${client.user.tag} is ready!`);
        client.user.setPresence({
            activities: [{ name: "linh~", type: ActivityType.Watching }],
            status: "idle",
        });

        // Put application commands
        const yaoyao = client as YaoYao;
        const slashCommands = [...yaoyao.slashCommands.values()];
        await client.application.commands.set(
            slashCommands.map((slash) => slash.data)
        );
    },
});
