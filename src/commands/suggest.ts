import * as Discord from "discord.js";

export const suggest = (
  client: Discord.Client,
  message: Discord.Message,
  args: any[],
) => {
  const suggestion = args[1];
  if (!suggestion) {
    return message.channel.send(
      ":x: Oops! It seems like you forgot to input a suggestion. Format is `+suggest <suggestion>`.",
    );
  }

  const suggestionEmbed = new Discord.RichEmbed()
    .setTitle("Suggestion »")
    .setColor("#c91010")
    .addField(
      "Submitted By »",
      `${message.author} with ID: ${message.author.id}`,
    )
    .addField("Server »", message.guild)
    .addField("Channel »", message.channel)
    .addField("Time »", message.createdAt)
    .addField("Suggestion »", suggestion)
    .setFooter("Liquid", client.user.avatarURL)
    .setTimestamp();

  const confirmEmbed = new Discord.RichEmbed()
    .setColor("#03bc22")
    .addField(
      "Success!",
      `:white_check_mark: Suggestion successfully submitted, the developer will review it as soon as possible!.`,
    )
    .setFooter("Liquid", client.user.avatarURL)
    .setTimestamp();

  message.delete(500).catch((err) => null);
  message.author.send(confirmEmbed);
  return (message.guild.channels.get(
    "629050929064312852",
  ) as Discord.TextChannel).send(suggestionEmbed);
};
