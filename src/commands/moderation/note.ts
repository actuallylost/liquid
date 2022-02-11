import { Client, Message, MessageEmbed } from "discord.js";
import { Infraction } from "../../entities/Infraction";

import { sendErrorEmbed } from "../../errors";
import { LiquidClient } from "../../lib/Client";
import { Command, DefiniteGuildMessage } from "../../lib/Command";
import { InfractionType } from "./InfractionTypes";

export class note extends Command {
    constructor(client: LiquidClient) {
        super(client, {
            name: "note",
            guildOnly: true,
            description: "Adds a note to a user.",
        });
    }
    /**
     * Executes the command
     * @param msg Message with the command content.
     * @param args Command arguments.
     * @returns {Promise<Message | Message[]>}
     */
    async run(message: DefiniteGuildMessage, args: string[]) {
        const member = message.guild.members.cache.get(args[0])
            ? message.guild.members.cache.get(args[0])
            : message.mentions.members?.first();

        const reason = args.slice(1).join(" ") || "None";

        if (!member) {
            return sendErrorEmbed(
                message.channel,
                `:x: Oops! That user doesn't exist, maybe you typed something wrong? user> [reason]\`.`
            );
        }

        if (member === message.member) {
            return sendErrorEmbed(
                message.channel,
                `:x: Oops! You cannot add a note to yourself!`
            );
        }

        const repo = this.client.connection.getRepository(Infraction);
        const storedNote = new Infraction();
        storedNote.inf_type = InfractionType.NOTE;
        storedNote.offender_id = member.id;
        storedNote.moderator_id = message.member.id;
        storedNote.guild_id = message.guild.id;
        storedNote.reason = reason;
        // storedNote.createdAt = Date.now()/1000;
        await repo.save(storedNote);

        const embed = new MessageEmbed()
            .setAuthor(message.author.tag)
            .setColor(0xff0000)
            .setDescription(`Note added by ${message.author.tag}`)
            .addField("Reason", reason, true)
            .setFooter("Liquid", this.client.user?.avatarURL() || undefined)
            .setTimestamp();
        return message.reply({ embeds: [embed] });
    }
}
