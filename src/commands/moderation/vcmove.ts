
import { DiscordAPIError, MessageEmbed, VoiceChannel } from "discord.js";

import { sendErrorEmbed } from "../../errors";
import { ExtendedClient } from "../../lib/Client";
import { Command, DefiniteGuildMessage } from "../../lib/Command";

export class vcmove extends Command {
    constructor(client: ExtendedClient) {
        super(client, {
            name: "vcmove",
            guildOnly: true,
            description: "Moves users from a vc to another.",
        });
    }

    /**
     * Move users from a vc to another
     * @param channel Channel to move to
     */
    async run(message: DefiniteGuildMessage, args: string[]) {
        const channel = message.guild.channels.cache.get(args[0]);

        const prefix = this.client.guildPrefixCache.get(message.guild.id);

        if (!args[0]) {
            return sendErrorEmbed(
                message.channel,
                `:x: Oops! It seems like you forgot to enter a channel to move to. Format is \`${prefix}vcmove <channel>\`.`
            );
        }

        if (!channel) {
            return sendErrorEmbed(
                message.channel,
                `:x: Oops! That channel doesn't exist, maybe you typed something wrong? Format is \`${prefix}vcmove <channel>\`.`
            );
        }

        if (!(channel.type === "GUILD_VOICE")) {
            return sendErrorEmbed(
                message.channel,
                `:x: Oops! That channel isn't a voice channel, maybe you typed something wrong? Format is \`${prefix}vcmove <channel>\`.`
            );
        }
    }
}