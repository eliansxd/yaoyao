import YaoYao from "../YaoYao";
import fs from "fs";

export const SlashHandler = async (client: YaoYao) => {
    let count = 0;
    const categories = fs.readdirSync("./src/slash");

    for (const category of categories) {
        const files = fs
            .readdirSync(`./src/slash/${category}`)
            .filter((f) => f.endsWith(".ts"));

        for (const file of files) {
            const { slash: cmd } = await import(`../slash/${category}/${file}`);
            if (!cmd) continue;
            client.slash.set(cmd.data.name, cmd);
            count++;
        }
    }

    console.log(`Loaded ${count} slash commands in total.`);
};
