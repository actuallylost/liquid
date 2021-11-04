import { MessageEmbed, TextChannel } from "discord.js";

import { sendErrorEmbed } from "../../errors";
import { ExtendedClient } from "../../lib/Client";
import { Command, DefiniteGuildMessage } from "../../lib/Command";

export class announce extends Command {
  constructor(client: ExtendedClient) {
    super(client, {
      name: "announce",
      guildOnly: true,
      description: "Announces a message in a specified channel.",
    });
  }

  /**
   * Announces a message in a specified channel.
   */
  async run(message: DefiniteGuildMessage, args: string[]) {
    const annChannel = message.mentions.channels.first()?.id;
    if (!annChannel) {
      return sendErrorEmbed(
        message.channel,
        ":x: Oops! It seems like you forgot to input a channel to send a message to. Format is `+announce <channel> <message>`."
      );
    }
    const annMessage = args.slice(1).join(" ");
    if (!annMessage) {
      return sendErrorEmbed(
        message.channel,
        ":x: Oops! It seems like you forgot to input a message to send. Format is `+announce <channel> <message>`."
      );
    }
    const annSend = new MessageEmbed()
      .setColor("#85fff9")
      .addField("Announcement »", annMessage)
      .setFooter("Liquid", this.client.user?.avatarURL() || undefined)
      .setTimestamp();

    const annConfirm = new MessageEmbed()
      .setColor("#03bc22")
      .addField(
        "Success!",
        `:white_check_mark: Announcement has been sent, please check ${annChannel}.`
      )
      .setFooter("Liquid", this.client.user?.avatarURL() || undefined)
      .setTimestamp();
    
    setTimeout(function() {
      message.delete().catch((err) => null);
    }, 400);

    message.reply({embeds: [annConfirm]});
    return (message.guild?.channels.cache.get(annChannel) as TextChannel).send(
      {embeds: [annSend]}
    );
  }
}
