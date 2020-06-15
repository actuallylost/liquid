import { MessageEmbed } from "discord.js";

import { sendErrorEmbed } from "../../errors";
import { ExtendedClient } from "../../lib/Client";
import { Command } from "../../lib/Command";
import { DefiniteGuildMessage } from "../../types/Command";

export class ServerLock extends Command {
  constructor(client: ExtendedClient) {
    super(client, { name: "slock", guildOnly: true });
  }

  async run(message: DefiniteGuildMessage, args: string[]) {
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      return sendErrorEmbed(
        message.channel,
        ":x: Oops! You don't have permissions to run this command."
      );
    }
  }
}
