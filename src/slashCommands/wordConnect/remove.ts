import { getStats, removeStats } from "../../services/wordConnect.services";
import { MessageFlags } from "discord.js";
import { SubCommand } from "../../types";

export const slash: SubCommand = {
    subCommand: "word_connect.remove",
    async execute(_client, interaction) {
        const channel = interaction.options.getChannel("channel");
        if (channel) {
            const stats = await getStats(channel.id);
            if (!stats) {
                return interaction.reply({
                    content: `Kênh này chưa được thiết lập để chơi Nối Từ.`,
                    flags: MessageFlags.Ephemeral,
                });
            }
            await removeStats(channel.id);
            interaction.reply(`Đã xóa thiết lập kênh chơi Nối Từ.`);
        }
        return;
    },
};
