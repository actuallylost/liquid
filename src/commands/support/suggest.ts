import { MessageEmbed, TextChannel } from "discord.js";

import { Suggestion } from "../../entities/Suggestion";
import { sendErrorEmbed } from "../../errors";
import { ExtendedClient } from "../../lib/Client";
import { Command, DefiniteGuildMessage } from "../../lib/Command";

export class suggest extends Command {
    constructor(client: ExtendedClient) {
        super(client, {
            name: "suggest",
            guildOnly: true,
            description:
                "Allows a user to suggest features or changes for Liquid.",
        });
    }

    async run(message: DefiniteGuildMessage, args: string[]) {
        const suggestion = args.slice(1).join(" ");
        if (!suggestion) {
            return sendErrorEmbed(
                message.channel,
                ":x: Oops! It seems like you forgot to input a suggestion. Format is `+suggest <suggestion>`."
            );
        }

        const suggestionEmbed = new MessageEmbed()
            .setTitle("Suggestion »")
            .setColor("#c91010")
            .addField(
                "Submitted By »",
                `${message.author} with ID: ${message.author.id}`
            )
            .addField("Server »", message.guild)
            .addField("Channel »", message.channel)
            .addField("Time »", message.createdAt)
            .addField("Suggestion »", suggestion)
            .setFooter("Liquid", this.client.user?.avatarURL() || undefined)
            .setTimestamp();

        const repo = this.client.connection.getRepository(Suggestion);
        const storedSuggestion = new Suggestion();
        storedSuggestion.content = suggestion;

        await repo.save(storedSuggestion);

        suggestionEmbed.addField("ID »", storedSuggestion.id);

        const confirmEmbed = new MessageEmbed()
            .setColor("#03bc22")
            .addField(
                "Success!",
                `:white_check_mark: Suggestion successfully submitted, the developer will review it as soon as possible!.`
            )
            .setFooter("Liquid", this.client.user?.avatarURL() || undefined)
            .setTimestamp();

        message.delete({ timeout: 400 }).catch((err) => null);
        message.author.send(confirmEmbed);
        return (message.guild?.channels.cache.get(
            "724252807473004564"
        ) as TextChannel).send(suggestionEmbed);
    }
}
