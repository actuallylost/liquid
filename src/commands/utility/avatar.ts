import * as Discord from "discord.js";

export const avatar = (
  client: Discord.Client,
  message: Discord.Message,
  args: string[]
) => {
  if (!message.mentions.users.size) {
    const avatarAuthor = new Discord.MessageEmbed()
      .setColor("#f97b1b")
      .setAuthor(`${message.author.username}'s Avatar`)
      .setFooter("Liquid", client.user?.avatarURL() || undefined)
      .setTimestamp();
    const url = message.author.avatarURL();
    if (url) {
      avatarAuthor.setImage(url);
    }
    message.channel.send(avatarAuthor);
  } else {
    const user = message.mentions.users.first();
    if (user) {
      const avatarEmbed = new Discord.MessageEmbed()
        .setColor("#f97b1b")
        .setAuthor(`${user.username}'s Avatar`)
        .setFooter("Liquid", client.user?.avatarURL() || undefined)
        .setTimestamp();
      const url = user.avatarURL();
      if (url) {
        avatarEmbed.setImage(url);
      }
      message.channel.send(avatarEmbed);
    }
  }
};