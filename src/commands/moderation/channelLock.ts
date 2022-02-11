import { MessageEmbed } from "discord.js";

import { sendErrorEmbed } from "../../errors";
import { LiquidClient } from "../../lib/Client";
import { Command, DefiniteGuildMessage } from "../../lib/Command";

export class ChannelLock extends Command {
    constructor(client: LiquidClient) {
        super(client, {
            name: "clock",
            guildOnly: true,
            description: "Locks or unlocks a channel.",
        });
    }

    async run(message: DefiniteGuildMessage, args: string[]) {
        if (!message.member.permissions.has("MANAGE_MESSAGES")) {
            return sendErrorEmbed(
                message.channel,
                ":x: Oops! You don't have permissions to run this command."
            );
        }

        if (
            !message.channel
                .permissionsFor(message.guild.roles.everyone)
                ?.has("SEND_MESSAGES")
        ) {
            const unlockEmbed = new MessageEmbed()
                .setTitle(`Channel Unlocked`)
                .setColor("#d91818")
                .setDescription(
                    `:white_check_mark: Issue has been handled, you can now chat again.`
                )
                .setFooter("Liquid", this.client.user?.avatarURL() || undefined)
                .setTimestamp();
            await message.channel.permissionOverwrites.edit(
                message.guild.roles.everyone,
                {
                    SEND_MESSAGES: true,
                }
            );
            return message.reply({ embeds: [unlockEmbed] });
        } else {
            const lockEmbed = new MessageEmbed()
                .setTitle(`Channel Locked`)
                .setColor("#d91818")
                .setDescription(
                    `:white_check_mark: Please wait while our Staff Team handles the issue.`
                )
                .setFooter("Liquid", this.client.user?.avatarURL() || undefined)
                .setTimestamp();
            await message.channel.permissionOverwrites.edit(
                message.guild.roles.everyone,
                {
                    SEND_MESSAGES: false,
                }
            );
            return message.reply({ embeds: [lockEmbed] });
        }
    }
}
