import WordConnectStatsModel from "../models/WordConnectStats.model";
import { IWordConnectStats } from "../types";

/**
 * Retrieves Word Connect stats for a specific channel.
 * @param channelId - The Discord channel ID to look up.
 * @returns The stats object if found, otherwise null.
 */
export async function getStats(
    channelId: string
): Promise<IWordConnectStats | null> {
    try {
        const stats = await WordConnectStatsModel.findOne({ channelId }).lean();
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
        const stats = new WordConnectStatsModel({
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
        await WordConnectStatsModel.updateOne({ channelId }, { $set: options });
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
        await WordConnectStatsModel.findOneAndDelete({ channelId });
    } catch (err) {
        console.error("[WordConnectService] Failed to update stats:", err);
    }
}
