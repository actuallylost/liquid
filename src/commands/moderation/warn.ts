
import { MessageEmbed } from "discord.js";

import { sendErrorEmbed } from "../../errors";
import { ExtendedClient } from "../../lib/Client";
import { Command, DefiniteGuildMessage } from "../../lib/Command";
import { Infraction } from "../../entities/Infraction";
import { InfractionType } from "./InfractionTypes";

export class warn extends Command {
    constructor(client: ExtendedClient) {
        super(client, {
            name: "warn",
            guildOnly: true,
            description: "Warns a specific user with a reason.",
        });
    }

    /**
     * Warn a user.
     * @param member Warned user.
     * @param reason Warning reason.
     */
    async run(message: DefiniteGuildMessage, args: string[]) {
        const member = message.guild.members.cache.get(args[0])
            ? message.guild.members.cache.get(args[0])
            : message.mentions.members?.first();

        const prefix = this.client.guildPrefixCache.get(message.guild.id);
        const reason = args[1];

        if (!member) {
            return sendErrorEmbed(
                message.channel,
                `:x: Oops! It looks like you forgot to input a user to warn. Format is: \`${prefix}warn <user> <reason>\``
            );
        }

        if (member === message.member) {
            return sendErrorEmbed(
                message.channel,
                `:x: You cannot warn yourself!`
            );
        }

        if (!reason) {
            return sendErrorEmbed(
                message.channel,
                `:x: Oops! It looks like you forgot to input a warning reason. Format is \`${prefix}warn <user> <reason>\`.`
            );
        }

        const warnEmbed = new MessageEmbed()
            .setTitle(`${member.user.username} was successfully warned`)
            .setColor("#2bd642")
            .setDescription(
                `:white_check_mark: Gotcha! ${member} has been warned with reason ${reason}.`
            )
            .setFooter("Liquid", this.client.user?.avatarURL() || undefined)
            .setTimestamp();

        const warnDM = new MessageEmbed()
            .setTitle(`You have been warned in ${message.guild}`)
            .setColor("#2bd642")
            .addField(`Reason: `, reason)
            .setFooter("Liquid", this.client.user?.avatarURL() || undefined)
            .setTimestamp();

        const repo = this.client.connection.getRepository(Infraction);
        const storedWarning = new Infraction();
        storedWarning.inf_type = InfractionType.WARN;
        storedWarning.offender_id = member.id;
        storedWarning.moderator_id = message.member.id;
        storedWarning.guild_id = message.guild.id;
        storedWarning.reason = reason;
        await repo.save(storedWarning);

        member.send({embeds: [warnDM]});
        return message.reply({embeds: [warnEmbed]});
    }
}