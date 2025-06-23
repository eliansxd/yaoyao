import {
    ChatInputCommandInteraction,
    Message,
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

interface MessageCommandOptions {
    name: string;
    aliases?: string[];
    validate?: (message: Message<true>, ...args: string[]) => boolean | Promise<boolean>;
    checks?: ((message: Message<true>) => boolean | Promise<boolean>)[];
    run: (message: Message<true>, ...args: string[]) => Promise<any>;
    disabled?: boolean;
}

export class MessageCommand {
    constructor(options: MessageCommandOptions) {
        this.name = options.name;
        this.aliases = options.aliases ?? [];
        this.checks = options.checks ?? [];
        this.validate = options.validate;
        this.run = options.run;
        this.disabled = options.disabled ?? false;
    }

    public readonly name;
    public readonly aliases;
    public readonly validate;
    public readonly checks;
    public readonly run;
    public readonly disabled;
}
