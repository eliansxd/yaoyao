import { getStats, removeStats } from "../../../modules/wordConnect";
import { ChannelType, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../../../modules/command";

const data = new SlashCommandBuilder()
    .setName("wordconnect_remove")
    .setDescription("Xóa bỏ nối từ Tiếng Việt.")
    .addChannelOption((opt) =>
        opt
            .setName("channel")
            .setDescription("Kênh để chơi nối từ.")
            .addChannelTypes(ChannelType.GuildText)
    );

export default new SlashCommand({
    data,
    async run(interaction) {
        const channelInput = interaction.options.getChannel("channel");
        const targetChannel = channelInput ?? interaction.channel;

        if (targetChannel?.type !== ChannelType.GuildText) {
            return interaction.reply(`Kênh được chọn không phải là kênh văn bản.`);
        }

        try {
            const stats = await getStats(targetChannel.id);
            if (!stats) return interaction.reply("Kênh này chưa được đặt là kênh chơi nối từ.");

            await removeStats(targetChannel.id);
            interaction.reply(
                `Đã xóa bỏ nối từ Tiếng Việt trong kênh ${targetChannel.toString()}.`
            );
        } catch (err) {
            console.error(err);
            interaction.reply("Đã có lỗi xảy ra khi thiết lập trò chơi.");
        }
    },
});
