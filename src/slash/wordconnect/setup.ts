import { words_start } from "../../words";
import { SubCommand } from "../../types";
import { ChannelType, TextChannel } from "discord.js";

export const slash: SubCommand = {
    subCommand: "word_connect.setup",
    async execute(client, interaction) {
        const channel = interaction.options.getChannel("channel");
        const startWord =
            words_start[Math.floor(Math.random() * words_start.length)];

        if (
            channel?.type != ChannelType.GuildText ||
            !(channel instanceof TextChannel)
        ) {
            return interaction.reply(`Vui lòng nhập kênh văn bản.`);
        }

        const stats = client.wordConnectStats.get(`wordConnect.${channel.id}`);
        if (stats) {
            return interaction.reply(`Kênh này đã được cài đặt chơi Nối Từ.`);
        }

        await channel?.send(
            `🔹 **Bắt đầu nối từ!**\nTừ đầu tiên là: \`${startWord}\``
        );
        client.wordConnectStats.set(`wordConnect.${channel.id}`, {
            lastWord: startWord,
            usedWords: [],
            lastPlayer: "",
            channelId: channel.id,
        });
        interaction.reply(`Thiết lập kênh Nối Từ hoàn tất. ${channel}`);
    },
};
