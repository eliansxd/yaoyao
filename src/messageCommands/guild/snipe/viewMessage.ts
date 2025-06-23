import YaoYao from "../../../YaoYao";
import { isEnableSnipe } from "../../../modules/snipeMessage";
import { MessageCommand } from "../../../modules/command";
import { PermissionFlagsBits, WebhookClient, userMention, time } from "discord.js";

export default new MessageCommand({
    name: "snipe",
    async run(message) {
        const { guildId } = message;

        if (!(await isEnableSnipe(guildId))) {
            return message.reply(`Server không bật chức năng snipe.`);
        }

        const yaoyao = message.client as YaoYao;
        const snipeMessage = yaoyao.snipeMessages.get(message.channelId);

        if (!snipeMessage) {
            return message.reply(`Không có tin nhắn nào đã xóa trước đó.`);
        }

        if (!message.guild.members.me?.permissions.has(PermissionFlagsBits.ManageWebhooks)) {
            return message.reply(snipeMessage.content);
        }

        if (!message.channel.isTextBased()) {
            return message.reply(snipeMessage.content);
        }

        const sendSnipeMessage = async (webhook: WebhookClient) => {
            const timestamp = Math.floor((snipeMessage.createdTimestamp ?? Date.now()) / 1000);
            const mention = userMention(message.author.id);
            const footer = `\n-# Tin nhắn xóa ${time(timestamp, "R")} - Yêu cầu bởi ${mention}`;

            await webhook.send({
                content: snipeMessage.content + footer,
                avatarURL: snipeMessage.author.displayAvatarURL(),
                username: snipeMessage.author.displayName,
            });
        };

        if ("fetchWebhooks" in message.channel) {
            try {
                const webhooks = await message.channel.fetchWebhooks();
                const ownWebhook = webhooks.find((wh) => wh.owner?.id === message.client.user.id);

                if (ownWebhook) {
                    const webhook = new WebhookClient({ url: ownWebhook.url });
                    return await sendSnipeMessage(webhook);
                }
                const newWebhook = await message.channel.createWebhook({
                    name: "YaoYao Snipe Message",
                    avatar: message.client.user.displayAvatarURL(),
                    reason: "Create webhook for snipe command",
                });
                const webhook = new WebhookClient({ url: newWebhook.url });
                await sendSnipeMessage(webhook);
            } catch (error) {
                console.error("[SnipeMessage] Failed to send message:", error);
                return message.reply(snipeMessage.content);
            }
        } else {
            return message.reply(snipeMessage.content);
        }
    },
});
