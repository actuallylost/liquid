import * as Discord from "discord.js";

export const info = (
  client: Discord.Client,
  message: Discord.Message,
  args: any[],
) => {
  const infoEmbed = new Discord.RichEmbed()
    .setTitle("User Information")
    .setColor("#4de8e8")
    .addField("User:", message.author.tag)
    .addField("ID:", message.author.id)
    .addField(
      "Roles:",
      message.member.roles.map((r) => `<@${r.id}>`).join(", "),
    )
    .addField("Created at:", message.author.createdAt)
    .addField("Joined at", message.member.joinedAt)
    .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL)
    .setTimestamp();
  return message.channel.send(infoEmbed);
};
