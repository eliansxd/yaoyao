import {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    SlashCommandOptionsOnlyBuilder,
} from "discord.js";

interface SlashCommandOptions {
    data: SlashCommandBuilder | SlashCommandOptionsOnlyBuilder;
    run: (interaction: ChatInputCommandInteraction) => Promise<any>;
    disabled?: boolean;
}

export class SlashCommand {
    constructor(options: SlashCommandOptions) {
        this.data = options.data;
        this.run = options.run;
        this.disabled = options.disabled ?? false;
    }

    public readonly data;
    public readonly run;
    public readonly disabled;
}
