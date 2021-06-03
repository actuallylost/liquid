import { MessageEmbed } from "discord.js";

import { ExtendedClient } from "../../lib/Client";
import { Command, DefiniteGuildMessage } from "../../lib/Command";

export class setting extends Command {
    constructor(client: ExtendedClient) {
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
