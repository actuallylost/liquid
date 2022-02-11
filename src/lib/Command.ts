import { Guild, GuildMember, Message, TextChannel } from "discord.js";

import { LiquidClient } from "./Client";

interface BaseCommandOptions {
    name: string;
}

interface CommandOptions extends BaseCommandOptions {
    guildOnly?: boolean;
    description: string;
    //category: string;
}

/**
 * Represents a command.
 */
export abstract class Command {
    constructor(
        readonly client: LiquidClient,
        readonly options: CommandOptions
    ) {}

    /**
     * Called when the command is executed.
     */
    abstract run(message: Message, args: string[]): Promise<any>;

    get logger() {
        return this.client.logger;
    }
}

export type DefiniteGuildMessage = Message & {
    guild: Guild;
    member: GuildMember;
    channel: TextChannel;
};
