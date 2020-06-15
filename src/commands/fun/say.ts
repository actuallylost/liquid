import * as Discord from "discord.js";

import { ownerID } from "../../env";
import { sendErrorEmbed } from "../../errors";
import { ExtendedClient } from "../../lib/Client";
import { Command } from "../../lib/Command";
import { DefiniteGuildMessage } from "../../types/Command";

export class say extends Command {
  constructor(client: ExtendedClient) {
    super(client, { name: "say", guildOnly: true });
  }

  /**
   * Sends a message that a user provides.
   */
  async run(message: DefiniteGuildMessage, args: string[]) {
    if (message.author.id !== ownerID) {
      return sendErrorEmbed(
        message.channel,
        ":x: Sorry, you have to be the bot owner to use this command!"
      );
    }
    if (args.length < 1) {
      return sendErrorEmbed(
        message.channel,
        ":x: Oh noes! Looks like you haven't specified what message to send. The format is `+say <message>`."
      );
    }

    message.delete({ timeout: 400 }).catch((err) => null);
    message.channel.send(args.join(" "));
  }
}
