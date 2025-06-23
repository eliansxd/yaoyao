import { MessageCommand } from "../../../modules/command";
import { toggleSnipe } from "../../../modules/snipeMessage";

export default new MessageCommand({
    name: "toggle_snipe",
    async run(message) {
        const { guildId } = message;
        const toggle = await toggleSnipe(guildId!);
        return message.reply(`Đã ${toggle ? "bật" : "tắt"} snipe cho server của bạn.`);
    },
});
