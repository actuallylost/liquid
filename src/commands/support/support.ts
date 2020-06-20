import { MessageEmbed, TextChannel } from "discord.js";

import { sendErrorEmbed } from "../../errors";
import { ExtendedClient } from "../../lib/Client";
import { Command, DefiniteGuildMessage } from "../../lib/Command";

export class support extends Command {
  constructor(client: ExtendedClient) {
    super(client, { name: "support", guildOnly: true });
  }

  async run(message: DefiniteGuildMessage, args: string[]) {
    const issueReason = args[0];
    if (!issueReason) {
      return message.channel.send(
        ":x: Oops! It seems like you forgot to input an issue. Format is `+support <issue>`."
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
      .addField("Issue »", issueReason)
      .setFooter("Liquid", this.client.user?.avatarURL() || undefined)
      .setTimestamp();

    const confirmEmbed = new MessageEmbed()
      .setColor("#03bc22")
      .addField(
        "Success!",
        `:white_check_mark: Issue successfully submitted, the developer will review it as soon as possible, and investigate!`
      )
      .setFooter("Liquid", this.client.user?.avatarURL() || undefined)
      .setTimestamp();

    message.delete({ timeout: 400 }).catch((err) => null);
    message.author.send(confirmEmbed);
    return (message.guild.channels.cache.get(
      "629050917680971776"
    ) as TextChannel).send(issueEmbed);
  }
}
