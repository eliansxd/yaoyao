import { MessageCommand } from "../../../modules/command";
import { toggleSnipe } from "../../../modules/snipeMessage";
import { checkPermissions } from "../../../modules/checks/access";
import { PermissionFlagsBits } from "discord.js";

export default new MessageCommand({
    name: "toggle_snipe",
    checks: [checkPermissions([PermissionFlagsBits.ManageChannels])],
    async run(message) {
        const { guildId } = message;
        const toggle = await toggleSnipe(guildId);
        return message.reply(`Đã ${toggle ? "bật" : "tắt"} snipe cho server của bạn.`);
    },
});
