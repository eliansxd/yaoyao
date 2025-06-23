import YaoYao from "../../../YaoYao";
import { isEnableChannel, isEnableGuild } from "../../../modules/snipeMessage";
import { MessageCommand } from "../../../modules/command";

export default new MessageCommand({
    name: "snipe",
    async run(message) {
        const { guildId, channelId } = message;
        const isEnable =
            (await isEnableChannel(guildId!, channelId)) && (await isEnableGuild(guildId!));

        if (isEnable) {
            const yaoyao = message.client as YaoYao;
            const snipeMessage = yaoyao.snipeMessages.get(message.channelId);

            if (!snipeMessage) {
                return message.reply(`Không có tin nhắn nào đã xóa trước đó.`);
            }

            return message.reply(snipeMessage.content);
        }

        message.reply(`Kênh hiện tại hoặc server không bật chức năng snipe.`);
    },
});
