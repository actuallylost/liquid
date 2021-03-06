import { MessageEmbed, TextChannel } from "discord.js";

import { sendErrorEmbed } from "../../errors";
import { ExtendedClient } from "../../lib/Client";
import { Command, DefiniteGuildMessage } from "../../lib/Command";

export class remind extends Command {
  constructor(client: ExtendedClient) {
    super(client, {
      name: "remind",
      guildOnly: true,
      description: "Allows a user to put a reminder with a reason.",
    });
  }
  async run(message: DefiniteGuildMessage, args: string[]) {}
}
