import * as Discord from "discord.js";

export const padUptime = (s: number) => {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s - h * 3600) / 60);
  s = Math.round(s - h * 3600 - m * 60);

  const hf = h < 10 ? `0${h}` : `${h}`;
  const mf = m < 10 ? `0${m}` : `${m}`;
  const sf = s < 10 ? `0${s}` : `${s}`;

  return `${hf}:${mf}:${sf}`;
};

export const botinfo = (
  client: Discord.Client,
  message: Discord.Message,
  args: any[],
) => {
  const botinfoEmbed = new Discord.RichEmbed()
    .setTitle("Bot Information")
    .setColor("#e825a7")
    .addField("Bot Owner:", "Lost#9999")
    .addField("Server Count:", client.guilds.size)
    .addField("Uptime:", padUptime(client.uptime / 1000))
    .addField("Latency:", `${Math.round(client.ping)}ms`)
    .addField("Version:", "0.2.1")
    .setFooter(`Requested by ${message.author.tag}`, message.author.avatarURL)
    .setTimestamp();
  return message.channel.send(botinfoEmbed);
};
