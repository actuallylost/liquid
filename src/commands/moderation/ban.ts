import { MessageEmbed } from "discord.js";

import { sendErrorEmbed } from "../../errors";
import { ExtendedClient } from "../../lib/Client";
import { Command, DefiniteGuildMessage } from "../../lib/Command";

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
     */
    async run(message: DefiniteGuildMessage, args: string[]) {
        const prefix = this.client.guildPrefixCache.get(message.guild.id);

        if (!message.member.permissions.has("BAN_MEMBERS")) {
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

        const userToBan = message.mentions.members?.first();
        if (!userToBan) {
            return sendErrorEmbed(
                message.channel,
                `:x: Oops! That user doesn't exist, maybe you typed something wrong? Format is \`${prefix}ban <user> [reason]\`.`
            );
        }

        if (userToBan === message.member) {
            return sendErrorEmbed(
                message.channel,
                ":x: Oops! You cannot ban yourself dummy!"
            );
        }

        if (!userToBan.bannable) {
            return sendErrorEmbed(
                message.channel,
                ":x: Oops! This user cannot be banned."
            );
        }

        const reason = args[2];

        const banReason = new MessageEmbed()
            .setTitle(`${userToBan.user.username} was successfully banned`)
            .setColor("#2bd642")
            .setDescription(
                `:white_check_mark: Gotcha! ${userToBan} has been banned${
                    reason ? ` for reason ${reason}` : ""
                }.`
            )
            .setFooter("Liquid", this.client.user?.avatarURL() || undefined)
            .setTimestamp();

        const banDM = new MessageEmbed()
            .setTitle(`You have been banned from ${message.guild}`)
            .setColor("#2bd642")
            .addField(`Reason: `, reason)
            .setFooter("Liquid", this.client.user?.avatarURL() || undefined)
            .setTimestamp();

        userToBan.send({embeds: [banDM]});
        userToBan.ban({ reason });
    return message.channel.send({embeds: [banReason]});
    }
}
