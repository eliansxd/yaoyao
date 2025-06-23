import * as WCError from "../exceptions/WordConnectError";
import WordConnectStats from "../../database/models/WordConnectStats.model";
import { IWordConnectStats } from "../../database/interfaces";
import { words } from "../../words";

export async function getStats(channelId: string): Promise<IWordConnectStats | null> {
    try {
        const stats = await WordConnectStats.findOne({ channelId });
        return stats;
    } catch (err) {
        throw new Error(`[WordConnect] Failed to get stats: ${String(err)}`);
    }
}

export async function createStats(
    channelId: string,
    startWord: string
): Promise<IWordConnectStats> {
    const setting = await getStats(channelId);
    if (setting) return setting;
    const newStats = await WordConnectStats.create({ channelId, lastWord: startWord });
    return newStats;
}

type WCUpdateOptions = Partial<Pick<IWordConnectStats, "lastWord" | "lastPlayer" | "usedWords">>;

export async function updateStats(channelId: string, options: WCUpdateOptions): Promise<void> {
    try {
        await WordConnectStats.updateOne({ channelId }, { $set: options });
    } catch (err) {
        throw new Error(`[WordConnect] Failed to update stats: ${String(err)}`);
    }
}

export async function removeStats(channelId: string): Promise<void> {
    try {
        await WordConnectStats.findOneAndDelete({ channelId });
    } catch (err) {
        throw new Error(`[WordConnect] Failed to remove stats: ${String(err)}`);
    }
}

interface TurnParams {
    channelId: string;
    authorId: string;
    content: string;
    stats: IWordConnectStats;
}

export async function playerTurnHandle(params: TurnParams): Promise<void> {
    const { channelId, authorId, content, stats } = params;

    const messageWords = content.trim().toLowerCase().split(/\s+/);
    const usedWords = stats.usedWords ?? [];

    if (authorId == stats.lastPlayer) throw new WCError.PlayerAlreadyPlayed();
    if (messageWords.length !== 2) throw new WCError.SyntaxError();

    const [firstWord, lastWord] = messageWords;
    const fullWord = `${firstWord} ${lastWord}`;

    if (stats?.lastWord && firstWord !== stats?.lastWord) {
        throw new WCError.WrongLastWord(stats.lastWord);
    }

    const rawWords = words[firstWord];
    if (!rawWords) throw new WCError.WordNotFound(fullWord);

    if (usedWords.includes(fullWord)) throw new WCError.WordAlreadyUsed();

    await updateStats(channelId, {
        usedWords: [...usedWords, fullWord],
        lastWord,
        lastPlayer: authorId,
    });
}
