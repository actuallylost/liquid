import { MessageEmbed } from "discord.js";

import { sendErrorEmbed } from "../../errors";
import { LiquidClient } from "../../lib/Client";
import { Command, DefiniteGuildMessage } from "../../lib/Command";

export class unban extends Command {
    constructor(client: LiquidClient) {
        super(client, {
            name: "unban",
            guildOnly: true,
            description: "Unbans a specified user.",
        });
    }

    /**
     * Unban a user.
     * @param member Unbanned user.
     * @param reason Reason for unban.
     */
    async run(message: DefiniteGuildMessage, args: string[]) {
        const member = message.guild.members.cache.get(args[0])
            ? message.guild.members.cache.get(args[0])
            : message.mentions.members?.first();

        const reason = args.slice(2).join(" ") || "None";

        if (!member) {
            return sendErrorEmbed(
                message.channel,
                `:x: Oops! It seems like you forgot to input a user to unban. <user> [reason]\`.`
            );
        }

        try {
            await message.guild.members.unban(member, reason);
            message.reply(
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
