import { ClientEvents } from "discord.js";

interface EventOptions<Event extends keyof ClientEvents> {
    name: Event;
    once?: boolean;
    disabled?: boolean;
    run: (...args: ClientEvents[Event]) => Promise<any>;
}

export default class BotEvent<Event extends keyof ClientEvents> {
    constructor(options: EventOptions<Event>) {
        this.name = options.name;
        this.once = options.once ?? false;
        this.disabled = options.disabled ?? false;
        this.run = options.run;
    }

    public readonly name;
    public readonly once;
    public readonly disabled;
    public readonly run;
}
