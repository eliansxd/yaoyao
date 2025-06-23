import mongoose, { Schema } from "mongoose";
import { ISnipeMessage } from "../interfaces";

const SnipeMessageSchema = new Schema<ISnipeMessage>({
    guildId: { type: String, required: true },
    enable: { type: Boolean, default: true },
});

const SnipeMessageModel = mongoose.model<ISnipeMessage>("SnipeMessage", SnipeMessageSchema);

export default SnipeMessageModel;
