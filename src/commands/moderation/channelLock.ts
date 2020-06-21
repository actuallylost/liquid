import { MessageEmbed } from "discord.js";

import { sendErrorEmbed } from "../../errors";
import { ExtendedClient } from "../../lib/Client";
import { Command, DefiniteGuildMessage } from "../../lib/Command";

export class ChannelLock extends Command {
  constructor(client: ExtendedClient) {
    super(client, { name: "clock", guildOnly: true });
  }

  async run(message: DefiniteGuildMessage, args: string[]) {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      return sendErrorEmbed(
        message.channel,
        ":x: Oops! You don't have permissions to run this command."
      );
    }

    if (
      !message.channel
        .permissionsFor(message.guild.roles.everyone)
        ?.has("SEND_MESSAGES")
    ) {
      const unlockEmbed = new MessageEmbed()
        .setTitle(`Channel Unlocked`)
        .setColor("#d91818")
        .setDescription(
          `:white_check_mark: Issue has been handled, you can now chat again.`
        )
        .setFooter("Liquid", this.client.user?.avatarURL() || undefined)
        .setTimestamp();
      await message.channel.updateOverwrite(message.guild.roles.everyone, {
        SEND_MESSAGES: true,
      });
      return message.channel.send(unlockEmbed);
    } else {
      const lockEmbed = new MessageEmbed()
        .setTitle(`Channel Locked`)
        .setColor("#d91818")
        .setDescription(
          `:white_check_mark: Please wait while our Staff Team handles the issue.`
        )
        .setFooter("Liquid", this.client.user?.avatarURL() || undefined)
        .setTimestamp();
      await message.channel.updateOverwrite(message.guild.roles.everyone, {
        SEND_MESSAGES: false,
      });
      return message.channel.send(lockEmbed);
    }
  }
}
