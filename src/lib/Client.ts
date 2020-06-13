import { Client, ClientOptions, Collection, Message } from "discord.js";

import { botPrefix } from "../env";
import { Command } from "./Command";
import { createLogger } from "./utils/logging";

/**
 * Extended client class.
 */
export class ExtendedClient extends Client {
  readonly logger = createLogger("liquid");
  readonly commands = new Collection<string, Command>();

  constructor(options?: ClientOptions) {
    super(options);
    this.registerEventListeners();
  }

  /**
   * Register a command.
   */
  registerCommands(...commands: (new (...args: any[]) => Command)[]) {
    commands.forEach((command) => {
      const c = new command(this);
      this.commands.set(c.options.name, c);
      this.logger.debug(`Registered command '${c.options.name}'`);
    });
    return this;
  }

  protected registerEventListeners() {
    this.on("debug", (msg) => this.logger.debug(msg))
      .on("warn", (msg) => this.logger.warn(msg))
      .on("error", (err) => {
        console.error(err);
        this.logger.error(err);
      });

    this.on("message", (m) => this.extractCommand(m));

    this.logger.verbose("Attached event listeners");
  }

  protected extractCommand(m: Message) {
    if (!m.content.startsWith(botPrefix)) {
      return;
    }

    const args = m.content.slice(botPrefix.length).trim().split(" ");

    const command = this.commands.get(args[0]);
    if (command) {
      return command.run(m, args.slice(1));
    } else {
      this.logger.warn("Command not found: ", args[0]);
    }
  }
}

const ex = new ExtendedClient();

class Test extends Command {
  constructor(client: ExtendedClient) {
    super(client, { name: "test", guildOnly: true });
  }

  async run(message: Message) {
    message.reply("uwu");
  }
}

ex.registerCommands(Test);
