import { MessageEmbed } from "discord.js";

import { sendErrorEmbed } from "../../errors";
import { ExtendedClient } from "../../lib/Client";
import { Command, DefiniteGuildMessage } from "../../lib/Command";

export class ServerLock extends Command {
  constructor(client: ExtendedClient) {
    super(client, {
      name: "slock",
      guildOnly: true,
      description: "Locks or unlocks the server.",
    });
  }

  async run(message: DefiniteGuildMessage, args: string[]) {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      return sendErrorEmbed(
        message.channel,
        ":x: Oops! You don't have permissions to run this command."
      );
    }
    if (!message.guild.roles.everyone.permissions.has("SEND_MESSAGES")) {
      const unlockEmbed = new MessageEmbed()
        .setTitle(`Server Unlocked`)
        .setColor("#d91818")
        .setDescription(
          `:white_check_mark: Issue has been handled, you can now chat again.`
        )
        .setFooter("Liquid", this.client.user?.avatarURL() || undefined)
        .setTimestamp();
      await message.guild.roles.everyone.setPermissions(["SEND_MESSAGES"]);
      message.channel.send(unlockEmbed);
    } else {
      const lockEmbed = new MessageEmbed()
        .setTitle(`Server Locked`)
        .setColor("#d91818")
        .setDescription(
          `:white_check_mark: Please wait while our Staff Team handles the issue.`
        )
        .setFooter("Liquid", this.client.user?.avatarURL() || undefined)
        .setTimestamp();
      const update = message.guild.roles.everyone.permissions.remove(
        "SEND_MESSAGES"
      );
      console.log(
        message.guild.roles.everyone.permissions.has("SEND_MESSAGES")
      );
      await message.guild.roles.everyone.setPermissions(update);
      return message.channel.send(lockEmbed);
    }
  }
}
