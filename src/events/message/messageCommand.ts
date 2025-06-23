import { UserError } from "../../modules/exceptions/base";
import YaoYao from "../../YaoYao";
import BotEvent from "../../modules/event";
import { getPrefixSetting } from "../../modules/database/guildPrefix";

export default new BotEvent({
    name: "messageCreate",
    async run(message) {
        if (!message.inGuild() || message.author?.bot) return;

        const prefixSetting = await getPrefixSetting(message.guildId);
        const prefix = prefixSetting?.prefix ?? process.env.PREFIX ?? "s!";
        const content = message.content.trim();

        if (!content.startsWith(prefix)) return;

        const [commandName, ...args] = content.slice(prefix.length).trim().split(/\s+/g);

        const yaoyao = message.client as YaoYao;
        const command = yaoyao.messageCommands.get(commandName);

        if (!command) return;

        for (const check of command.checks) {
            try {
                const isOk = await check(message);
                if (!isOk) return;
            } catch (err) {
                if (err instanceof UserError) return message.reply(err.message);
            }
        }

        if (command.validate) {
            const output = await command.validate(message, ...args);
            if (!output) return;
        }

        try {
            await command.run(message, ...args);
        } catch (error) {
            console.error(error);
        }
    },
});
