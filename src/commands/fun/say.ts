import * as Discord from "discord.js";

import { sendErrorEmbed } from "../../errors";
import { LiquidClient } from "../../lib/Client";
import { Command, DefiniteGuildMessage } from "../../lib/Command";

export class say extends Command {
    constructor(client: LiquidClient) {
        super(client, {
            name: "say",
            guildOnly: true,
            description:
                "[DEVELOPER ONLY] Makes the bot say a specified message.",
        });
    }

    /**
     * Sends a message that a user provides.
     */
    async run(message: DefiniteGuildMessage, args: string[]) {
        const OWNER_ID = process.env.OWNER_ID;

        if (message.author.id !== OWNER_ID) {
            return sendErrorEmbed(
                message.channel,
                ":x: Sorry, you have to be the bot owner to use this command!"
            );
        }
        if (args.length < 1) {
            return sendErrorEmbed(
                message.channel,
                ":x: Oh noes! Looks like you haven't specified what message to send. The "
            );
        }

        setTimeout(function () {
            message.delete().catch((err) => null);
        }, 400);

        message.reply(args.join(" "));
    }
}
