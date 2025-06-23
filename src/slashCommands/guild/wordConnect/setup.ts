import { getStats, createStats } from "../../../modules/database/wordConnect";
import { ChannelType, SlashCommandBuilder, TextChannel } from "discord.js";
import { SlashCommand } from "../../../modules/command";
import { words_start } from "../../../words";

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
        const channelInput = interaction.options.getChannel("channel");
        const targetChannel = channelInput ?? interaction.channel;
        if (targetChannel?.type !== ChannelType.GuildText) {
            return interaction.reply(`Kênh được chọn không phải là kênh văn bản.`);
        }

        try {
            const stats = await getStats(targetChannel.id);
            if (stats) return interaction.reply("Kênh này đã là kênh chơi nối từ.");

            const startWord = words_start[Math.floor(Math.random() * words_start.length)];
            await createStats(targetChannel.id, startWord);

            if (targetChannel instanceof TextChannel) {
                targetChannel.send(
                    `Trò chơi nối từ đã được thiết lập!\nTừ bắt đầu là: ${startWord}`
                );
                interaction.reply(`Kênh ${targetChannel.toString()} đã bắt đầu chơi nối từ.`);
                return;
            }

            interaction.reply("Kênh được chọn không phải là kênh văn bản.");
        } catch (err) {
            console.error(err);
            interaction.reply("Đã có lỗi xảy ra khi thiết lập trò chơi.");
        }
    },
});
