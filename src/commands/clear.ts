import * as Discord from "discord.js";

export const clear = (
  client: Discord.Client,
  message: Discord.Message,
  args: any[]
) => {
  if (!message.member.hasPermission("MANAGE_MESSAGES")) {
    const clearErrorNoPerms = new Discord.RichEmbed()
      .setTitle("Clear Error")
      .setColor("#d91818")
      .setDescription(
        ":x: Oops! You don't have permissions to run this command."
      );
    return message.channel.send(clearErrorNoPerms);
  }
  if (!args[1]) {
    const errorEmbed = new Discord.RichEmbed()
      .setTitle("Clear Error")
      .setColor("#a80d0d")
      .setDescription(
        ":x: Oh noes! Looks like you haven't specified how many messages to clear. The format is `+clear <amount>`."
      );
    return message.channel.send(errorEmbed);
  }

  const messagesToDelete = parseInt(args[1], 10);
  if (isNaN(messagesToDelete)) {
    const errorEmbed = new Discord.RichEmbed()
      .setTitle("Clear Error")
      .setColor("#a80d0d")
      .setDescription(
        ":x: Oh noes! Looks like you haven't input a number. The format is `+clear <amount>`."
      );
    return message.channel.send(errorEmbed);
  }
  message.channel.bulkDelete(messagesToDelete);
  const clearEmbed = new Discord.RichEmbed()
    .setTitle("Clear Successful")
    .setColor("#2bd642")
    .setDescription(
      `:white_check_mark: Roger that chief! Cleared ${messagesToDelete} messages.`
    );
  return message.channel.send(clearEmbed);
};
