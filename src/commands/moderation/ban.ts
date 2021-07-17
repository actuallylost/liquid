import { MessageEmbed } from "discord.js";
import { Infraction } from "../../entities/Infraction";

import { sendErrorEmbed } from "../../errors";
import { ExtendedClient } from "../../lib/Client";
import { Command, DefiniteGuildMessage } from "../../lib/Command";
import { InfractionType } from "./InfractionTypes";

export class ban extends Command {
    constructor(client: ExtendedClient) {
        super(client, {
            name: "ban",
            guildOnly: true,
            description: "Bans a specified user.",
        });
    }

    /**
     * Ban a user.
     * @param userToBan Banned user.
     * @param reason Banning reason.
     */
    async run(message: DefiniteGuildMessage, args: string[]) {
        const userToBan = message.guild.members.cache.get(args[0])
            ? message.guild.members.cache.get(args[0])
            : message.mentions.members?.first();

        const prefix = this.client.guildPrefixCache.get(message.guild.id);
        const reason = args[2] || "None";

        if (!message.member.hasPermission("BAN_MEMBERS")) {
            return sendErrorEmbed(
                message.channel,
                ":x: Oops! You don't have permissions to run this command."
            );
        }

        if (!args[0]) {
            return sendErrorEmbed(
                message.channel,
                `:x: Oops! It seems like you forgot to input a user to ban. Format is \`${prefix}ban <user> [reason]\`.`
            );
        }

        if (!userToBan) {
            return sendErrorEmbed(
                message.channel,
                `:x: Oops! That user doesn't exist, maybe you typed something wrong? Format is \`${prefix}ban <user> [reason]\`.`
            );
        }

        if (userToBan === message.member) {
            return sendErrorEmbed(
                message.channel,
                ":x: Oops! You cannot ban yourself!"
            );
        }

        if (!userToBan.bannable) {
            return sendErrorEmbed(
                message.channel,
                ":x: Oops! This user cannot be banned."
            );
        }

        const banReason = new MessageEmbed()
            .setTitle(`${userToBan.user.username} was successfully banned`)
            .setColor("#2bd642")
            .setDescription(
                `:white_check_mark: Gotcha! ${userToBan} has been banned for reason ${reason}.`
            )
            .setFooter("Liquid", this.client.user?.avatarURL() || undefined)
            .setTimestamp();

        const banDM = new MessageEmbed()
            .setTitle(`You have been banned from ${message.guild}`)
            .setColor("#2bd642")
            .addField(`Reason: `, reason)
            .setFooter("Liquid", this.client.user?.avatarURL() || undefined)
            .setTimestamp();

        const repo = this.client.connection.getRepository(Infraction);
        const storedBan = new Infraction();
        storedBan.inf_type = InfractionType.BAN;
        storedBan.offender_id = userToBan.id;
        storedBan.moderator_id = message.member.id;
        storedBan.guild_id = message.guild.id;
        storedBan.reason = reason;
        await repo.save(storedBan);

        userToBan.send(banDM);
        userToBan.ban({ reason });
        return message.channel.send(banReason);
    }
}
