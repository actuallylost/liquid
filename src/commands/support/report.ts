import { MessageEmbed, TextChannel } from "discord.js";

import { Issue } from "../../entities/Issue";
import { sendErrorEmbed } from "../../errors";
import { ExtendedClient } from "../../lib/Client";
import { Command, DefiniteGuildMessage } from "../../lib/Command";

export class issue extends Command {
    constructor(client: ExtendedClient) {
        super(client, {
            name: "issue",
            guildOnly: true,
            description: "Allows the user to report an issue with Liquid.",
        });
    }

    async run(message: DefiniteGuildMessage, args: string[]) {
        const issueReason = args.slice().join(" ");
        if (!issueReason) {
            return sendErrorEmbed(
                message.channel,
                ":x: Oops! It seems like you forgot to input an issue. Format is `+issue <issue>`."
            );
        }

        const issueEmbed = new MessageEmbed()
            .setTitle("Issue »")
            .setColor("#c91010")
            .addField(
                "Submitted By »",
                `${message.author} with ID: ${message.author.id}`
            )
            .addField("Server »", message.guild)
            .addField("Channel »", message.channel)
            .addField("Time »", message.createdAt)
            .addField("Issue »", issueReason);

        const repo = this.client.connection.getRepository(Issue);
        const storedIssue = new Issue();
        storedIssue.content = issueReason;
        await repo.save(storedIssue);

        issueEmbed.setFooter(`Issue ID: #${storedIssue.id}`).setTimestamp();

        const confirmEmbed = new MessageEmbed()
            .setColor("#03bc22")
            .addField(
                "Success!",
                `:white_check_mark: Issue \`#${storedIssue.id}\` successfully reported, the developer will review it as soon as possible, and investigate!`
            )
            .setFooter("Liquid", this.client.user?.avatarURL() || undefined)
            .setTimestamp();

        message.delete({ timeout: 400 }).catch((err) => null);
        message.author.send(confirmEmbed);
        return (message.guild.channels.cache.get(
            "724252818688704582"
        ) as TextChannel).send(issueEmbed);
    }
}
