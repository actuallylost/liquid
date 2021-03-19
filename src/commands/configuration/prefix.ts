import * as Discord from "discord.js";

import { ServerPrefix } from "../../entities/ServerPrefix";
import { sendErrorEmbed } from "../../errors";
import { ExtendedClient } from "../../lib/Client";
import { Command, DefiniteGuildMessage } from "../../lib/Command";

export class Prefix extends Command {
    constructor(client: ExtendedClient) {
        super(client, {
            name: "prefix",
            guildOnly: true,
            description: "Changes the bot prefix, locally.",
        });
    }

    async run(message: DefiniteGuildMessage, args: string[]) {
        if (!message.member.hasPermission("MANAGE_GUILD")) {
            return sendErrorEmbed(
                message.channel,
                ":x: Oops! You don't have permissions to run this command."
            );
        }

        if (!args[0]) {
            return sendErrorEmbed(
                message.channel,
                ":x: Oops! It seems like you forgot to input a prefix to set. Format is `+prefix <prefix>`."
            );
        }

        if (args[0] === this.client.guildPrefixCache.get(message.guild.id)) {
            return sendErrorEmbed(
                message.channel,
                ":x: Oops! It seems like you entered the same prefix as the one you currently use, try a different one. Format is `+prefix <prefix>`."
            );
        }

        const repo = this.client.connection.getRepository(ServerPrefix);
        const storedPrefix = new ServerPrefix();
        storedPrefix.id = message.guild.id;
        storedPrefix.prefix = args[0];
        await repo.save(storedPrefix);

        this.client.guildPrefixCache.set(message.guild.id, args[0]);

        const prefixEmbed = new Discord.MessageEmbed()
            .setTitle("Prefix Set")
            .setColor("#2bd642")
            .setDescription(
                `:white_check_mark: Roger that chief! Prefix has been set to \`${args[0]}\`.`
            );
        return message.channel.send(prefixEmbed);
    }
}
