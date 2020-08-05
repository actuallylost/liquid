import { MessageEmbed } from "discord.js";

import { ExtendedClient } from "../../lib/Client";
import { Command, DefiniteGuildMessage } from "../../lib/Command";

export class info extends Command {
  constructor(client: ExtendedClient) {
    super(client, {
      name: "info",
      guildOnly: true,
      description: "Provides information about a user.",
    });
  }

  async run(message: DefiniteGuildMessage, args: string[]) {
    const infoEmbed = new MessageEmbed()
      .setTitle("User Information")
      .setColor("#4de8e8")
      .addField("User:", message.author.tag)
      .addField("ID:", message.author.id)
      .addField(
        "Roles:",
        message.member?.roles.cache.map((r) => `<@${r.id}>`).join(", ") ||
          "None"
      )
      .addField("Created at:", message.author.createdAt)
      .addField("Joined at", message.member?.joinedAt)
      .setFooter(
        `Requested by ${message.author.tag}`,
        message.author.avatarURL() || undefined
      )
      .setTimestamp();
    return message.channel.send(infoEmbed);
  }
}
