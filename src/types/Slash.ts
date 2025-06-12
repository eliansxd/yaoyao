import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import YaoYao from "../YaoYao";

interface Execute {
    (client: YaoYao, interaction: ChatInputCommandInteraction): Promise<any>;
}

export interface Slash {
    data: SlashCommandBuilder;
    execute: Execute;
}
