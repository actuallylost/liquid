import * as Discord from "discord.js";

import { ownerID } from "../env";

export const say = (
  client: Discord.Client,
  message: Discord.Message,
  args: string[]
) => {
  if (message.author.id !== ownerID) {
    const sayEmbed = new Discord.MessageEmbed()
      .setTitle("Say Error")
      .setColor("#d91818")
      .setDescription(
        ":x: Sorry, you have to be the bot owner to use this command!"
      );
    return message.channel.send(sayEmbed);
  }
  if (!args[1]) {
    const errorEmbed = new Discord.MessageEmbed()
      .setTitle("Clear Error")
      .setColor("#a80d0d")
      .setDescription(
        ":x: Oh noes! Looks like you haven't specified what message to send. The format is `+say <message>`."
      );
    return message.channel.send(errorEmbed);
  }

  message.delete({ timeout: 400 }).catch((err) => null);
  message.channel.send(args.join(" "));
};
