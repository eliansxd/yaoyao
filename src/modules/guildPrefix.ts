import { IGuildPrefix } from "../database/interfaces";
import GuildPrefixModel from "../database/models/GuildPrefix.model";

export async function getPrefixSetting(guildId: string): Promise<IGuildPrefix | null> {
    try {
        const data = await GuildPrefixModel.findOne({ guildId });
        return data;
    } catch (error) {
        console.error("[GuildPrefix] Failed to get data:", error);
        return null;
    }
}

async function createPrefixSetting(guildId: string): Promise<IGuildPrefix> {
    const setting = await getPrefixSetting(guildId);
    if (setting) return setting;
    const newSetting = await GuildPrefixModel.create({ guildId });
    return newSetting;
}

export async function updatePrefix(guildId: string, prefix: string): Promise<IGuildPrefix> {
    const setting = await createPrefixSetting(guildId);
    if (setting.prefix !== prefix) {
        setting.prefix = prefix;
        await setting.save();
    }
    return setting;
}
