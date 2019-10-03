import * as Discord from "discord.js";

export const support = (
  client: Discord.Client,
  message: Discord.Message,
  args: any[]
) => {
  let issueReason = args[1];
  if (!issueReason) {
    return message.channel.send(
      ":x: Oops! It seems like you forgot to input an issue. Format is `+support <issue>`."
    );
  }

  let issueEmbed = new Discord.RichEmbed()
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
    .setFooter("Liquid", client.user.avatarURL)
    .setTimestamp();

  let confirmEmbed = new Discord.RichEmbed()
    .setColor("#03bc22")
    .addField(
      "Success!",
      `:white_check_mark: Issue successfully submitted, the developer will review it as soon as possible, and investigate!`
    )
    .setFooter("Liquid", client.user.avatarURL)
    .setTimestamp();

  message.delete(500).catch((err) => {});
  message.author.send(confirmEmbed);
  return (message.guild.channels.get(
    "629050917680971776"
  ) as Discord.TextChannel).send(issueEmbed);
};
