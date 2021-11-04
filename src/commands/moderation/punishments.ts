
import { MessageEmbed } from "discord.js";

import { sendErrorEmbed } from "../../errors";
import { ExtendedClient } from "../../lib/Client";
import { Command, DefiniteGuildMessage } from "../../lib/Command";
import { Infraction } from "../../entities/Infraction";

export class punishments extends Command {
    constructor(client: ExtendedClient) {
        super(client, {
            name: "punishments",
            guildOnly: true,
            description:
                "Shows information about the punishments of the specified user.",
        });
    }

    async run(message: DefiniteGuildMessage, args: string[]) {
        const member = message.guild.members.cache.get(args[0])
            ? message.guild.members.cache.get(args[0])
            : message.mentions.members?.first();

        const prefix = this.client.guildPrefixCache.get(message.guild.id);

        if (!member) {
            return sendErrorEmbed(
                message.channel,
                `:x: Oops! It looks like you forgot to input a user. Format is: \`${prefix}punishments <user>\``
            );
        }

        const repo = this.client.connection.getRepository(Infraction);
        const infractions: Infraction = await this.client.getInfraction(
            message.guild.id,
            member.id
        );
        if (!infractions) {
            return sendErrorEmbed(
                message.channel,
                `:x: Oops! It looks like the user has no infractions.`
            );
        }

        if (!member.nickname) {
            return;
        }

        if (!member.joinedAt) {
            return;
        }

        const embed = new MessageEmbed()
            .setColor(0xffb200)
            .setAuthor(`${member.user.username} (${member.id})`)
            .setDescription(`**Username:** ${member.user.username}`)
            .addField("**ID:**", member.id, true)
            .addField("**Nickname:**", member.nickname.toString(), true)
            .addField("**Joined:**", member.joinedAt.toString(), true)
            .addField("**Created At:**", member.user.createdAt.toString(), true)
            .addField("**Reason:**", infractions.reason, true)
            .addField("**Type:**", infractions.inf_type.toString(), true)
            .addField("**Moderator:**", `<@${infractions.moderator_id}>`, true)
            .setFooter("Liquid", this.client.user?.avatarURL() || undefined)
            .setTimestamp();

        message.reply({embeds: [embed]});
    }
}