import { Message } from "discord.js";

import { ExtendedClient } from "./Client";

interface BaseCommandOptions {
  name: string;
}

interface CommandOptions extends BaseCommandOptions {
  guildOnly?: boolean;
}

/**
 * Represents a command.
 */
export abstract class Command {
  constructor(
    readonly client: ExtendedClient,
    readonly options: CommandOptions
  ) {}

  /**
   * Called when the command is executed.
   */
  abstract async run(message: Message, args: string[]): Promise<any>;

  get logger() {
    return this.client.logger;
  }
}
