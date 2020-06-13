import { Channel, MessageEmbed, TextChannel } from "discord.js";

/**
 * Send an embed reporting an error.
 */
export const sendErrorEmbed = (
  channel: Channel,
  content: string,
  modifier?: (embed: MessageEmbed) => MessageEmbed
) => {
  if (channel.type != "text") {
    throw "Trying to send an error embed to a non-text channel.";
  }

  let embed = new MessageEmbed()
    .setTitle("Error")
    .setColor("#d91818")
    .setDescription(content);

  if (modifier) {
    // Probably don't need to reassign.
    embed = modifier(embed);
  }

  (channel as TextChannel).send(embed);
};
