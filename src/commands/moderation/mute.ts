
import { MessageEmbed } from "discord.js";
import { Infraction } from "../../entities/Infraction";

import { sendErrorEmbed } from "../../errors";
import { ExtendedClient } from "../../lib/Client";
import { Command, DefiniteGuildMessage } from "../../lib/Command";
import { InfractionType } from "./InfractionTypes";

export class mute extends Command {
    constructor(client: ExtendedClient) {
        super(client, {
            name: "mute",
            guildOnly: true,
            description: "Mutes a specified user.",
        });
    }

    /**
     * Mute a user.
     * @param member Muted user.
     * @param reason Mute reason.
     * @param duration Duration of mute.
     */
    async run(message: DefiniteGuildMessage, args: string[]) {
        const member = message.guild.members.cache.get(args[0])
            ? message.guild.members.cache.get(args[0])
            : message.mentions.members?.first();

        const prefix = this.client.guildPrefixCache.get(message.guild.id);
        const reason = args[2] || "None";
        const duration = args[3];

        if (!args[0]) {
            return sendErrorEmbed(
                message.channel,
                `:x: Oops! It seems like you forgot to input a user to mute. Format is \`${prefix}mute <user> [duration] [reason]\`.`
            );
        }

        if (!member) {
            return sendErrorEmbed(
                message.channel,
                `:x: Oops! That user doesn't exist, maybe you typed something wrong? Format is \`${prefix}mute <user> [duration] [reason]\`.`
            );
        }

        if (member === message.member) {
            return sendErrorEmbed(
                message.channel,
                ":x: Oops! You cannot mute yourself!"
            );
        }
        const muteEmbed = new MessageEmbed()
            .setTitle(`${member.user.username} was successfully muted`)
            .setColor("#2bd642")
            .setDescription(
                `:white_check_mark: Gotcha! ${member} has been muted with reason \`${reason}\`.`
            )
            .setFooter("Liquid", this.client.user?.avatarURL() || undefined)
            .setTimestamp();

        const muteDM = new MessageEmbed()
            .setTitle(`You have been muted from ${message.guild}`)
            .setColor("#2bd642")
            .addField(`Reason: `, reason)
            .setFooter("Liquid", this.client.user?.avatarURL() || undefined)
            .setTimestamp();

        if (!duration) {
            await message.reply({embeds: [muteEmbed]});
            await member.send({embeds: [muteDM]});
            return;
        } else {
            const durationInSeconds = parseInt(duration);

            if (isNaN(durationInSeconds)) {
                return sendErrorEmbed(
                    message.channel,
                    `:x: Oops! That's not a valid duration! Format is \`${prefix}mute <user> [duration] [reason]\`.`
                );
            }
            // const muteUntil = new Date();
            // muteUntil.setTime(muteUntil.getTime() + durationInSeconds * 1000);
            muteDM.addField("Duration: ", duration);
            muteEmbed.setDescription(
                `:white_check_mark: Gotcha! ${member} has been muted temporarily for ${duration} with reason \`${reason}\`.`
            );
        }

        const repo = this.client.connection.getRepository(Infraction);
        const storedMute = new Infraction();
        storedMute.inf_type = InfractionType.MUTE;
        storedMute.offender_id = member.id;
        storedMute.moderator_id = message.member.id;
        storedMute.guild_id = message.guild.id;
        storedMute.reason = reason;
        await repo.save(storedMute);

        member.send({embeds: [muteDM]});
        return message.reply({embeds: [muteEmbed]});
    }
}