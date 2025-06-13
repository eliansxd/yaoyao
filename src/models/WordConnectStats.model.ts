import mongoose, { Schema } from "mongoose";
import { IWordConnectStats } from "../types";

const WordConnectStatsSchema = new Schema<IWordConnectStats>({
    channelId: { type: String, required: true },
    lastWord: { type: String, default: "" },
    lastPlayer: { type: String, default: "" },
    usedWords: { type: [String], default: [] },
});

const WordConnectStatsModel = mongoose.model<IWordConnectStats>(
    "WordConnectStats",
    WordConnectStatsSchema
);

export default WordConnectStatsModel;
