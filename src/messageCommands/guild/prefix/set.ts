import { MessageCommand } from "../../../modules/command";
import { updatePrefix } from "../../../modules/guildPrefix";
import { hasPermissions } from "../../../modules/checks/access";
import { PermissionFlagsBits } from "discord.js";

export default new MessageCommand({
    name: "prefix",
    aliases: ["set_prefix"],
    validate(message, prefix) {
        if (prefix) return true;
        message.reply("Vui lòng nhập prefix!");
        return false;
    },
    checks: [hasPermissions([PermissionFlagsBits.ManageChannels])],
    async run(message, prefix) {
        const { guildId } = message;
        const setting = await updatePrefix(guildId, prefix);
        return message.reply(`Prefix của server bạn hiện lại là: ${setting.prefix}`);
    },
});
