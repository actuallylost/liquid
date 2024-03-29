import { Client, ClientOptions, ClientUser, Collection, Message } from "discord.js";
import { Connection, createConnection } from "typeorm";

import { Infraction } from "../entities/Infraction";
import { ServerPrefix } from "../entities/ServerPrefix";
import { botPrefix } from "../env";
import { Command } from "./Command";
import { createLogger } from "./utils/logging";

/**
 * Extended client class.
 */
export class ExtendedClient extends Client {
    getInfraction(
        guild_id: string,
        offender_id: string
    ) {
        return this.connection.getRepository(Infraction).find( { where: { guild_id, offender_id } });
    }

    readonly logger = createLogger("liquid");
    readonly commands = new Collection<string, Command>();

    guildPrefixCache = new Map<string, string>();

    declare user: ClientUser;
    connection!: Connection;

    constructor(options: ClientOptions) {
        super(options);
        this.registerEventListeners();
        this.logger.level = "silly";
    }

    async login(token: string) {
        this.connection = await createConnection();
        return super.login(token);
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
        this.on("debug", (msg) => void this.logger.silly(msg))
            .on("warn", (msg) => void this.logger.warn(msg))
            .on("error", (err) => {
                void console.error(err);
                void this.logger.error(err);
            })
            .on("ready", () => void this.logger.info("Ready."));

        this.on("messageUpdate", (muo, mun: any) => this.extractCommand(mun));
        this.on("messageCreate", (m) => this.extractCommand(m));

        /**
         * Do the below thing later
         */

        // this.on("message", async (msg) => {
        //     if (!msg.guild) return;

        //     // Call Database -

        //     const repo = this.connection.getRepository(Levels);
        //     const levelsLogic = new Levels();
        //     levelsLogic.userID = msg.author.id;
        //     levelsLogic.guildID = msg.guild.id;
        //     levelsLogic.xp =
        //         levelsLogic.xp + Math.floor(Math.random() * 13) + 1;
        //     levelsLogic.level = levelsLogic.level;

        //     // Level logic -

        //     let requiredXP =
        //         5 * (levelsLogic.level ^ 2) +
        //         50 * levelsLogic.level +
        //         100 -
        //         levelsLogic.xp;
        //     if (levelsLogic.xp >= requiredXP) {
        //         levelsLogic.level = levelsLogic.level + 1;
        //     }

        //     // Save data to database -

        //     await repo.save(levelsLogic);
        // });

        this.logger.verbose("Attached event listeners");
    }

    protected async extractCommand(m: Message) {
        if (!m.guild) {
            return;
        }

        let prefix = botPrefix;
        const cachedPrefix = this.guildPrefixCache.get(m.guild.id);

        if (cachedPrefix) {
            prefix = cachedPrefix;
        } else {
            const repo = this.connection.getRepository(ServerPrefix);
            const retrievedPrefix = await repo.findOne(m.guild.id);

            if (retrievedPrefix) {
                prefix = retrievedPrefix.prefix;
            }
            this.guildPrefixCache.set(m.guild.id, prefix);
        }

        if (!m.content.startsWith(prefix)) {
            return;
        }

        const args = m.content.slice(prefix.length).trim().split(" ");
        const command = this.commands.get(args[0]);

        if (!command) {
            this.logger.debug("Command not found: ", args[0]);
            return;
        }

        if (command.options.guildOnly && !m.guild) {
            return;
        }

        this.logger.info(
            `${m.author.tag} (${m.author.id}) => ${
                command.options.name
            } ${args.slice(1).join(" ")}`
        );

        return command.run(m, args.slice(1)).catch((err) => {
            this.logger.error(
                `Error while running command '${command.options.name}':`
            );
            console.error(err);
        });
    }
}
