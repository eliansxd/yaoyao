import { Document } from "mongoose";

export interface IStickyMessage extends Document {
    guildId: string;
    channelId: string;
    mode: "inactive" | "threshold";
    delaySeconds?: number;
    messageThreshold?: number;
    messageCount?: number;
    allowMention?: boolean;
    messageContent: string;
}
