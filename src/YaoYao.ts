import { GatewayIntentBits, Client, ClientOptions, Message } from "discord.js";
import { loadCommands, loadEvents } from "./handlers";
import { MessageCommand, SlashCommand } from "./modules/command";
import "dotenv/config";
import "./database";

export default class YaoYao extends Client {
    constructor(options: ClientOptions) {
        super(options);

        this.slashCommands = new Map();
        this.messageCommands = new Map();

        this.snipeMessages = new Map();

        loadCommands(this);
        loadEvents(this);
    }

    public readonly slashCommands: Map<string, SlashCommand>;
    public readonly messageCommands: Map<string, MessageCommand>;

    public readonly snipeMessages: Map<string, Message>;
}

const yaoyao = new YaoYao({
    intents: Object.values(GatewayIntentBits) as GatewayIntentBits[],
});

yaoyao.login();
