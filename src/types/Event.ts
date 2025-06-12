import { ClientEvents } from "discord.js";
import YaoYao from "../YaoYao";

interface Execute {
    (client: YaoYao, ...args: any[]): Promise<any>;
}

export interface Event {
    name: keyof ClientEvents;
    once?: boolean;
    execute: Execute;
}
