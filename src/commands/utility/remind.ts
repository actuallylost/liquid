import { MessageEmbed, TextChannel } from "discord.js";

import { sendErrorEmbed } from "../../errors";
import { LiquidClient } from "../../lib/Client";
import { Command, DefiniteGuildMessage } from "../../lib/Command";

export class remind extends Command {
    constructor(client: LiquidClient) {
        super(client, {
            name: "remind",
            guildOnly: true,
            description: "Allows a user to put a reminder with a reason.",
        });
    }
    async run(message: DefiniteGuildMessage, args: string[]) {}
}
