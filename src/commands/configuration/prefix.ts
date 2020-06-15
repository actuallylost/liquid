import * as Discord from "discord.js";

import { sendErrorEmbed } from "../../errors";
import { ExtendedClient } from "../../lib/Client";
import { Command } from "../../lib/Command";
import { DefiniteGuildMessage } from "../../types/Command";

export class Prefix extends Command {
  constructor(client: ExtendedClient) {
    super(client, { name: "prefix", guildOnly: true });
  }

  async run(message: DefiniteGuildMessage, args: string[]) {
    const serverPrefixes = new Discord.Collection();

    if (!message.member.hasPermission("MANAGE_GUILD")) {
      return sendErrorEmbed(
        message.channel,
        ":x: Oops! You don't have permissions to run this command."
      );
    }

    if (!args[0]) {
      return sendErrorEmbed(
        message.channel,
        ":x: Oops! It seems like you forgot to input a prefix to set. Format is `+prefix <prefix>`."
      );
    }

    serverPrefixes.set(message.guild.id, args[0]);
    const prefixEmbed = new Discord.MessageEmbed()
      .setTitle("Prefix Set")
      .setColor("#2bd642")
      .setDescription(
        `:white_check_mark: Roger that chief! Prefix has been set to \`${args[0]}\`.`
      );
    return message.channel.send(prefixEmbed);
  }
}
