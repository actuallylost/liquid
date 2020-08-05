import { MessageEmbed, TextChannel, Message } from "discord.js";

import { sendErrorEmbed } from "../../errors";
import { ExtendedClient } from "../../lib/Client";
import { Command, DefiniteGuildMessage } from "../../lib/Command";

export class help extends Command {
  constructor(client: ExtendedClient) {
    super(client, {
      name: "help",
      guildOnly: true,
      description: "Provides information on all of the commands.",
    });
  }

  /**
   * Provides information on all of the commands.
   */
  async run(message: DefiniteGuildMessage, args: string[]) {
    const helpEmbed = new MessageEmbed()
      .setTitle("Command List »")
      .setColor("#006bd6")
      .setFooter("Liquid", this.client.user?.avatarURL() || undefined)
      .setTimestamp();

    this.client.commands.map((v) =>
      helpEmbed.addField(v.options.name, v.options.description)
    );
    return message.channel.send(helpEmbed);
  }
}
