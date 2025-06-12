import { SubCommand } from "../../types";

export const slash: SubCommand = {
    subCommand: "word_connect.reset",
    async execute(client, interaction) {
        const channel = interaction.options.getChannel("channel");
        if (channel) {
            const stats = client.wordConnectStats.get(
                `wordConnect.${channel.id}`
            );
            if (!stats) {
                return interaction.reply(
                    `Kênh này không được cài đặt để chơi Nối Từ.`
                );
            }

            stats.usedWords = [];
            client.wordConnectStats.set(`wordConnect.${channel.id}`, stats);
            interaction.reply(`Đã đặt lại từ đã sử dụng trong kênh.`);
        }
    },
};
