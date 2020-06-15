import {
  Client,
  ClientOptions,
  ClientUser,
  Collection,
  Message,
} from "discord.js";

import { botPrefix } from "../env";
import { Command } from "./Command";
import { createLogger } from "./utils/logging";

/**
 * Extended client class.
 */
export class ExtendedClient extends Client {
  readonly logger = createLogger("liquid");
  readonly commands = new Collection<string, Command>();

  user!: ClientUser;

  constructor(options?: ClientOptions) {
    super(options);
    this.registerEventListeners();
    this.logger.level = "silly";
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
    this.on("debug", (msg) => this.logger.silly(msg))
      .on("warn", (msg) => this.logger.warn(msg))
      .on("error", (err) => {
        console.error(err);
        this.logger.error(err);
      })
      .on("ready", () => this.logger.info("Ready."));

    this.on("message", (m) => this.extractCommand(m));

    this.logger.verbose("Attached event listeners");
  }

  protected extractCommand(m: Message) {
    if (!m.content.startsWith(botPrefix)) {
      return;
    }

    const args = m.content.slice(botPrefix.length).trim().split(" ");
    const command = this.commands.get(args[0]);

    if (!command) {
      this.logger.debug("Command not found: ", args[0]);
      return;
    }

    if (command.options.guildOnly && !m.guild) {
      return;
    }

    this.logger.info(
      `${m.author.tag} (${m.author.id}) => ${command.options.name} ${args
        .slice(1)
        .join(" ")}`
    );

    return command.run(m, args.slice(1)).catch((err) => {
      this.logger.error(
        `Error while running command '${command.options.name}':`
      );
      console.error(err);
    });
  }
}
