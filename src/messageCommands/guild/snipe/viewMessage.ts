import YaoYao from "../../../YaoYao";
import { isEnableSnipe } from "../../../modules/snipeMessage";
import { MessageCommand } from "../../../modules/command";

export default new MessageCommand({
    name: "snipe",
    async run(message) {
        const { guildId } = message;
        if (await isEnableSnipe(guildId!)) {
            const yaoyao = message.client as YaoYao;
            const snipeMessage = yaoyao.snipeMessages.get(message.channelId);

            if (!snipeMessage) {
                return message.reply(`Không có tin nhắn nào đã xóa trước đó.`);
            }

            return message.reply(snipeMessage.content);
        }

        message.reply(`Server không bật chức năng snipe.`);
    },
});
