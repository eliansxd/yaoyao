import { MessageCommand } from "../../../modules/command";
import { toggleChannelSnipe, toggleGuildSnipe } from "../../../modules/snipeMessage";

export default new MessageCommand({
    name: "toggle_snipe",
    async run(message, input) {
        const { guildId, channelId } = message;
        if (!input) {
            const currentChannel = message.channel;
            const channelToggle = await toggleChannelSnipe(guildId!, channelId);
            return message.reply(
                `Đã ${channelToggle ? "bật" : "tắt"} snipe cho kênh ${currentChannel.toString()}`
            );
        }

        if (["guild", "all"].includes(input)) {
            const guildToggle = await toggleGuildSnipe(guildId!);
            return message.reply(`Đã ${guildToggle ? "bật" : "tắt"} snipe trong server của bạn.`);
        }

        const channelInput = input.replace(/[<#>]/g, "");
        const targetChannel = await message.guild?.channels.fetch(channelInput).catch(() => null);

        if (!targetChannel || !targetChannel.isTextBased()) {
            return message.reply(
                `Kênh ${targetChannel?.toString()} không tồn tại hoặc không phải kênh văn bản.`
            );
        }

        const channelToggle = await toggleChannelSnipe(guildId!, targetChannel.id);
        return message.reply(
            `Đã ${channelToggle ? "bật" : "tắt"} snipe cho kênh ${targetChannel.toString()}`
        );
    },
});
