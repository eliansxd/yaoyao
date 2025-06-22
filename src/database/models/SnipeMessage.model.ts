import mongoose, { Schema } from "mongoose";
import { ISnipeMessage } from "../interfaces";

const SnipeMessageSchema = new Schema<ISnipeMessage>({
    guildId: { type: String, required: true },
    disableChannel: { type: [String], default: [] },
    disableGuild: { type: Boolean, default: false },
});

const SnipeMessageModel = mongoose.model<ISnipeMessage>("SnipeMessage", SnipeMessageSchema);

export default SnipeMessageModel;
