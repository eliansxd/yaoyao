import { ISnipeMessage } from "../database/interfaces";
import SnipeMessageModel from "../database/models/SnipeMessage.model";

async function getSetting(guildId: string): Promise<ISnipeMessage | null> {
    try {
        const setting = await SnipeMessageModel.findOne({ guildId });
        return setting;
    } catch (error) {
        console.error("[SnipeMessage] Failed to get setting:", error);
        return null;
    }
}

async function createSetting(guildId: string): Promise<ISnipeMessage> {
    const setting = await getSetting(guildId);
    if (setting) return setting;
    const newModel = await SnipeMessageModel.create({ guildId });
    return newModel;
}

export async function isEnableSnipe(guildId: string): Promise<boolean> {
    const setting = await getSetting(guildId);
    if (setting) return setting.enable ?? false;
    return false;
}

export async function toggleSnipe(guildId: string): Promise<boolean> {
    const setting = await createSetting(guildId);
    setting.enable = !setting.enable;
    await setting.save();
    return setting.enable;
}
