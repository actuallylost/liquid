import * as Discord from "discord.js";

export const hug = (
  client: Discord.Client,
  message: Discord.Message,
  args: any[],
) => {
  if (!args[1]) {
    const hugErrorEmbed1 = new Discord.RichEmbed()
      .setTitle("Hug Error")
      .setColor("#d91818")
      .setDescription(
        ":x: Oops! You didn't input an id or tagged a member to hug. Format is `+hug <user>`.",
      );
    return message.channel.send(hugErrorEmbed1);
  }
  const userToHug = message.mentions.users.first();
  if (userToHug == null) {
    const hugErrorEmbed2 = new Discord.RichEmbed()
      .setTitle("Hug Error")
      .setColor("#d91818")
      .setDescription(
        ":x: Oops! That user doesn't exist, maybe you typed something wrong? Format is `+hug <user>`.",
      );
    return message.channel.send(hugErrorEmbed2);
  }
  const hugEmbed = new Discord.RichEmbed()
    .setTitle(`Hugged ${userToHug.username} :3`)
    .setColor("#0c1db3")
    .setDescription(
      `Awh, ${userToHug} was just hugged by ${message.author.username}. How sweet :3`,
    );
  return message.channel.send(hugEmbed);
};
