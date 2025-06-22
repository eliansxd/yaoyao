import YaoYao from "../../YaoYao";
import BotEvent from "../../modules/event";
import { isEnableChannel, isEnableGuild } from "../../modules/snipeMessage";

export default new BotEvent({
    name: "messageDelete",
    async run(message) {
        if (!message.inGuild() || message.author?.bot) return;
        const { guildId, channelId } = message;
        const yaoyao = message.client as YaoYao;

        const isEnable =
            (await isEnableGuild(guildId)) && (await isEnableChannel(guildId, channelId));
        if (!isEnable) {
            if (!isEnable) {
                if (yaoyao.snipeMessages.has(channelId)) {
                    yaoyao.snipeMessages.delete(channelId);
                }
                return;
            }
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
