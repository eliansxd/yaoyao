import BotEvent from "../../modules/event";
import { ActivityType, User, Team } from "discord.js";
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
        await client.application.commands.set(slashCommands.map((slash) => slash.data));

        // Get owners
        if (!client.application.owner) await client.application.fetch();
        const applicationOwner = client.application.owner;
        if (applicationOwner instanceof Team) {
            for (const member of applicationOwner.members.values()) {
                yaoyao.owners.push(member.user);
            }
        } else if (applicationOwner instanceof User) {
            yaoyao.owners.push(applicationOwner);
        }
    },
});
