import YaoYao from "../YaoYao";
import path from "path";
import fs from "fs";

export const EventHandler = async (client: YaoYao) => {
    let count = 0;
    const categories = fs.readdirSync("./src/events");

    for (const category of categories) {
        const files = fs
            .readdirSync(`./src/events/${category}`)
            .filter((f) => f.endsWith(".ts"));

        for (const file of files) {
            const fullPath = path.resolve(`./src/events/${category}/${file}`);
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
