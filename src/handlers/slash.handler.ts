import YaoYao from "../YaoYao";
import path from "path";
import fs from "fs";

export const SlashHandler = async (client: YaoYao) => {
    let count = 0;
    const categoryPath = path.join(__dirname, "..", "slash");
    const categories = fs.readdirSync(categoryPath);

    for (const category of categories) {
        const files = fs
            .readdirSync(path.join(categoryPath, category))
            .filter((f) => f.endsWith(".ts") || f.endsWith(".js"));

        for (const file of files) {
            const fullPath = path.join(categoryPath, category, file);
            delete require.cache[fullPath];

            const { slash: cmd } = require(fullPath);
            if (!cmd) continue;
            if (cmd.subCommand) {
                client.subCommand.set(cmd.subCommand, cmd);
                continue;
            }

            const old = client.slash.get(cmd.data.name);

            if (old) {
                old.execute = cmd.execute;
            } else {
                client.slash.set(cmd.data.name, cmd);
            }

            count++;
        }
    }

    console.log(`Loaded ${count} slash commands in total.`);
};
