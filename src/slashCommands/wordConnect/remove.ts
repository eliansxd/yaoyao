import { getStats, removeStats } from "../../modules/wordConnect";
import { ChannelType, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../../modules/command";

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
        let channel = interaction.options.getChannel("channel");
        if (channel?.type !== ChannelType.GuildText) {
            if (interaction.channel?.type !== ChannelType.GuildText) {
                return interaction.reply(`Vui lòng chọn kênh văn bản.`);
            } else {
                channel = interaction.channel;
            }
        }

        try {
            const stats = await getStats(channel.id);
            if (!stats)
                return interaction.reply(
                    "Kênh này chưa được đặt là kênh chơi nối từ."
                );

            await removeStats(channel.id);
            return interaction.reply(
                `Đã xóa bỏ nối từ Tiếng Việt trong kênh ${channel.toString()}.`
            );
        } catch (err) {
            console.error(err);
            return interaction.reply(
                "Đã có lỗi xảy ra khi thiết lập trò chơi."
            );
        }
    },
});
