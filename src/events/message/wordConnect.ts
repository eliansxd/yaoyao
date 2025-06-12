import { words } from "../../words";
import { sleep } from "../../utils/time";
import { Message, MessagePayload, MessageReplyOptions } from "discord.js";
import { Event } from "../../types";

export const event: Event = {
    name: "messageCreate",
    execute: async (client, message: Message) => {
        if (message.author.bot || !message.guild) return;
        const stats = client.wordConnectStats.get(
            `wordConnect.${message.channelId}`
        );

        if (!stats) return;

        const content = message.content.trim().toLowerCase();

        if (message.channelId === stats.channelId) {
            const messageWords = content.split(" ");
            if (messageWords.length !== 2) {
                await message.react("❌");
                await sendAndDeleteAfter(`Bạn cần gửi theo cú pháp: từ1 từ2`);
                return;
            }
            const [firstWord, lastWord] = messageWords;
            const fullWord = `${firstWord} ${lastWord}`;

            if (message.author.id == stats.lastPlayer) {
                await message.react("❌");
                await sendAndDeleteAfter(
                    `Bạn đã chơi trước đó rồi, hãy chờ người khác nối tiếp từ của bạn.`
                );
                return;
            }

            if (firstWord !== stats?.lastWord) {
                await message.react("❌");
                await sendAndDeleteAfter(
                    `Từ được dùng ở lần chơi trước là: ${stats?.lastWord}`
                );
                return;
            }

            const rawWords = words[firstWord] || [];
            const validWords: string[] = rawWords.filter(
                (w) => typeof w === "string"
            );

            if (!validWords.includes(lastWord)) {
                await message.react("❌");
                await sendAndDeleteAfter(
                    `Từ ${lastWord} không tồn tại trong từ điển của bot.`
                );
                return;
            }

            if (stats.usedWords.includes(fullWord)) {
                await message.react("❌");
                await sendAndDeleteAfter(
                    `Từ này đã được dùng ở lần chơi trước, vui lòng sử dụng từ khác.`
                );
                return;
            }

            stats.usedWords.push(fullWord);
            stats.lastWord = lastWord;
            stats.lastPlayer = message.author.id;
            client.wordConnectStats.set(
                `wordConnect.${message.channelId}`,
                stats
            );
            return message.react("✅");
        }

        async function sendAndDeleteAfter(
            options: MessagePayload | MessageReplyOptions | string,
            ms: number = 15000
        ) {
            try {
                const m = await message.reply(options);
                await sleep(ms);
                await m.delete();
            } catch (err) {
                console.error(err);
            }
        }
    },
};
