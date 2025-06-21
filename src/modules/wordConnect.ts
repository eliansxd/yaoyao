import {
    PlayerAlreadyPlayed,
    WordConnectError,
    WordNotFound,
    WordUsed,
} from "./exceptions/WordConnectError";
import WordConnectStats from "../database/models/WordConnectStats.model";
import { IWordConnectStats } from "../database/interfaces";
import { words } from "../words";

/**
 * Retrieves Word Connect stats for a specific channel.
 * @param channelId - The Discord channel ID to look up.
 * @returns The stats object if found, otherwise null.
 */
export async function getStats(
    channelId: string
): Promise<IWordConnectStats | null> {
    try {
        const stats = await WordConnectStats.findOne({ channelId }).lean();
        return stats;
    } catch (err) {
        console.error("[WordConnectService] Failed to get stats:", err);
        return null;
    }
}

/**
 * Creates a new Word Connect stats document for the given channel.
 * @param channelId - The Discord channel ID.
 * @returns Nothing. Logs an error if creation fails.
 */
export async function createStats(
    channelId: string,
    startWord: string
): Promise<void> {
    try {
        const stats = new WordConnectStats({
            channelId,
            lastWord: startWord,
        });
        await stats.save();
    } catch (err) {
        console.error("[WordConnectService] Failed to create stats:", err);
    }
}

type WordConnectStatsUpdate = Partial<
    Pick<IWordConnectStats, "lastWord" | "lastPlayer" | "usedWords">
>;

/**
 * Updates Word Connect stats for a specific channel.
 * @param channelId - The Discord channel ID.
 * @param options - The fields to update (e.g. lastWord, lastPlayer, usedWords).
 * @returns Nothing.
 */
export async function updateStats(
    channelId: string,
    options: WordConnectStatsUpdate
): Promise<void> {
    try {
        await WordConnectStats.updateOne({ channelId }, { $set: options });
    } catch (err) {
        console.error("[WordConnectService] Failed to update stats:", err);
    }
}

/**
 * Updates Word Connect stats for a specific channel.
 * @param channelId - The Discord channel ID.
 * @returns Nothing.
 */
export async function removeStats(channelId: string): Promise<void> {
    try {
        await WordConnectStats.findOneAndDelete({ channelId });
    } catch (err) {
        console.error("[WordConnectService] Failed to update stats:", err);
    }
}

interface TurnParams {
    channelId: string;
    authorId: string;
    content: string;
    stats: IWordConnectStats;
}

/**
 * Handles a player's turn in the Word Connect game.
 *
 * Validates the input message, checks game rules such as turn order and word validity,
 * and updates the game state in the database if the move is valid.
 *
 * @param params - The parameters for the player's turn.
 * @param params.channelId - The Discord channel ID where the game is being played.
 * @param params.authorId - The ID of the user who sent the message.
 * @param params.content - The raw message content sent by the user.
 * @param params.stats - The current Word Connect stats for the channel.
 * @throws PlayerAlreadyPlayed - If the same user tries to play twice in a row.
 * @throws WordConnectError - If the input is invalid or the word chain is broken.
 * @throws WordUsed - If the word combination has already been used.
 * @throws WordNotFound - If the word is not found in the bot's dictionary.
 * @returns A Promise that resolves once the game state is updated.
 */
export async function playerTurnHandle(params: TurnParams): Promise<void> {
    const { channelId, authorId, content, stats } = params;

    const messageWords = content.trim().toLowerCase().split(/\s+/);
    const usedWords = stats.usedWords ?? [];
    if (authorId == stats.lastPlayer) {
        throw new PlayerAlreadyPlayed();
    }
    if (messageWords.length !== 2) {
        throw new WordConnectError(`Bạn cần gửi theo cú pháp: từ1 từ2`);
    }
    const [firstWord, lastWord] = messageWords;
    const fullWord = `${firstWord} ${lastWord}`;
    if (firstWord !== stats?.lastWord) {
        throw new WordConnectError(
            `Từ được dùng ở lần chơi trước là: ${stats?.lastWord}`
        );
    }
    const rawWords = words[firstWord];
    if (!rawWords) {
        throw new WordNotFound(lastWord);
    }
    if (usedWords.includes(fullWord)) {
        throw new WordUsed();
    }
    await updateStats(channelId, {
        usedWords: [...usedWords, fullWord],
        lastWord,
        lastPlayer: authorId,
    });
}
