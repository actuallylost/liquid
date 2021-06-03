import { MessageEmbed } from "discord.js";

import { sendErrorEmbed } from "../../errors";
import { ExtendedClient } from "../../lib/Client";
import { Command, DefiniteGuildMessage } from "../../lib/Command";
import { Warning } from "../../entities/Warning";

export class warn extends Command {
    constructor(client: ExtendedClient) {
        super(client, {
            name: "warn",
            guildOnly: true,
            description: "Warns a specific user ",
        });
    }

    /**
     * Warn a user.
     * @param member Warned user.
     * @param reason Warning reason.
     */
    async run(message: DefiniteGuildMessage, args: string[]) {
        const member = message.guild.members.cache.get(args[0])
            ? message.guild.members.cache.get(args[0])
            : message.mentions.members?.first();

        const prefix = this.client.guildPrefixCache.get(message.guild.id);
        const reason = args[2];

        if (!member) {
            return sendErrorEmbed(
                message.channel,
                `:x: Oops! It looks like you forgot to input a user to warn. Format is: \`${prefix}warn <user> <reason>\``
            );
        }

        if (member === message.member) {
            return sendErrorEmbed(
                message.channel,
                `:x: You cannot warn yourself!`
            );
        }

        if (!reason) {
            return sendErrorEmbed(
                message.channel,
                `:x: Oops! It looks like you forgot to input a warning reason. Format is \`${prefix}warn <user> <reason>\`.`
            );
        }

        const repo = this.client.connection.getRepository(Warning);
        const storedWarning = new Warning();
        storedWarning.user_id = member.id;
        storedWarning.guild_id = message.guild.id;
        storedWarning.reason = reason;
        await repo.save(storedWarning);
    }
}
