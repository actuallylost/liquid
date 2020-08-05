import { MessageEmbed, TextChannel, Message, SnowflakeUtil } from "discord.js";

import { sendErrorEmbed } from "../../errors";
import { ExtendedClient } from "../../lib/Client";
import { Command, DefiniteGuildMessage } from "../../lib/Command";

export class id extends Command {
  constructor(client: ExtendedClient) {
    super(client, {
      name: "id",
      guildOnly: true,
      description: "Provides the date of a Snowflake.",
    });
  }
  async run(message: DefiniteGuildMessage, args: string[]) {
    const idArg = args[0];
    if (!idArg) {
      return sendErrorEmbed(
        message.channel,
        ":x: Oops! It seems like you forgot to input an ID to check. Format is +id <snowflake>"
      );
    }
    const snowflake = SnowflakeUtil.deconstruct(idArg);
    const idTime = new MessageEmbed()
      .setColor("#85fff9")
      .addField("Snowflake Date »", snowflake.date)
      .setFooter("Liquid", this.client.user?.avatarURL() || undefined)
      .setTimestamp();

    message.delete({ timeout: 400 }).catch((err) => null);
    message.channel.send(idTime);
  }
}
