import { getStats, createStats } from "../../services/wordConnect.services";
import { GuildTextBasedChannel, MessageFlags } from "discord.js";
import { words_start } from "../../words";
import { SubCommand } from "../../types";

export const slash: SubCommand = {
    subCommand: "word_connect.setup",
    async execute(_client, interaction) {
        const channelOption = interaction.options.getChannel("channel");

        const channel = (channelOption ??
            interaction.channel) as GuildTextBasedChannel | null;

        if (!channel) {
            return interaction.reply({
                content: "Không thể xác định được kênh.",
                flags: MessageFlags.Ephemeral,
            });
        }

        if (!channel.isTextBased()) {
            return interaction.reply({
                content: "Vui lòng chọn một kênh văn bản hợp lệ trong server.",
                flags: MessageFlags.Ephemeral,
            });
        }

        const stats = await getStats(channel.id);
        if (stats) {
            return interaction.reply({
                content:
                    "Kênh này đã được thiết lập là kênh chơi Nối Từ trước đó.",
                flags: MessageFlags.Ephemeral,
            });
        }

        const startWord =
            words_start[Math.floor(Math.random() * words_start.length)];
        await createStats(channel.id, startWord);
        await channel.send(`Từ đầu tiên là: \`${startWord}\``);
        await interaction.reply(`✅ Đã thiết lập kênh Nối Từ: ${channel}`);
        return;
    },
};
