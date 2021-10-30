import { Client, Message, MessageEmbed } from "discord.js";

import { sendErrorEmbed } from "../../errors";
import { ExtendedClient } from "../../lib/Client";
import { Command, DefiniteGuildMessage } from "../../lib/Command";

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
        if (!message.member.permissions.has("KICK_MEMBERS")) {
            return sendErrorEmbed(
                message.channel,
                ":x: Oops! You don't have permissions to run this command."
            );
        }

        if (!args[0]) {
            return sendErrorEmbed(
                message.channel,
                ":x: Oops! It seems like you forgot to input a user to kick. Format is `+kick <user> [reason]`."
            );
        }

        const userToKick = message.mentions.members?.first();

        if (!userToKick) {
            return sendErrorEmbed(
                message.channel,
                ":x: Oops! That user doesn't exist, maybe you typed something wrong? Format is `+kick <user> [reason]`."
            );
        }

        if (userToKick === message.member) {
            return sendErrorEmbed(
                message.channel,
                ":x: Oops! You cannot kick yourself dummy!"
            );
        }

        if (!userToKick.kickable) {
            return sendErrorEmbed(
                message.channel,
                ":x: Oops! That user is not able to be kicked."
            );
        }

        const kickReason = args[2];
        if (!kickReason) {
            const kickEmbedNoReason = new MessageEmbed()
                .setTitle(`${userToKick.user.username} was successfully kicked`)
                .setColor("#2bd642")
                .setDescription(
                    `:white_check_mark: Gotcha! ${userToKick} has been kicked.`
                )
                .setFooter("Liquid", this.client.user?.avatarURL() || undefined)
                .setTimestamp();
            userToKick.kick();
            return message.channel.send({embeds: [kickEmbedNoReason]});
        }

        const kickEmbedReason = new MessageEmbed()
            .setTitle(`${userToKick.user.username} was successfully kicked`)
            .setColor("#2bd642")
            .setDescription(
                `:white_check_mark: Gotcha! ${userToKick} has been kicked for ${kickReason}.`
            )
            .setFooter("Liquid", this.client.user?.avatarURL() || undefined)
            .setTimestamp();

        const kickDM = new MessageEmbed()
            .setTitle(`You have been kicked from ${message.guild}`)
            .setColor("#2bd642")
            .addField(`Reason: `, kickReason)
            .setFooter("Liquid", this.client.user?.avatarURL() || undefined)
            .setTimestamp();

        userToKick.send({embeds: [kickDM]});
        userToKick.kick();
        return message.channel.send({embeds: [kickEmbedReason]});
    }
}
