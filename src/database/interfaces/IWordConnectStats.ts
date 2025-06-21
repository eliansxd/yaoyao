import { Document } from "mongoose";

export interface IWordConnectStats extends Document {
    channelId: string;
    lastWord?: string;
    lastPlayer?: string;
    usedWords?: string[];
}
