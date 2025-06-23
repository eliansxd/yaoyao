import mongoose, { Schema } from "mongoose";
import { IGuildPrefix } from "../interfaces";

const GuildPrefixSchema = new Schema<IGuildPrefix>({
    guildId: { type: String, required: true },
    prefix: { type: String, default: "s!" },
});

const GuildPrefixModel = mongoose.model<IGuildPrefix>("GuildPrefix", GuildPrefixSchema);

export default GuildPrefixModel;
