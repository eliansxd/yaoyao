import YaoYao from "../YaoYao";
import path from "path";
import fs from "fs";

export const EventHandler = async (client: YaoYao) => {
    let count = 0;
    const categoryPath = path.join(__dirname, "..", "events");
    const categories = fs.readdirSync(categoryPath);

    for (const category of categories) {
        const files = fs
            .readdirSync(path.join(categoryPath, category))
            .filter((f) => f.endsWith(".ts") || f.endsWith(".js"));

        for (const file of files) {
            const fullPath = path.join(categoryPath, category, file);
            delete require.cache[fullPath];

            const { event } = require(fullPath);
            if (!event) continue;

            client.removeAllListeners(event.name);

            if (event.once) {
                client.once(event.name, event.execute.bind(null, client));
            } else {
                client.on(event.name, event.execute.bind(null, client));
            }

            count++;
        }
    }

    console.log(`Loaded ${count} events in total.`);
};
