import YaoYao from "../../YaoYao";
import BotEvent from "../../modules/event";

export default new BotEvent({
    name: "messageCreate",
    async run(message) {
        if (!message.inGuild() || message.author?.bot) return;
        const prefix = process.env.PREFIX as string;
        const content = message.content.trim();
        if (!content.startsWith(prefix)) return;
        const [commandName, ...args] = content.slice(prefix.length).trim().split(/\s+/g);
        const yaoyao = message.client as YaoYao;
        const command = yaoyao.messageCommands.get(commandName);
        if (!command) return;
        try {
            await command.run(message, ...args);
        } catch (error) {
            console.error(error);
        }
    },
});
