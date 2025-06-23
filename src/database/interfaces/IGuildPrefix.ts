import { Document } from "mongoose";

export interface IGuildPrefix extends Document {
    guildId: string;
    prefix?: string;
}
