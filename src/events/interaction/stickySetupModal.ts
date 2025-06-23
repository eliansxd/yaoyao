import BotEvent from "../../modules/event";

export default new BotEvent({
    name: "interactionCreate",
    async run(interaction) {
        if (!interaction.isModalSubmit()) return;
        if (interaction.user.bot) return;

        if (interaction.customId !== "stickySetupModal") return;

        const messageContent = interaction.fields.getTextInputValue("messageContent");
        interaction.reply(messageContent);
    },
});
