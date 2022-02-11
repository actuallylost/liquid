import { MessageEmbed } from "discord.js";

import { LiquidClient } from "../../lib/Client";
import { Command, DefiniteGuildMessage } from "../../lib/Command";

export class config extends Command {
    constructor(client: LiquidClient) {
        super(client, {
            name: "setting",
            guildOnly: true,
            description: "Allows you to configure the bot to your own liking.",
        });
    }

    /**
     * Allows you to configure the bot to your own liking.
     */
    async run(message: DefiniteGuildMessage, args: string[]) {}
}
