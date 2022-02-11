import { MessageEmbed } from "discord.js";

import { sendErrorEmbed } from "../../errors";
import { LiquidClient } from "../../lib/Client";
import { Command, DefiniteGuildMessage } from "../../lib/Command";

export class slowmode extends Command {
    constructor(client: LiquidClient) {
        super(client, {
            name: "smode",
            guildOnly: true,
            description: "Enables, disables, or modifies the current slowmode.",
        });
    }

    /**
     * Enable slowmode in chat.
     * @param sTime The time in seconds to enable slowmode for.
     */
    async run(message: DefiniteGuildMessage, args: string[]) {
        if (!message.member.permissions.has("MANAGE_CHANNELS")) {
            return sendErrorEmbed(
                message.channel,
                ":x: Oops! You don't have permissions to run this command."
            );
        }
        const sTime = Number(args[0]);
        if (sTime === undefined) {
            return sendErrorEmbed(
                message.channel,
                `:x: Oops! It seems like you forgot to input the slowmode time. <time>\`.`
            );
        }
        if (isNaN(sTime)) {
            return sendErrorEmbed(
                message.channel,
                `:x: Oops! It seems like you did not input a number. <time>\`.`
            );
        }

        if (sTime > 21600) {
            return sendErrorEmbed(
                message.channel,
                `:x: Oops! It seems like you've input a number that exceeds the limit of **21600**. <time>\`.`
            );
        }

        if (sTime < 0) {
            const sDisable = new MessageEmbed()
                .setTitle("Slowmode Disabled »")
                .setColor("#03bc22")
                .setFooter("Liquid", this.client.user?.avatarURL() || undefined)
                .setTimestamp();

            setTimeout(function () {
                message.delete().catch((err) => null);
            }, 400);

            message.reply({ embeds: [sDisable] });
            return message.channel.setRateLimitPerUser(0);
        } else {
            const sSend = new MessageEmbed()
                .setTitle("Slowmode Enabled »")
                .setColor("#03bc22")
                .addField(
                    "Slowmode Time »",
                    `Set to \`${Math.floor(sTime)}\` seconds`
                )
                .setFooter("Liquid", this.client.user?.avatarURL() || undefined)
                .setTimestamp();

            setTimeout(function () {
                message.delete().catch((err) => null);
            }, 400);

            message.reply({ embeds: [sSend] });
            return message.channel.setRateLimitPerUser(sTime);
        }
    }
}
