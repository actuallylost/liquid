import { Client, Message, MessageEmbed } from "discord.js";
import { Infraction } from "../../entities/Infraction";

import { sendErrorEmbed } from "../../errors";
import { LiquidClient } from "../../lib/Client";
import { Command, DefiniteGuildMessage } from "../../lib/Command";
import { InfractionType } from "./InfractionTypes";

export class kick extends Command {
    constructor(client: LiquidClient) {
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
        if (!message.member.permissions.has("KICK_MEMBERS")) {
            return sendErrorEmbed(
                message.channel,
                ":x: Oops! You don't have permissions to run this command."
            );
        }

        const member = message.guild.members.cache.get(args[0])
            ? message.guild.members.cache.get(args[0])
            : message.mentions.members?.first();

        const reason = args.slice(2).join(" ") || "None";

        if (!member) {
            return sendErrorEmbed(
                message.channel,
                `:x: Oops! That user doesn't exist, maybe you typed something wrong? user> [reason]\`.`
            );
        }

        if (member === message.member) {
            return sendErrorEmbed(
                message.channel,
                ":x: Oops! You cannot kick yourself dummy!"
            );
        }

        if (!member.kickable) {
            return sendErrorEmbed(
                message.channel,
                ":x: Oops! That user is not able to be kicked."
            );
        }

        const kickEmbedReason = new MessageEmbed()
            .setTitle(`${member.user.username} was successfully kicked`)
            .setColor("#2bd642")
            .setDescription(
                `:white_check_mark: Gotcha! ${member} has been kicked for ${reason}.`
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

        member.send({ embeds: [kickDM] });
        member.kick();
        return message.reply({ embeds: [kickEmbedReason] });
    }
}
