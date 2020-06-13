import * as Discord from "discord.js";

export const clear = async (
  client: Discord.Client,
  message: Discord.Message,
  args: string[]
) => {
  if (!message.member?.hasPermission("MANAGE_MESSAGES")) {
    return message.channel.send(
      new Discord.MessageEmbed()
        .setTitle("Clear Error")
        .setColor("#d91818")
        .setDescription(
          ":x: Oops! You don't have permissions to run this command."
        )
    );
  }

  if (!args[1]) {
    const clearErrorNoAmount = new Discord.MessageEmbed()
      .setTitle("Clear Error")
      .setColor("#a80d0d")
      .setDescription(
        ":x: Oh noes! Looks like you haven't specified how many messages to clear. The format is `+clear <amount> [user]`."
      );
    return message.channel.send(clearErrorNoAmount);
  }

  const messagesToDelete = parseInt(args[1], 10);
  if (isNaN(messagesToDelete)) {
    const clearErrorNaN = new Discord.MessageEmbed()
      .setTitle("Clear Error")
      .setColor("#a80d0d")
      .setDescription(
        ":x: Oh noes! Looks like you haven't input a number. The format is `+clear <amount> [user]`."
      );
    return message.channel.send(clearErrorNaN);
  }

  const userToClear = message.mentions.members?.first();
  if (!userToClear) {
    const clearErrorNonexistant = new Discord.MessageEmbed()
      .setTitle("Clear Error")
      .setColor("#d91818")
      .setDescription(
        ":x: Oops! That user doesn't exist, maybe you typed something wrong? Format is `+clear <amount> [user]`."
      );
    return message.channel.send(clearErrorNonexistant);
  }

  await message.channel.messages
    .fetch()
    .then((messages) => messages.filter((v) => v.author.id === userToClear.id));

  // User Clear -
  const clearEmbedUser = new Discord.MessageEmbed()
    .setTitle("Clear Successful")
    .setColor("#2bd642")
    .setDescription(
      `:white_check_mark: Roger that chief! Cleared ${messagesToDelete} of ${userToClear}'s messages.`
    );
  message.channel.send(clearEmbedUser);

  // Non-User Clear -
  message.channel.bulkDelete(messagesToDelete);
  const clearEmbed = new Discord.MessageEmbed()
    .setTitle("Clear Successful")
    .setColor("#2bd642")
    .setDescription(
      `:white_check_mark: Roger that chief! Cleared ${messagesToDelete} messages.`
    );
  return message.channel.send(clearEmbed);
};
