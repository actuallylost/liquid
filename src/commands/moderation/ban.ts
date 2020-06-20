import { MessageEmbed } from "discord.js";

import { sendErrorEmbed } from "../../errors";
import { ExtendedClient } from "../../lib/Client";
import { Command, DefiniteGuildMessage } from "../../lib/Command";

export class ban extends Command {
  constructor(client: ExtendedClient) {
    super(client, { name: "ban", guildOnly: true });
  }

  /**
   * Ban a user.
   */
  async run(message: DefiniteGuildMessage, args: string[]) {
    if (!message.member.hasPermission("BAN_MEMBERS")) {
      return sendErrorEmbed(
        message.channel,
        ":x: Oops! You don't have permissions to run this command."
      );
    }

    if (!args[0]) {
      return sendErrorEmbed(
        message.channel,
        ":x: Oops! It seems like you forgot to input a user to ban. Format is `+ban <user> [reason]`."
      );
    }

    const userToBan = message.mentions.members?.first();
    if (!userToBan) {
      return sendErrorEmbed(
        message.channel,
        ":x: Oops! That user doesn't exist, maybe you typed something wrong? Format is `+ban <user> [reason]`."
      );
    }

    if (userToBan === message.member) {
      return sendErrorEmbed(
        message.channel,
        ":x: Oops! You cannot ban yourself dummy!"
      );
    }

    if (!userToBan.bannable) {
      return sendErrorEmbed(
        message.channel,
        ":x: Oops! This user cannot be banned."
      );
    }

    const reason = args[2];

    const banEmbedReason = new MessageEmbed()
      .setTitle(`${userToBan.user.username} was successfully banned`)
      .setColor("#2bd642")
      .setDescription(
        `:white_check_mark: Gotcha! ${userToBan} has been banned${
          reason ? ` for reason ${reason}` : ""
        }.`
      );
    userToBan.ban({ reason });
    return message.channel.send(banEmbedReason);
  }
}

export class unban extends Command {
  constructor(client: ExtendedClient) {
    super(client, { name: "unban", guildOnly: true });
  }

  /**
   * Unban a user.
   */
  async run(message: DefiniteGuildMessage, args: string[]) {
    const member = message.guild.members.cache.get(args[0])
      ? message.guild.members.cache.get(args[0])
      : message.mentions.members?.first();

    if (!member) {
      return sendErrorEmbed(
        message.channel,
        ":x: Oops! It seems like you forgot to input a user to unban. Format is `+unban <user> [reason]`."
      );
    }

    try {
      await message.guild.members.unban(member);
      message.channel.send(
        `:white_check_mark: Gotcha! ${member} has been unbanned.`
      );
    } catch (err) {
      return sendErrorEmbed(
        message.channel,
        ":x: Oops! Could not unban that user."
      );
    }
  }
}
