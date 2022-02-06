
import { MessageEmbed } from "discord.js";
import { Infraction } from "../../entities/Infraction";

import { sendErrorEmbed } from "../../errors";
import { ExtendedClient } from "../../lib/Client";
import { Command, DefiniteGuildMessage } from "../../lib/Command";
import { InfractionType } from "./InfractionTypes";

export class timeout extends Command {
    constructor(client: ExtendedClient) {
        super(client, {
            name: "timeout",
            guildOnly: true,
            description: "Times out a specified user.",
        });
    }

    /**
     * Timeout a user
     * @param member Timed out user
     * @param reason Timeout reason
     * @param duration Timeout duration
     */
    async run(message: DefiniteGuildMessage, args: string[]) {
        const member = message.guild.members.cache.get(args[0])
            ? message.guild.members.cache.get(args[0])
            : message.mentions.members?.first();

        const prefix = this.client.guildPrefixCache.get(message.guild.id);
        const duration = args[1];
        const reason = args.slice(2).join(" ") || "None";
        

        if (!args[0]) {
            return sendErrorEmbed(
                message.channel,
                `:x: Oops! It seems like you forgot to input a user to time out. Format is \`${prefix}timeout <user> <duration> [reason]\`.`
            );
        }

        if (!member) {
            return sendErrorEmbed(
                message.channel,
                `:x: Oops! That user doesn't exist, maybe you typed something wrong? Format is \`${prefix}timeout <user> <duration> [reason]\`.`
            );
        }

        if (member === message.member) {
            return sendErrorEmbed(
                message.channel,
                ":x: Oops! You cannot timeout yourself!"
            );
        }

        if (!duration) {
            return sendErrorEmbed(
                message.channel,
                `:x: Oops! Looks like you forgot to enter a duration! Format is \`${prefix}timeout <user> <duration> [reason]\`.`
            );
        }

        if (isNaN(parseInt(duration))) {
            return sendErrorEmbed(
                message.channel,
                `:x: Oops! The duration you entered is not a number! Format is \`${prefix}timeout <user> <duration> [reason]\`.`
            );
        }

        const timeoutEmbed = new MessageEmbed()
            .setTitle(`${member.user.username} was successfully timeoutd`)
            .setColor("#2bd642")
            .setDescription(
                `:white_check_mark: Gotcha! ${member} has been timed out temporarily for ${duration} seconds with reason \`${reason}\`.`
            )
            .setFooter("Liquid", this.client.user?.avatarURL() || undefined)
            .setTimestamp();

        const timeoutDM = new MessageEmbed()
            .setTitle(`You have been timed out in ${message.guild}`)
            .setColor("#2bd642")
            .addField(`Reason: `, reason)
            .addField("Duration: ", duration)
            .setFooter("Liquid", this.client.user?.avatarURL() || undefined)
            .setTimestamp();
        
        const timeoutDuration = parseInt(duration) * 1000;

        const repo = this.client.connection.getRepository(Infraction);
        const storedTimeout = new Infraction();
        storedTimeout.inf_type = InfractionType.TIMEOUT;
        storedTimeout.offender_id = member.id;
        storedTimeout.moderator_id = message.member.id;
        storedTimeout.guild_id = message.guild.id;
        storedTimeout.reason = reason;
        await repo.save(storedTimeout);

        member.send({embeds: [timeoutDM]});
        member.timeout(timeoutDuration, reason);
        return message.reply({embeds: [timeoutEmbed]});
    }
}