import { Message, MessagePayload, MessageReplyOptions } from "discord.js";
import { getStats, updateStats } from "../../services/wordConnect.services";
import { sleep } from "../../utils/time";
import { words } from "../../words";
import { Event } from "../../types";

export const event: Event = {
    name: "messageCreate",
    execute: async (_client, message: Message) => {
        if (message.author.bot || !message.guild) return;
        const stats = await getStats(message.channelId);
        if (!stats) return;
        if (message.channelId === stats.channelId) {
            const content = message.content.trim().toLowerCase();
            const messageWords = content.split(" ");
            const usedWords = stats.usedWords ?? [];

            if (message.author.id == stats.lastPlayer) {
                await message.react("❌");
                await sendAndDeleteAfter(
                    `Bạn đã chơi trước đó rồi, hãy chờ người khác nối tiếp từ của bạn.`
                );
                return;
            }

            if (messageWords.length !== 2) {
                await message.react("❌");
                await sendAndDeleteAfter(`Bạn cần gửi theo cú pháp: từ1 từ2`);
                return;
            }

            const [firstWord, lastWord] = messageWords;
            const fullWord = `${firstWord} ${lastWord}`;

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

            if (usedWords.includes(fullWord)) {
                await message.react("❌");
                await sendAndDeleteAfter(
                    `Từ này đã được dùng ở lần chơi trước, vui lòng sử dụng từ khác.`
                );
                return;
            }

            await updateStats(message.channelId, {
                usedWords: [...usedWords, fullWord],
                lastWord,
                lastPlayer: message.author.id,
            });
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
        return;
    },
};
