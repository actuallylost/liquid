import * as Discord from "discord.js";

import { sendErrorEmbed } from "../../errors";
import { ExtendedClient } from "../../lib/Client";
import { Command, DefiniteGuildMessage } from "../../lib/Command";

export class Clear extends Command {
    constructor(client: ExtendedClient) {
        super(client, {
            name: "clear",
            guildOnly: true,
            description:
                "Clears an amount of messages in a channel, or messages of a specified user.",
        });
    }

    async run(message: DefiniteGuildMessage, args: string[]) {
        if (!message.member.permissions.has("MANAGE_MESSAGES")) {
            return sendErrorEmbed(
                message.channel,
                ":x: Oops! You don't have permissions to run this command."
            );
        }

        if (!args[0]) {
            return sendErrorEmbed(
                message.channel,
                ":x: Oh noes! Looks like you haven't specified how many messages to clear. The format is `+clear <amount> [user]`."
            );
        }

        const messagesToDelete = parseInt(args[0], 10);
        if (isNaN(messagesToDelete)) {
            return sendErrorEmbed(
                message.channel,
                ":x: Oh noes! Looks like you haven't input a number. The format is `+clear <amount> [user]`."
            );
        }

        const userToClear = message.mentions.members?.first();

        if (!userToClear) {
            // Non-User Clear -
            message.channel.bulkDelete(messagesToDelete + 1);

            const clearEmbed = new Discord.MessageEmbed()
                .setTitle("Clear Successful")
                .setColor("#2bd642")
                .setDescription(
                    `:white_check_mark: Roger that chief! Cleared ${messagesToDelete} messages.`
                );
        message.channel.send({embeds: [clearEmbed]});
        } else {
            // User Clear -
            message.channel.bulkDelete(messagesToDelete + 1);

            await message.channel.messages
                .fetch()
                .then((messages) =>
                    messages.filter((v) => v.author.id === userToClear.id)
                );

            const clearEmbedUser = new Discord.MessageEmbed()
                .setTitle("Clear Successful")
                .setColor("#2bd642")
                .setDescription(
                    `:white_check_mark: Roger that chief! Cleared ${messagesToDelete} of ${userToClear}'s messages.`
                );
            return message.channel.send({embeds: [clearEmbedUser]});
        }

        // User Clear -

        // if (userToClear) {
        //     return sendErrorEmbed(
        //         message.channel,
        //         ":x: Oops! That user doesn't exist, maybe you typed something wrong? Format is `+clear <amount> [user]`."
        //     );
        // }
    }
}
