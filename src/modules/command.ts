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

type ValidateResult = boolean | string | Promise<boolean | string>;
type Validate = (message: Message, ...args: string[]) => ValidateResult;

interface MessageCommandOptions {
    name: string;
    aliases?: string[];
    validate?: Validate;
    run: (message: Message, ...args: string[]) => Promise<any>;
    disabled?: boolean;
}

export class MessageCommand {
    constructor(options: MessageCommandOptions) {
        this.name = options.name;
        this.aliases = options.aliases ?? [];
        this.validate = options.validate;
        this.run = options.run;
        this.disabled = options.disabled ?? false;
    }

    public readonly name;
    public readonly aliases;
    public readonly validate;
    public readonly run;
    public readonly disabled;
}
