import { readdirSync, lstatSync } from "fs";
import BotEvent from "../modules/event";
import path from "path";

import YaoYao from "../YaoYao";

export default async function loadEvents(client: YaoYao) {
    async function loadEvent(root: string, item: string): Promise<any> {
        const newRoot = path.join(root, item);
        if (lstatSync(newRoot).isDirectory()) {
            const subItems = readdirSync(newRoot);
            for (const subItem of subItems) {
                await loadEvent(newRoot, subItem);
            }
            return;
        }

        if (!item.match(/\.(js|ts)$/)) return;
        const clientEvent = (await import(newRoot)).default as BotEvent<any>;
        if (clientEvent.disabled) return;
        if (clientEvent.once) client.once(clientEvent.name, clientEvent.run);
        else client.on(clientEvent.name, clientEvent.run);
    }

    const eventsPath = path.join(__dirname, "..", "events");
    const topItems = readdirSync(eventsPath);
    for (const item of topItems) {
        await loadEvent(eventsPath, item);
    }
}
