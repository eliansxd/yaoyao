import {
    SlashCommandBuilder,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle,
    ActionRowBuilder,
} from "discord.js";
import { SlashCommand } from "../../../modules/command";

const data = new SlashCommandBuilder()
    .setName("sticky_setup")
    .setDescription("Cài đặt tin nhắn cố định cho kênh hiện tại.");

export default new SlashCommand({
    data,
    async run(interaction) {
        const modal = new ModalBuilder({
            customId: "stickySetupModal",
            title: "Tin nhắn cố định",
        });

        const messageContent = new TextInputBuilder({
            customId: "messageContent",
            label: "Tin nhắn bạn muốn cài đặt?",
            style: TextInputStyle.Paragraph,
            required: true,
        });

        const actionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(messageContent);

        modal.addComponents(actionRow);

        await interaction.showModal(modal);
    },
});
