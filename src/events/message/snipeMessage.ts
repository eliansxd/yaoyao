import YaoYao from "../../YaoYao";
import BotEvent from "../../modules/event";
import { isEnableSnipe } from "../../modules/snipeMessage";

export default new BotEvent({
    name: "messageDelete",
    async run(message) {
        if (!message.inGuild() || message.author?.bot) return;
        const { guildId, channelId } = message;
        const yaoyao = message.client as YaoYao;

        if (!(await isEnableSnipe(guildId))) {
            if (yaoyao.snipeMessages.has(channelId)) {
                yaoyao.snipeMessages.delete(channelId);
            }
            return;
        }

        if (message.partial) {
            try {
                const newMessage = await message.fetch();
                yaoyao.snipeMessages.set(message.channelId, newMessage);
                return;
            } catch (error) {
                console.error(error);
                return;
            }
        }

        yaoyao.snipeMessages.set(message.channelId, message);
    },
});
