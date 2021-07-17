import { MessageEmbed } from "discord.js";

import { sendErrorEmbed } from "../../errors";
import { ExtendedClient } from "../../lib/Client";
import { Command, DefiniteGuildMessage } from "../../lib/Command";
import { Infraction } from "../../entities/Infraction";
import { InfractionType } from "./InfractionTypes";

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
        console.log(repo.findOne(member.guild.id));
    }
}
