import { SlashCommand } from "../modules/command";
import { readdirSync, lstatSync } from "fs";
import path from "path";

import YaoYao from "../YaoYao";

export default async function loadCommands(client: YaoYao) {
    async function loadCommand(root: string, item: string): Promise<any> {
        const newRoot = path.join(root, item);
        if (lstatSync(newRoot).isDirectory()) {
            const subItems = readdirSync(newRoot);
            for (const subItem of subItems) {
                await loadCommand(newRoot, subItem);
            }
            return;
        }

        if (!item.match(/\.(js|ts)$/)) return;
        const command = (await import(newRoot)).default as SlashCommand;
        if (command instanceof SlashCommand) {
            return client.slashCommands.set(command.data.name, command);
        } else {
            // Message commands... later
        }
    }

    for (const folder of ["slashCommands", "messageCommands"]) {
        const commandsPath = path.join(__dirname, "..", folder);
        const topItems = readdirSync(commandsPath);
        for (const item of topItems) {
            await loadCommand(commandsPath, item);
        }
    }
}
