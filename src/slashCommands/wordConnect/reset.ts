import { getStats, updateStats } from "../../modules/wordConnect";
import { ChannelType, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../../modules/command";

const data = new SlashCommandBuilder()
    .setName("wordconnect_reset")
    .setDescription("Đặt lại từ đã sử dụng.")
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

            await updateStats(channel.id, { usedWords: [] });
            return interaction.reply(
                `Đã đặt lại từ trong kênh ${channel.toString()}.`
            );
        } catch (err) {
            console.error(err);
            return interaction.reply(
                "Đã có lỗi xảy ra khi thiết lập trò chơi."
            );
        }
    },
});
