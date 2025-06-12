import {
    ChatInputCommandInteraction,
    SlashCommandBuilder,
    SlashCommandSubcommandsOnlyBuilder,
} from "discord.js";
import YaoYao from "../YaoYao";

interface Execute {
    (client: YaoYao, interaction: ChatInputCommandInteraction): Promise<any>;
}

export interface SubCommand {
    subCommand: string;
    execute: Execute;
}

export interface Slash {
    data: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder;
    execute?: Execute;
}
