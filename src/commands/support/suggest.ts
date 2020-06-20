import * as Discord from "discord.js";

import { sendErrorEmbed } from "../../errors";
import { ExtendedClient } from "../../lib/Client";
import { Command, DefiniteGuildMessage } from "../../lib/Command";

export class suggest extends Command {
  constructor(client: ExtendedClient) {
    super(client, { name: "suggest", guildOnly: true });
  }

  async run(message: DefiniteGuildMessage, args: string[]) {
    const suggestion = args[0];
    if (!suggestion) {
      return message.channel.send(
        ":x: Oops! It seems like you forgot to input a suggestion. Format is `+suggest <suggestion>`."
      );
    }

    const suggestionEmbed = new Discord.MessageEmbed()
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

    const confirmEmbed = new Discord.MessageEmbed()
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
      "629050929064312852"
    ) as Discord.TextChannel).send(suggestionEmbed);
  }
}
