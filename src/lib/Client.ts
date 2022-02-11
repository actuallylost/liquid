import { Client, ClientUser, Collection, Intents, Message } from "discord.js";
import { Connection, createConnection } from "typeorm";
import { Infraction } from "../entities/Infraction";

import { Command } from "./Command";
import { createLogger } from "./utils/logging";

interface LiquidClientOptions {
    token: string;
}

/**
 * LiquidClient class.
 */
export class LiquidClient {
    getInfraction(guild_id: string, offender_id: string) {
        return this.connection
            .getRepository(Infraction)
            .find({ where: { guild_id, offender_id } });
    }

    readonly logger = createLogger("liquid");

    readonly options: LiquidClientOptions;

    readonly client = new Client({
        intents: [
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_MEMBERS,
            Intents.FLAGS.GUILD_BANS,
            Intents.FLAGS.GUILD_MESSAGES,
            Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
            Intents.FLAGS.GUILD_VOICE_STATES,
        ],
        allowedMentions: { parse: ["users", "roles"], repliedUser: true },
    });

    readonly commands = new Collection<string, Command>();

    declare user: ClientUser;
    connection!: Connection;

    constructor(options?: Partial<LiquidClientOptions>) {
        this.options = { ...options, token: process.env.ACCESS_TOKEN ?? "" };
        this.setupListeners();
        this.logger.level = "silly";
    }

    protected setupListeners() {
        this.client
            .on("ready", () => {
                this.logger.info("Connected to Discord!");
            })
            .on("interactionCreate", async (interaction) => {
                if (!interaction.isCommand()) {
                    return;
                }
                if (interaction.commandName === "banSlash") {
                    await interaction
                        .reply({ content: "Pong!", ephemeral: true })
                        .catch(() => {
                            // noop
                        });
                }
            });
    }

    /**
     * Login function | Starts the bot.
     */
    async login(token = this.options.token) {
        this.logger.info("Connecting to Discord...");
        this.connection = await createConnection();
        await this.client.login(token);
    }
}
