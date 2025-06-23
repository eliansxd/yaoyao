import mongoose, { Schema } from "mongoose";
import { IStickyMessage } from "../interfaces";

const StickyMessageSchema = new Schema<IStickyMessage>({
    guildId: { type: String, required: true },
    channelId: { type: String, required: true },
    mode: { type: String, default: "threshold" },
    delaySeconds: { type: Number, default: 3 },
    messageThreshold: { type: Number, default: 1 },
    messageCount: { type: Number, default: 0 },
    allowMention: { type: Boolean, default: true },
    messageContent: { type: String, required: true },
});

const StickyMessageModel = mongoose.model<IStickyMessage>("StickyMessage", StickyMessageSchema);

export default StickyMessageModel;
