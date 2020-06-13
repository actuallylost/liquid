import * as Discord from "discord.js";

export const prefix = (
  client: Discord.Client,
  message: Discord.Message,
  args: string[]
) => {
  // Prefix only settable in guilds.
  if (!message.guild || !message.member) {
    return;
  }

  const serverPrefixes = new Discord.Collection();

  if (!message.member.hasPermission("MANAGE_GUILD")) {
    const prefixErrorNoPerms = new Discord.MessageEmbed()
      .setTitle("Prefix Error")
      .setColor("#d91818")
      .setDescription(
        ":x: Oops! You don't have permissions to run this command."
      );
    return message.channel.send(prefixErrorNoPerms);
  }

  const altPrefix = args[1];
  if (!altPrefix) {
    const prefixErrorNoInput = new Discord.MessageEmbed()
      .setTitle("Prefix Error")
      .setColor("#d91818")
      .setDescription(
        ":x: Oops! It seems like you forgot to input a prefix to set. Format is `+prefix <prefix>`."
      );
    return message.channel.send(prefixErrorNoInput);
  }

  serverPrefixes.set(message.guild.id, altPrefix);
};
