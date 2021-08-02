import { Client, Message, MessageEmbed } from "discord.js";
import { Infraction } from "../../entities/Infraction";

import { sendErrorEmbed } from "../../errors";
import { ExtendedClient } from "../../lib/Client";
import { Command, DefiniteGuildMessage } from "../../lib/Command";
import { InfractionType } from "./InfractionTypes";

export class kick extends Command {
    constructor(client: ExtendedClient) {
        super(client, {
            name: "kick",
            guildOnly: true,
            description: "Kicks a user.",
        });
    }

    /**
     * Kick a user.
     */
    async run(message: DefiniteGuildMessage, args: string[]) {
        const member = message.guild.members.cache.get(args[0])
            ? message.guild.members.cache.get(args[0])
            : message.mentions.members?.first();

        const prefix = this.client.guildPrefixCache.get(message.guild.id);
        const reason = args[2] || "None";

        if (!message.member.hasPermission("KICK_MEMBERS")) {
            return sendErrorEmbed(
                message.channel,
                ":x: Oops! You don't have permissions to run this command."
            );
        }

        if (!args[0]) {
            return sendErrorEmbed(
                message.channel,
                `:x: Oops! It seems like you forgot to input a user to kick. Format is \`${prefix}kick <user> [reason]\`.`
            );
        }

        if (!member) {
            return sendErrorEmbed(
                message.channel,
                `:x: Oops! That user doesn't exist, maybe you typed something wrong? Format is \`${prefix}kick <user> [reason]\`.`
            );
        }

        if (member === message.member) {
            return sendErrorEmbed(
                message.channel,
                `:x: Oops! You cannot kick yourself!`
            );
        }

        if (!member.kickable) {
            return sendErrorEmbed(
                message.channel,
                `:x: Oops! That user is not able to be kicked.`
            );
        }

        const kickEmbedReason = new MessageEmbed()
            .setTitle(`${member.user.username} was successfully kicked`)
            .setColor("#2bd642")
            .setDescription(
                `:white_check_mark: Gotcha! ${member} has been kicked with reason ${reason}.`
            )
            .setFooter("Liquid", this.client.user?.avatarURL() || undefined)
            .setTimestamp();

        const kickDM = new MessageEmbed()
            .setTitle(`You have been kicked from ${message.guild}`)
            .setColor("#2bd642")
            .addField(`Reason: `, reason)
            .setFooter("Liquid", this.client.user?.avatarURL() || undefined)
            .setTimestamp();

        const repo = this.client.connection.getRepository(Infraction);
        const storedKick = new Infraction();
        storedKick.inf_type = InfractionType.KICK;
        storedKick.offender_id = member.id;
        storedKick.moderator_id = message.member.id;
        storedKick.guild_id = message.guild.id;
        storedKick.reason = reason;
        await repo.save(storedKick);

        member.send(kickDM);
        member.kick(reason);
        return message.channel.send(kickEmbedReason);
    }
}
