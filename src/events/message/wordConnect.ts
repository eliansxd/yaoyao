import { WordConnectError } from "../../modules/exceptions/base";
import { getStats, playerTurnHandle } from "../../modules/database/wordConnect";
import BotEvent from "../../modules/event";

export default new BotEvent({
    name: "messageCreate",
    async run(message) {
        if (!message.inGuild() || message.author?.bot) return;

        const channelId = message.channelId;
        const stats = await getStats(channelId);

        if (!stats) return;
        if (channelId !== stats.channelId) return;
        try {
            await playerTurnHandle({
                channelId,
                authorId: message.author.id,
                content: message.content,
                stats,
            });
            await message.react(`✅`);
        } catch (error) {
            await message.react("❌");
            if (error instanceof WordConnectError) {
                return message
                    .reply(error.message)
                    .then((m) => setTimeout(() => m.delete(), 15_000));
            } else {
                console.error(error);
            }
        }
    },
});
