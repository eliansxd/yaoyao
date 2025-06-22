import { Document } from "mongoose";

export interface ISnipeMessage extends Document {
    guildId: string;
    disableGuild: boolean;
    disableChannel: string[];
}
