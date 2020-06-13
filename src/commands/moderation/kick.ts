import { Client, Message, MessageEmbed } from "discord.js";

import { sendErrorEmbed } from "../../errors";
import { Command } from "../../types/Command";
/**
 * Kick a user.
 */
export const kick: Command = (client, message, args) => {
  if (!message.member.hasPermission("KICK_MEMBERS")) {
    const kickErrorNoPerms = new MessageEmbed()
      .setTitle("Ban Error")
      .setColor("#d91818")
      .setDescription(
        ":x: Oops! You don't have permissions to run this command."
      );
    return message.channel.send(kickErrorNoPerms);
  }

  if (!args[1]) {
    const kickErrorNoUser = new MessageEmbed()
      .setTitle("Kick Error")
      .setColor("#d91818")
      .setDescription(
        ":x: Oops! It seems like you forgot to input a user to kick. Format is `+kick <user> [reason]`."
      );
    return message.channel.send(kickErrorNoUser);
  }

  const userToKick = message.mentions.members?.first();

  if (!userToKick) {
    const kickErrorNonexistant = new MessageEmbed()
      .setTitle("Kick Error")
      .setColor("#d91818")
      .setDescription(
        ":x: Oops! That user doesn't exist, maybe you typed something wrong? Format is `+kick <user> [reason]`."
      );
    return message.channel.send(kickErrorNonexistant);
  }

  if (userToKick === message.member) {
    const kickErrorSelf = new MessageEmbed()
      .setTitle("Kick Error")
      .setColor("#d91818")
      .setDescription(":x: Oops! You cannot kick yourself dummy!");
    return message.channel.send(kickErrorSelf);
  }

  if (!userToKick.kickable) {
    const kickErrorKickable = new MessageEmbed()
      .setTitle("Kick Error")
      .setColor("#d91818")
      .setDescription(":x: Oops! That user is not able to be kicked.");
    return message.channel.send(kickErrorKickable);
  }

  const kickReason = args[2];
  if (!kickReason) {
    const kickEmbedNoReason = new MessageEmbed()
      .setTitle(`${userToKick.user.username} was successfully kicked`)
      .setColor("#2bd642")
      .setDescription(
        `:white_check_mark: Gotcha! ${userToKick} has been kicked.`
      );
    userToKick.kick();
    return message.channel.send(kickEmbedNoReason);
  }

  const kickEmbedReason = new MessageEmbed()
    .setTitle(`${userToKick.user.username} was successfully kicked`)
    .setColor("#2bd642")
    .setDescription(
      `:white_check_mark: Gotcha! ${userToKick} has been kicked for ${kickReason}.`
    );
  userToKick.kick();
  return message.channel.send(kickEmbedReason);
};
