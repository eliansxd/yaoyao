import BotEvent from "../../modules/event";
import YaoYao from "../../YaoYao";

export default new BotEvent({
    name: "interactionCreate",
    async run(interaction) {
        if (!interaction.isChatInputCommand()) return; 
        if (interaction.user.bot) return;

        const yaoyao = interaction.client as YaoYao;
        const command = yaoyao.slashCommands.get(interaction.commandName);

        if (!command) return;
        if (command.disabled) {
            return interaction.reply(`Lệnh này đã bị tắt.`);
        }

        try {
            await command.run(interaction);
        } catch (err) {
            console.error(err);
            return;
        }
    },
});
