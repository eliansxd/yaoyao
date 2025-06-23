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

export async function isEnableGuild(guildId: string): Promise<boolean> {
    const setting = await getSetting(guildId);
    if (!setting) return true;
    return !setting.disableGuild;
}

export async function isEnableChannel(guildId: string, channelId: string): Promise<boolean> {
    const setting = await getSetting(guildId);
    if (!setting) return true;
    return !setting.disableChannel.includes(channelId);
}

export async function toggleChannelSnipe(guildId: string, channelId: string): Promise<boolean> {
    const setting = await createSetting(guildId);
    if (!setting.disableChannel.includes(channelId)) {
        setting.disableChannel.push(channelId);
    } else {
        setting.disableChannel = setting.disableChannel.filter((channel) => channel !== channelId);
    }
    await setting.save();
    return !setting.disableChannel.includes(channelId);
}

export async function toggleGuildSnipe(guildId: string): Promise<boolean> {
    const setting = await createSetting(guildId);
    setting.disableGuild = !setting.disableGuild;
    await setting.save();
    return !setting.disableGuild;
}
