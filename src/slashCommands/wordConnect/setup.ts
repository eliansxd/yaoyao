import { getStats, createStats } from "../../modules/wordConnect";
import { ChannelType, SlashCommandBuilder, TextChannel } from "discord.js";
import { SlashCommand } from "../../modules/command";
import { words_start } from "../../words";

const data = new SlashCommandBuilder()
    .setName("wordconnect_setup")
    .setDescription("Cài đặt kênh chơi nối từ Tiếng Việt.")
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
            if (stats)
                return interaction.reply("Kênh này đã là kênh chơi nối từ.");

            const startWord =
                words_start[Math.floor(Math.random() * words_start.length)];
            await createStats(channel.id, startWord);

            if (channel instanceof TextChannel) {
                channel.send(
                    `Trò chơi nối từ đã được thiết lập!\nTừ bắt đầu là: ${startWord}`
                );
            }

            return interaction.reply(
                `Kênh ${channel.toString()} đã bắt đầu chơi nối từ.`
            );
        } catch (err) {
            console.error(err);
            return interaction.reply(
                "Đã có lỗi xảy ra khi thiết lập trò chơi."
            );
        }
    },
});
