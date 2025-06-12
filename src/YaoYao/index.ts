import {
    Client,
    Collection,
    GatewayIntentBits,
    SlashCommandBuilder,
} from "discord.js";
import { EventHandler, SlashHandler } from "../handlers";
import { Slash } from "../types";

class YaoYao extends Client {
    public slash: Collection<string, Slash> = new Collection();

    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.GuildMembers,
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
