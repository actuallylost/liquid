import { MessageEmbed, TextChannel } from "discord.js";

import { Command } from "../../types/Command";

export const support: Command = (client, message, args) => {
  const issueReason = args[1];
  if (!issueReason) {
    return message.channel.send(
      ":x: Oops! It seems like you forgot to input an issue. Format is `+support <issue>`."
    );
  }

  const issueEmbed = new MessageEmbed()
    .setTitle("Issue »")
    .setColor("#c91010")
    .addField(
      "Submitted By »",
      `${message.author} with ID: ${message.author.id}`
    )
    .addField("Server »", message.guild)
    .addField("Channel »", message.channel)
    .addField("Time »", message.createdAt)
    .addField("Issue »", issueReason)
    .setFooter("Liquid", client.user.avatarURL() || undefined)
    .setTimestamp();

  const confirmEmbed = new MessageEmbed()
    .setColor("#03bc22")
    .addField(
      "Success!",
      `:white_check_mark: Issue successfully submitted, the developer will review it as soon as possible, and investigate!`
    )
    .setFooter("Liquid", client.user.avatarURL() || undefined)
    .setTimestamp();

  message.delete({ timeout: 400 }).catch((err) => null);
  message.author.send(confirmEmbed);
  return (message.guild.channels.cache.get(
    "629050917680971776"
  ) as TextChannel).send(issueEmbed);
};
