import * as Discord from "discord.js";

import { padUptime } from "../padUptime";

export const info = (
  client: Discord.Client,
  message: Discord.Message,
  args: any[]
) => {
  const botinfoEmbed = new Discord.RichEmbed()
    .setTitle("Bot Information")
    .setColor("#e825a7")
    .addField("Bot Owner:", "Lost#9999")
    .addField("Server Count:", client.guilds.size)
    .addField("Uptime", padUptime(client.uptime / 1000))
    .addField("Latency:", Math.round(client.ping))
    .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL)
    .setTimestamp();
  return message.channel.send(botinfoEmbed);
};
