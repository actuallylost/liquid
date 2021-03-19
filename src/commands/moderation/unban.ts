import { MessageEmbed } from "discord.js";

import { sendErrorEmbed } from "../../errors";
import { ExtendedClient } from "../../lib/Client";
import { Command, DefiniteGuildMessage } from "../../lib/Command";

export class unban extends Command {
    constructor(client: ExtendedClient) {
        super(client, {
            name: "unban",
            guildOnly: true,
            description: "Unbans a specified user.",
        });
    }

    /**
     * Unban a user.
     */
    async run(message: DefiniteGuildMessage, args: string[]) {
        const member = message.guild.members.cache.get(args[0])
            ? message.guild.members.cache.get(args[0])
            : message.mentions.members?.first();

        const prefix = this.client.guildPrefixCache.get(message.guild.id);

        if (!member) {
            return sendErrorEmbed(
                message.channel,
                `:x: Oops! It seems like you forgot to input a user to unban. Format is \`${prefix}unban <user>\``
            );
        }

        try {
            await message.guild.members.unban(member);
            message.channel.send(
                `:white_check_mark: Gotcha! ${member} has been unbanned.`
            );
        } catch (err) {
            return sendErrorEmbed(
                message.channel,
                ":x: Oops! Could not unban that user."
            );
        }
    }
}
