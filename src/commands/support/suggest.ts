import { MessageEmbed, TextChannel } from "discord.js";

import { Suggestion } from "../../entities/Suggestion";
import { sendErrorEmbed } from "../../errors";
import { LiquidClient } from "../../lib/Client";
import { Command, DefiniteGuildMessage } from "../../lib/Command";

export class suggest extends Command {
    constructor(client: LiquidClient) {
        super(client, {
            name: "suggest",
            guildOnly: true,
            description:
                "Allows a user to suggest features or changes for Liquid.",
        });
    }

    async run(message: DefiniteGuildMessage, args: string[]) {
        const suggestion = args.slice().join(" ");
        if (!suggestion) {
            return sendErrorEmbed(
                message.channel,
                ":x: Oops! It seems like you forgot to input a suggestion. tion>`."
            );
        }

        const suggestionEmbed = new MessageEmbed()
            .setTitle("Suggestion »")
            .setColor("#c91010")
            .addField(
                "Submitted By »",
                `${message.author} with ID: ${message.author.id}`
            )
            .addField("Server »", message.guild.toString())
            .addField("Channel »", message.channel.toString())
            .addField("Time »", message.createdAt.toString())
            .addField("Suggestion »", suggestion);

        const repo = this.client.connection.getRepository(Suggestion);
        const storedSuggestion = new Suggestion();
        storedSuggestion.content = suggestion;
        storedSuggestion.channel_id = message.channel.id;
        storedSuggestion.guild_id = message.channel.guild.id;
        storedSuggestion.message_id = message.id;
        storedSuggestion.submitter_id = message.author.id;
        // storedSuggestion.id = storedSuggestion.case;

        await repo.save(storedSuggestion);

        suggestionEmbed
            .setFooter(`Suggestion ID: #${storedSuggestion.case}`)
            .setTimestamp();

        const confirmEmbed = new MessageEmbed()
            .setColor("#03bc22")
            .addField(
                "Success!",
                `:white_check_mark: Suggestion successfully submitted, the developer will review it as soon as possible!`
            )
            .setFooter("Liquid", this.client.user?.avatarURL() || undefined)
            .setTimestamp();

        setTimeout(function () {
            message.delete().catch((err) => null);
        }, 400);

        message.author.send({ embeds: [confirmEmbed] });
        return (message.guild.channels.cache.get(
            "629050929064312852"
        ) as TextChannel).send({ embeds: [suggestionEmbed] });
    }
}
