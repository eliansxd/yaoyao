import { Client, Collection, GatewayIntentBits } from "discord.js";
import { EventHandler, SlashHandler } from "../handlers";
import { Slash, SubCommand } from "../types";

class YaoYao extends Client {
    public slash: Collection<string, Slash> = new Collection();
    public subCommand: Collection<string, SubCommand> = new Collection();
    public wakeUpTime: number = Math.floor(Date.now() / 1000);

    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent,
            ],
        });
    }

    private initialHandler() {
        EventHandler(this);
        SlashHandler(this);
    }

    public async start() {
        this.initialHandler();
        await this.login();
    }
}

export default YaoYao;
