import { GatewayIntentBits, Client, ClientOptions } from "discord.js";
import { loadCommands, loadEvents } from "./handlers";
import { SlashCommand } from "./modules/command";
import "dotenv/config";
import "./database";

export default class YaoYao extends Client {
    constructor(options: ClientOptions) {
        super(options);

        this.slashCommands = new Map();

        loadCommands(this);
        loadEvents(this);
    }

    public readonly slashCommands: Map<string, SlashCommand>;
}

const yaoyao = new YaoYao({
    intents: Object.values(GatewayIntentBits) as GatewayIntentBits[],
});

yaoyao.login();
